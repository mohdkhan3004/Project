import { useState, useEffect } from 'react';
import { complaintService } from '../services/complaintService';
import type { Complaint } from '../types/complaint';

interface UseComplaintsOptions {
  filters?: {
    status?: string;
    type?: string;
    ward?: string;
    search?: string;
  };
  realtime?: boolean;
}

export const useComplaints = (options: UseComplaintsOptions = {}) => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadComplaints = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await complaintService.getComplaints(options.filters);
      setComplaints(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load complaints');
      console.error('Error loading complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, [JSON.stringify(options.filters)]);

  useEffect(() => {
    if (options.realtime) {
      const unsubscribe = complaintService.subscribeToComplaints((updatedComplaints) => {
        setComplaints(updatedComplaints);
      });

      return unsubscribe;
    }
  }, [options.realtime]);

  const refetch = () => {
    loadComplaints();
  };

  return {
    complaints,
    loading,
    error,
    refetch,
  };
};