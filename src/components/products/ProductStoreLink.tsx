
import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Copy, ExternalLink } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProductStoreLinkProps {
  businessId: string;
  productId: number | string;
}

export function ProductStoreLink({ businessId, productId }: ProductStoreLinkProps) {
  const { toast } = useToast();
  
  // Generate the absolute store link for the product
  const storeLink = `${window.location.origin}/shopapp/${businessId}/product/${productId}`;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(storeLink);
    toast({
      title: "Link copied!",
      description: "Product link copied to clipboard",
    });
  };
  
  const handleOpenLink = () => {
    window.open(storeLink, '_blank');
  };
  
  return (
    <div className="flex items-center space-x-2">
      <div className="flex-1 bg-muted rounded p-2 text-xs overflow-hidden text-ellipsis">
        <span className="text-muted-foreground">{storeLink}</span>
      </div>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline"
              size="icon"
              onClick={handleCopyLink}
              className="h-8 w-8"
            >
              <Copy className="h-4 w-4" />
              <span className="sr-only">Copy link</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Copy product link</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline"
              size="icon"
              onClick={handleOpenLink}
              className="h-8 w-8"
            >
              <ExternalLink className="h-4 w-4" />
              <span className="sr-only">Open in new tab</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open in new tab</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
