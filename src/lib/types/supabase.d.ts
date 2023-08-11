export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      chatbots: {
        Row: {
          name_en: string
          name_jp: string
          sender_id: number
        }
        Insert: {
          name_en: string
          name_jp: string
          sender_id?: number
        }
        Update: {
          name_en?: string
          name_jp?: string
          sender_id?: number
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string | null
          content_source_lang: string | null
          content_target_lang: string | null
          created_at: string | null
          id: number
          sender_id: number | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          content_source_lang?: string | null
          content_target_lang?: string | null
          created_at?: string | null
          id?: number
          sender_id?: number | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          content_source_lang?: string | null
          content_target_lang?: string | null
          created_at?: string | null
          id?: number
          sender_id?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          display_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          display_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          display_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
