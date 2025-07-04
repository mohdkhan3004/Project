import { supabase, handleSupabaseError } from '../lib/supabase';
import type { Complaint } from '../types/complaint';
import type { Database } from '../types/database';

type ComplaintRow = Database['public']['Tables']['complaints']['Row'];
type ComplaintInsert = Database['public']['Tables']['complaints']['Insert'];
type ComplaintUpdate = Database['public']['Tables']['complaints']['Update'];

// Convert database row to Complaint type
const mapRowToComplaint = (row: ComplaintRow): Complaint => ({
  id: row.id,
  name: row.name,
  email: row.email,
  phone: row.phone || undefined,
  ward: row.ward || undefined,
  type: row.type,
  description: row.description,
  priority: row.priority as 'Low' | 'Medium' | 'High',
  location: {
    lat: Number(row.location_lat),
    lng: Number(row.location_lng),
    address: row.location_address,
  },
  image: row.image_url || null,
  status: row.status as 'pending' | 'in_progress' | 'resolved' | 'rejected',
  date: row.date_reported,
  createdAt: new Date(row.created_at),
});

// Convert Complaint to database insert format
const mapComplaintToInsert = (complaint: Complaint): ComplaintInsert => ({
  id: complaint.id,
  name: complaint.name,
  email: complaint.email,
  phone: complaint.phone || null,
  ward: complaint.ward || null,
  type: complaint.type,
  description: complaint.description,
  priority: complaint.priority,
  location_lat: complaint.location.lat,
  location_lng: complaint.location.lng,
  location_address: complaint.location.address,
  image_url: complaint.image || null,
  status: complaint.status,
  date_reported: complaint.date,
});

export const complaintService = {
  // Create a new complaint
  async createComplaint(complaint: Complaint): Promise<Complaint> {
    try {
      const insertData = mapComplaintToInsert(complaint);
      
      const { data, error } = await supabase
        .from('complaints')
        .insert(insertData)
        .select()
        .single();

      if (error) throw error;
      
      return mapRowToComplaint(data);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  },

  // Get all complaints with optional filtering
  async getComplaints(filters?: {
    status?: string;
    type?: string;
    ward?: string;
    search?: string;
  }): Promise<Complaint[]> {
    try {
      let query = supabase
        .from('complaints')
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.type) {
        query = query.eq('type', filters.type);
      }
      if (filters?.ward) {
        query = query.eq('ward', filters.ward);
      }
      if (filters?.search) {
        query = query.or(`id.ilike.%${filters.search}%,type.ilike.%${filters.search}%,location_address.ilike.%${filters.search}%,name.ilike.%${filters.search}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      
      return data.map(mapRowToComplaint);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  },

  // Get a single complaint by ID
  async getComplaintById(id: string): Promise<Complaint | null> {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Not found
        }
        throw error;
      }
      
      return mapRowToComplaint(data);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  },

  // Update complaint status (admin function)
  async updateComplaintStatus(id: string, status: string): Promise<Complaint> {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      
      return mapRowToComplaint(data);
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  },

  // Get complaint statistics
  async getComplaintStats(): Promise<{
    total: number;
    pending: number;
    inProgress: number;
    resolved: number;
    rejected: number;
  }> {
    try {
      const { data, error } = await supabase
        .from('complaints')
        .select('status');

      if (error) throw error;

      const stats = {
        total: data.length,
        pending: data.filter(c => c.status === 'pending').length,
        inProgress: data.filter(c => c.status === 'in_progress').length,
        resolved: data.filter(c => c.status === 'resolved').length,
        rejected: data.filter(c => c.status === 'rejected').length,
      };

      return stats;
    } catch (error) {
      handleSupabaseError(error);
      throw error;
    }
  },

  // Real-time subscription to complaints
  subscribeToComplaints(callback: (complaints: Complaint[]) => void) {
    const subscription = supabase
      .channel('complaints_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'complaints',
        },
        () => {
          // Refetch all complaints when any change occurs
          this.getComplaints().then(callback).catch(console.error);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  },
};