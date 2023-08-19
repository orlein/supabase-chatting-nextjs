export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      channels: {
        Row: {
          created_by: string;
          id: number;
          inserted_at: string;
          slug: string;
        };
        Insert: {
          created_by: string;
          id?: number;
          inserted_at?: string;
          slug: string;
        };
        Update: {
          created_by?: string;
          id?: number;
          inserted_at?: string;
          slug?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'channels_created_by_fkey';
            columns: ['created_by'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      messages: {
        Row: {
          channel_id: number;
          client_side_uuid: string;
          id: number;
          inserted_at: string;
          message: string | null;
          server_side_uuid: string | null;
          user_id: string;
        };
        Insert: {
          channel_id: number;
          client_side_uuid?: string;
          id?: number;
          inserted_at?: string;
          message?: string | null;
          server_side_uuid?: string | null;
          user_id: string;
        };
        Update: {
          channel_id?: number;
          client_side_uuid?: string;
          id?: number;
          inserted_at?: string;
          message?: string | null;
          server_side_uuid?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'messages_channel_id_fkey';
            columns: ['channel_id'];
            referencedRelation: 'channels';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'messages_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      role_permissions: {
        Row: {
          id: number;
          permission: Database['public']['Enums']['app_permission'];
          role: Database['public']['Enums']['app_role'];
        };
        Insert: {
          id?: number;
          permission: Database['public']['Enums']['app_permission'];
          role: Database['public']['Enums']['app_role'];
        };
        Update: {
          id?: number;
          permission?: Database['public']['Enums']['app_permission'];
          role?: Database['public']['Enums']['app_role'];
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          id: number;
          role: Database['public']['Enums']['app_role'];
          user_id: string;
        };
        Insert: {
          id?: number;
          role: Database['public']['Enums']['app_role'];
          user_id: string;
        };
        Update: {
          id?: number;
          role?: Database['public']['Enums']['app_role'];
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'user_roles_user_id_fkey';
            columns: ['user_id'];
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          id: string;
          status: Database['public']['Enums']['user_status'] | null;
          username: string | null;
        };
        Insert: {
          id: string;
          status?: Database['public']['Enums']['user_status'] | null;
          username?: string | null;
        };
        Update: {
          id?: string;
          status?: Database['public']['Enums']['user_status'] | null;
          username?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      authorize: {
        Args: {
          requested_permission: Database['public']['Enums']['app_permission'];
          user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      app_permission: 'channels.delete' | 'messages.delete';
      app_role: 'admin' | 'moderator';
      user_status: 'ONLINE' | 'OFFLINE';
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
