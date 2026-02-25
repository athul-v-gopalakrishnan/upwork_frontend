// Job service — connects to real API endpoints
import type { Job, JobListItem, JobListResponse } from '../types';
import { api } from './api';

export const jobService = {
  async getJobs(filters?: {
    search?: string;
    page?: number;
    limit?: number;
    status?: string;
  }): Promise<{ jobs: JobListItem[]; total: number; hasNext: boolean }> {
    const params = new URLSearchParams();
    if (filters?.page) params.set('page', String(filters.page));
    if (filters?.limit) params.set('limit', String(filters.limit));
    if (filters?.status) params.set('status', filters.status);
    if (filters?.search) params.set('search', filters.search);

    const query = params.toString();
    const endpoint = query ? `/jobs/?${query}` : '/jobs/';
    const data = await api.get<JobListResponse>(endpoint);

    return { jobs: data.jobs, total: data.total, hasNext: data.has_next };
  },

  async getJob(id: number): Promise<Job> {
    return api.get<Job>(`/jobs/${id}`);
  },

  async applyToJob(jobId: number, coverLetter: string): Promise<{ success: boolean }> {
    // TODO: Replace with real apply endpoint when available
    console.log(`Applying to job ${jobId} with cover letter:`, coverLetter);
    return { success: true };
  },
};
