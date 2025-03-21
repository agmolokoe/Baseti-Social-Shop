export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      baseti_orders: {
        Row: {
          created_at: string | null
          id: string
          status: string | null
          total_amount: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          status?: string | null
          total_amount: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          status?: string | null
          total_amount?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "baseti_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "baseti_users"
            referencedColumns: ["id"]
          },
        ]
      }
      baseti_products: {
        Row: {
          created_at: string | null
          id: string
          name: string
          price: number
          stock_quantity: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          price: number
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          price?: number
          stock_quantity?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      baseti_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          last_login_at: string | null
          status: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          last_login_at?: string | null
          status?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          last_login_at?: string | null
          status?: string | null
        }
        Relationships: []
      }
      business_profiles: {
        Row: {
          business_address: string | null
          business_description: string | null
          business_hours: Json | null
          business_name: string | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string | null
          id: string
          industry: string | null
          logo_url: string | null
          product_limit: number | null
          settings: Json | null
          social_media: Json | null
          subscription_end_date: string | null
          subscription_features: Json | null
          subscription_status: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          business_address?: string | null
          business_description?: string | null
          business_hours?: Json | null
          business_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id: string
          industry?: string | null
          logo_url?: string | null
          product_limit?: number | null
          settings?: Json | null
          social_media?: Json | null
          subscription_end_date?: string | null
          subscription_features?: Json | null
          subscription_status?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          business_address?: string | null
          business_description?: string | null
          business_hours?: Json | null
          business_name?: string | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string | null
          id?: string
          industry?: string | null
          logo_url?: string | null
          product_limit?: number | null
          settings?: Json | null
          social_media?: Json | null
          subscription_end_date?: string | null
          subscription_features?: Json | null
          subscription_status?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      content_plans: {
        Row: {
          content_type: string
          created_at: string | null
          description: string | null
          hashtags: string[] | null
          id: string
          media_url: string[] | null
          platform: string
          scheduled_for: string | null
          status: Database["public"]["Enums"]["content_status"] | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content_type: string
          created_at?: string | null
          description?: string | null
          hashtags?: string[] | null
          id?: string
          media_url?: string[] | null
          platform: string
          scheduled_for?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content_type?: string
          created_at?: string | null
          description?: string | null
          hashtags?: string[] | null
          id?: string
          media_url?: string[] | null
          platform?: string
          scheduled_for?: string | null
          status?: Database["public"]["Enums"]["content_status"] | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      customers: {
        Row: {
          business_id: string
          created_at: string | null
          email: string
          id: number
          name: string
          phone: string | null
        }
        Insert: {
          business_id: string
          created_at?: string | null
          email: string
          id?: number
          name: string
          phone?: string | null
        }
        Update: {
          business_id?: string
          created_at?: string | null
          email?: string
          id?: number
          name?: string
          phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "customers_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_customers_business"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          business_id: string
          created_at: string | null
          customer_id: number | null
          id: number
          total_amount: number
        }
        Insert: {
          business_id: string
          created_at?: string | null
          customer_id?: number | null
          id?: number
          total_amount: number
        }
        Update: {
          business_id?: string
          created_at?: string | null
          customer_id?: number | null
          id?: number
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_orders_business"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "customers"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          business_id: string
          cost_price: number
          created_at: string | null
          description: string | null
          id: number
          image_url: string | null
          name: string
          selling_price: number
          stock: number | null
        }
        Insert: {
          business_id: string
          cost_price?: number
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name: string
          selling_price?: number
          stock?: number | null
        }
        Update: {
          business_id?: string
          cost_price?: number
          created_at?: string | null
          description?: string | null
          id?: number
          image_url?: string | null
          name?: string
          selling_price?: number
          stock?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_products_business"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "products_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      social_connections: {
        Row: {
          access_token: string | null
          created_at: string | null
          handle: string
          id: string
          last_synced_at: string | null
          platform: string
          profile_data: Json | null
          refresh_token: string | null
          tiktok_access_token: string | null
          tiktok_refresh_token: string | null
          tiktok_user_id: string | null
          token_expires_at: string | null
          user_id: string
        }
        Insert: {
          access_token?: string | null
          created_at?: string | null
          handle: string
          id?: string
          last_synced_at?: string | null
          platform: string
          profile_data?: Json | null
          refresh_token?: string | null
          tiktok_access_token?: string | null
          tiktok_refresh_token?: string | null
          tiktok_user_id?: string | null
          token_expires_at?: string | null
          user_id: string
        }
        Update: {
          access_token?: string | null
          created_at?: string | null
          handle?: string
          id?: string
          last_synced_at?: string | null
          platform?: string
          profile_data?: Json | null
          refresh_token?: string | null
          tiktok_access_token?: string | null
          tiktok_refresh_token?: string | null
          tiktok_user_id?: string | null
          token_expires_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      social_media_feeds: {
        Row: {
          connection_id: string
          content: string | null
          created_at: string | null
          engagement_stats: Json | null
          id: string
          media_urls: string[] | null
          platform: string
          post_id: string
          posted_at: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          connection_id: string
          content?: string | null
          created_at?: string | null
          engagement_stats?: Json | null
          id?: string
          media_urls?: string[] | null
          platform: string
          post_id: string
          posted_at?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          connection_id?: string
          content?: string | null
          created_at?: string | null
          engagement_stats?: Json | null
          id?: string
          media_urls?: string[] | null
          platform?: string
          post_id?: string
          posted_at?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_media_feeds_connection_id_fkey"
            columns: ["connection_id"]
            isOneToOne: false
            referencedRelation: "social_connections"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          amount: number
          business_id: string | null
          created_at: string | null
          currency: string | null
          id: string
          payment_date: string | null
          payment_id: string | null
          status: string
          tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Insert: {
          amount: number
          business_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_date?: string | null
          payment_id?: string | null
          status: string
          tier: Database["public"]["Enums"]["subscription_tier"]
        }
        Update: {
          amount?: number
          business_id?: string | null
          created_at?: string | null
          currency?: string | null
          id?: string
          payment_date?: string | null
          payment_id?: string | null
          status?: string
          tier?: Database["public"]["Enums"]["subscription_tier"]
        }
        Relationships: [
          {
            foreignKeyName: "fk_business"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "subscriptions_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "business_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      test_table: {
        Row: {
          id: number
          name: string
        }
        Insert: {
          id?: never
          name: string
        }
        Update: {
          id?: never
          name?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      business_industry:
        | "retail"
        | "hospitality"
        | "healthcare"
        | "technology"
        | "manufacturing"
        | "education"
        | "finance"
        | "other"
      content_status: "draft" | "scheduled" | "published" | "failed"
      subscription_tier: "free" | "basic" | "premium"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
