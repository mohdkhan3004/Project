export interface Database {
  public: {
    Tables: {
      complaints: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          ward: string | null;
          type: string;
          description: string;
          priority: string;
          location_lat: number;
          location_lng: number;
          location_address: string;
          image_url: string | null;
          status: string;
          date_reported: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          phone?: string | null;
          ward?: string | null;
          type: string;
          description: string;
          priority?: string;
          location_lat: number;
          location_lng: number;
          location_address: string;
          image_url?: string | null;
          status?: string;
          date_reported: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          phone?: string | null;
          ward?: string | null;
          type?: string;
          description?: string;
          priority?: string;
          location_lat?: number;
          location_lng?: number;
          location_address?: string;
          image_url?: string | null;
          status?: string;
          date_reported?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          full_name: string;
          role: string;
          is_active: boolean;
          created_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          full_name: string;
          role?: string;
          is_active?: boolean;
          created_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          full_name?: string;
          role?: string;
          is_active?: boolean;
          created_at?: string;
          last_login?: string | null;
        };
      };
    };
  };
}