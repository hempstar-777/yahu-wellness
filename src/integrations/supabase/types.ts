export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      ai_rate_limits: {
        Row: {
          created_at: string
          function_name: string
          id: string
          request_count: number
          user_id: string
          window_start: string
        }
        Insert: {
          created_at?: string
          function_name: string
          id?: string
          request_count?: number
          user_id: string
          window_start?: string
        }
        Update: {
          created_at?: string
          function_name?: string
          id?: string
          request_count?: number
          user_id?: string
          window_start?: string
        }
        Relationships: []
      }
      assessment_results: {
        Row: {
          assessment_type: string
          completed_at: string
          id: string
          notes: string | null
          responses: Json
          score: number | null
          user_id: string
        }
        Insert: {
          assessment_type: string
          completed_at?: string
          id?: string
          notes?: string | null
          responses?: Json
          score?: number | null
          user_id: string
        }
        Update: {
          assessment_type?: string
          completed_at?: string
          id?: string
          notes?: string | null
          responses?: Json
          score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "assessment_results_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_progress: {
        Row: {
          completed: boolean
          completed_at: string | null
          course_id: string
          created_at: string
          id: string
          level_index: number
          notes: string | null
          user_id: string
        }
        Insert: {
          completed?: boolean
          completed_at?: string | null
          course_id: string
          created_at?: string
          id?: string
          level_index: number
          notes?: string | null
          user_id: string
        }
        Update: {
          completed?: boolean
          completed_at?: string | null
          course_id?: string
          created_at?: string
          id?: string
          level_index?: number
          notes?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_progress_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      course_purchases: {
        Row: {
          amount_paid: number
          course_id: string
          currency: string
          id: string
          level_index: number | null
          purchase_type: string
          purchased_at: string
          stripe_payment_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount_paid: number
          course_id: string
          currency?: string
          id?: string
          level_index?: number | null
          purchase_type: string
          purchased_at?: string
          stripe_payment_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount_paid?: number
          course_id?: string
          currency?: string
          id?: string
          level_index?: number | null
          purchase_type?: string
          purchased_at?: string
          stripe_payment_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      deliverance_roadmaps: {
        Row: {
          assessment_id: string | null
          completed_at: string | null
          created_at: string
          duration_days: number
          id: string
          progress: Json
          roadmap_data: Json
          updated_at: string
          user_id: string
        }
        Insert: {
          assessment_id?: string | null
          completed_at?: string | null
          created_at?: string
          duration_days?: number
          id?: string
          progress?: Json
          roadmap_data?: Json
          updated_at?: string
          user_id: string
        }
        Update: {
          assessment_id?: string | null
          completed_at?: string | null
          created_at?: string
          duration_days?: number
          id?: string
          progress?: Json
          roadmap_data?: Json
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "deliverance_roadmaps_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessment_results"
            referencedColumns: ["id"]
          },
        ]
      }
      fasting_tracker: {
        Row: {
          completed: boolean | null
          created_at: string
          duration_hours: number | null
          end_time: string | null
          fasting_type: string
          goal_hours: number
          id: string
          notes: string | null
          start_time: string
          updated_at: string
          user_id: string
          water_intake_ml: number | null
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          duration_hours?: number | null
          end_time?: string | null
          fasting_type: string
          goal_hours: number
          id?: string
          notes?: string | null
          start_time: string
          updated_at?: string
          user_id: string
          water_intake_ml?: number | null
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          duration_hours?: number | null
          end_time?: string | null
          fasting_type?: string
          goal_hours?: number
          id?: string
          notes?: string | null
          start_time?: string
          updated_at?: string
          user_id?: string
          water_intake_ml?: number | null
        }
        Relationships: []
      }
      forum_replies: {
        Row: {
          content: string
          created_at: string | null
          forum_id: string
          id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string | null
          forum_id: string
          id?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string | null
          forum_id?: string
          id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "forum_replies_forum_id_fkey"
            columns: ["forum_id"]
            isOneToOne: false
            referencedRelation: "forums"
            referencedColumns: ["id"]
          },
        ]
      }
      forums: {
        Row: {
          category: string
          content: string
          created_at: string | null
          id: string
          is_locked: boolean | null
          is_pinned: boolean | null
          reply_count: number | null
          title: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          category: string
          content: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          reply_count?: number | null
          title: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          category?: string
          content?: string
          created_at?: string | null
          id?: string
          is_locked?: boolean | null
          is_pinned?: boolean | null
          reply_count?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      group_prayer_participants: {
        Row: {
          id: string
          joined_at: string | null
          session_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          session_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          session_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_prayer_participants_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "group_prayer_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      group_prayer_sessions: {
        Row: {
          created_at: string | null
          host_user_id: string
          id: string
          is_active: boolean | null
          max_participants: number | null
          prayer_type: string | null
          scheduled_time: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          host_user_id: string
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          prayer_type?: string | null
          scheduled_time?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          host_user_id?: string
          id?: string
          is_active?: boolean | null
          max_participants?: number | null
          prayer_type?: string | null
          scheduled_time?: string | null
          title?: string
        }
        Relationships: []
      }
      minister_clients: {
        Row: {
          client_name: string
          created_at: string
          email: string | null
          first_session_date: string | null
          id: string
          initial_concerns: string | null
          last_session_date: string | null
          minister_id: string
          notes: string | null
          phone: string | null
          prayer_focus: string[] | null
          status: string
          updated_at: string
        }
        Insert: {
          client_name: string
          created_at?: string
          email?: string | null
          first_session_date?: string | null
          id?: string
          initial_concerns?: string | null
          last_session_date?: string | null
          minister_id: string
          notes?: string | null
          phone?: string | null
          prayer_focus?: string[] | null
          status?: string
          updated_at?: string
        }
        Update: {
          client_name?: string
          created_at?: string
          email?: string | null
          first_session_date?: string | null
          id?: string
          initial_concerns?: string | null
          last_session_date?: string | null
          minister_id?: string
          notes?: string | null
          phone?: string | null
          prayer_focus?: string[] | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      minister_sessions: {
        Row: {
          breakthrough_moments: string | null
          client_id: string | null
          created_at: string
          duration_minutes: number | null
          follow_up_needed: string | null
          id: string
          minister_id: string
          next_steps: string | null
          prayer_points: string | null
          private_notes: string | null
          session_date: string
          session_type: string
          topics_covered: string[] | null
          updated_at: string
        }
        Insert: {
          breakthrough_moments?: string | null
          client_id?: string | null
          created_at?: string
          duration_minutes?: number | null
          follow_up_needed?: string | null
          id?: string
          minister_id: string
          next_steps?: string | null
          prayer_points?: string | null
          private_notes?: string | null
          session_date?: string
          session_type: string
          topics_covered?: string[] | null
          updated_at?: string
        }
        Update: {
          breakthrough_moments?: string | null
          client_id?: string | null
          created_at?: string
          duration_minutes?: number | null
          follow_up_needed?: string | null
          id?: string
          minister_id?: string
          next_steps?: string | null
          prayer_points?: string | null
          private_notes?: string | null
          session_date?: string
          session_type?: string
          topics_covered?: string[] | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "minister_sessions_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "minister_clients"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_journal: {
        Row: {
          content: string
          created_at: string
          id: string
          is_answered: boolean | null
          prayer_type: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_answered?: boolean | null
          prayer_type?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_answered?: boolean | null
          prayer_type?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "prayer_journal_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      prayer_videos: {
        Row: {
          created_at: string | null
          description: string | null
          duration_minutes: number | null
          id: string
          is_vip_only: boolean | null
          prayer_category: string
          title: string
          video_url: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_vip_only?: boolean | null
          prayer_category: string
          title: string
          video_url: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          duration_minutes?: number | null
          id?: string
          is_vip_only?: boolean | null
          prayer_category?: string
          title?: string
          video_url?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          email: string
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      teachings_content: {
        Row: {
          author_id: string | null
          category: string
          content: string
          created_at: string | null
          excerpt: string | null
          id: string
          is_vip_only: boolean | null
          published_at: string | null
          slug: string
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          author_id?: string | null
          category: string
          content: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          is_vip_only?: boolean | null
          published_at?: string | null
          slug: string
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          author_id?: string | null
          category?: string
          content?: string
          created_at?: string | null
          excerpt?: string | null
          id?: string
          is_vip_only?: boolean | null
          published_at?: string | null
          slug?: string
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonies: {
        Row: {
          content: string
          created_at: string
          id: string
          is_public: boolean | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_public?: boolean | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_public?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "testimonies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_category: string | null
          badge_data: Json | null
          badge_level: number | null
          badge_type: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          badge_category?: string | null
          badge_data?: Json | null
          badge_level?: number | null
          badge_type: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          badge_category?: string | null
          badge_data?: Json | null
          badge_level?: number | null
          badge_type?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_certificates: {
        Row: {
          certificate_data: Json | null
          certificate_type: string
          course_id: string
          course_name: string
          id: string
          issued_at: string
          level_index: number | null
          level_name: string | null
          user_id: string
        }
        Insert: {
          certificate_data?: Json | null
          certificate_type: string
          course_id: string
          course_name: string
          id?: string
          issued_at?: string
          level_index?: number | null
          level_name?: string | null
          user_id: string
        }
        Update: {
          certificate_data?: Json | null
          certificate_type?: string
          course_id?: string
          course_name?: string
          id?: string
          issued_at?: string
          level_index?: number | null
          level_name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_certificates_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_streaks: {
        Row: {
          created_at: string
          current_streak: number
          id: string
          last_activity_date: string
          level: number
          longest_streak: number
          total_xp: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          current_streak?: number
          id?: string
          last_activity_date?: string
          level?: number
          longest_streak?: number
          total_xp?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          current_streak?: number
          id?: string
          last_activity_date?: string
          level?: number
          longest_streak?: number
          total_xp?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      vip_users: {
        Row: {
          granted_at: string
          id: string
          is_active: boolean
          user_id: string
          vip_number: number
        }
        Insert: {
          granted_at?: string
          id?: string
          is_active?: boolean
          user_id: string
          vip_number: number
        }
        Update: {
          granted_at?: string
          id?: string
          is_active?: boolean
          user_id?: string
          vip_number?: number
        }
        Relationships: []
      }
      xp_activities: {
        Row: {
          activity_date: string
          activity_type: string
          id: string
          metadata: Json | null
          user_id: string
          xp_earned: number
        }
        Insert: {
          activity_date?: string
          activity_type: string
          id?: string
          metadata?: Json | null
          user_id: string
          xp_earned: number
        }
        Update: {
          activity_date?: string
          activity_type?: string
          id?: string
          metadata?: Json | null
          user_id?: string
          xp_earned?: number
        }
        Relationships: []
      }
      xp_activity_tracking: {
        Row: {
          activity_key: string
          activity_type: string
          awarded_at: string
          id: string
          user_id: string
        }
        Insert: {
          activity_key: string
          activity_type: string
          awarded_at?: string
          id?: string
          user_id: string
        }
        Update: {
          activity_key?: string
          activity_type?: string
          awarded_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_level: {
        Args: { total_xp: number }
        Returns: number
      }
      cleanup_old_rate_limits: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      get_vip_count: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_vip_user: {
        Args: { user_id_input: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user" | "minister"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user", "minister"],
    },
  },
} as const
