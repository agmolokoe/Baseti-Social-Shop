
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Function to generate content with OpenAI
async function generateWithOpenAI(systemPrompt: string, userPrompt: string) {
  console.log(`Generating content with system prompt: ${systemPrompt}`);
  console.log(`User prompt: ${userPrompt}`);
  
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error(`OpenAI API error: ${response.status}`, errorData);
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error generating content with OpenAI:', error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY is not set');
    }

    const { flow, params } = await req.json();
    console.log(`Processing ${flow} flow with params:`, params);

    let result;

    switch (flow) {
      case 'generateProductDescription': {
        const { productName, productType, features, targetAudience = 'general', keywords = [] } = params;
        
        // Create system prompt with target audience and keywords
        const systemPrompt = `You are an expert product copywriter. Create an engaging product description for a ${productType} 
          targeting ${targetAudience} audience. The description should be positive, persuasive, and appealing. 
          ${keywords.length > 0 ? `Include these keywords: ${keywords.join(', ')}.` : ''}`;
        
        // Create user prompt with product details
        const userPrompt = `Write a compelling product description for "${productName}". 
          Key features include: ${features.join(', ')}.`;
        
        result = await generateWithOpenAI(systemPrompt, userPrompt);
        break;
      }

      case 'suggestSocialMediaCaptions': {
        const { productName, productDescription, platform = 'general', includeHashtags = false } = params;
        
        // Tailored prompt based on platform
        let platformSpecificGuidance = '';
        if (platform === 'instagram') {
          platformSpecificGuidance = 'Instagram captions should be visually descriptive and include a call to action.';
        } else if (platform === 'tiktok') {
          platformSpecificGuidance = 'TikTok captions should be short, catchy, and trend-aware.';
        } else if (platform === 'x') {
          platformSpecificGuidance = 'X (Twitter) captions should be concise, witty, and informative.';
        }

        const systemPrompt = `You are a social media marketing expert. Create 5 engaging captions for ${platform === 'general' ? 'social media' : platform} 
          about a product. ${platformSpecificGuidance} 
          ${includeHashtags ? 'Include relevant and trending hashtags.' : 'Do not include hashtags.'}`;
        
        const userPrompt = `Create 5 captivating social media captions for "${productName}". 
          Product description: ${productDescription}`;
        
        result = await generateWithOpenAI(systemPrompt, userPrompt);
        break;
      }

      case 'competitorAnalysis': {
        const { productName, productDescription, competitors } = params;
        
        const systemPrompt = `You are a market analysis expert. Compare a product with its competitors and identify key differentiators
          and areas for improvement. Provide specific recommendations based on the competitive landscape.`;
        
        const userPrompt = `Analyze "${productName}" compared to these competitors:
          ${competitors.map(comp => `${comp.name}: ${comp.description}`).join('\n')}
          
          Our product description: ${productDescription}
          
          Identify:
          1. Key differentiators
          2. Competitive advantages
          3. Areas for improvement
          4. Marketing suggestions`;
        
        result = await generateWithOpenAI(systemPrompt, userPrompt);
        break;
      }

      default:
        throw new Error(`Unknown flow: ${flow}`);
    }

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in genkit-flows function:', error);
    return new Response(
      JSON.stringify({
        error: error.message,
        details: 'If this error persists, please check your API configuration.'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
