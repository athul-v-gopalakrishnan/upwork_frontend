export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface ClientInfo {
  location: string;
  paymentVerified: boolean;
  totalSpent: string;
  hireRate: string;
  memberSince: string;
}

export interface JobDescription {
  client_location: string;
  hire_rate: string;
  total_spent: string;
  member_since: string;
  payment_verified: boolean;
  summary: string;
  duration_type: string;
  duration: string;
  hourly_rate: string;
  job_type: string;
  skills: string;
  qualified: boolean;
  questions: string;
}

// Job as returned from the list endpoint (no job_description)
export interface JobListItem {
  id: number;
  job_uuid: number;
  job_url: string;
  job_title: string;
  proposal_generation_status: string;
}

// Job as returned from the detail endpoint (includes job_description)
export interface Job extends JobListItem {
  job_description: JobDescription;
}

export interface JobListResponse {
  page: number;
  limit: number;
  total: number;
  has_next: boolean;
  jobs: JobListItem[];
}

export interface Proposal {
  id: string;
  jobId: string;
  coverLetter: string;
  status: 'draft' | 'submitted' | 'accepted' | 'rejected';
  createdAt: string;
}
