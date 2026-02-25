// Proposal service — connects to real API endpoints
import { api } from './api';

export interface QuestionAnswer {
  question: string;
  answer: string;
}

export interface ProposalData {
  cover_letter: string;
  questions_and_answers: QuestionAnswer[];
}

export interface GenerateProposalResponse {
  status: string;
  job_type: string;
  job_url: string;
  proposal: ProposalData;
  message?: string;
}

export interface GetProposalResponse {
  status: string;
  job_url: string;
  job_type: string;
  profile?: 'general_profile' | 'machine_learning';
  proposal: ProposalData;
  applied: boolean;
}

export interface SaveProposalRequest {
  job_url: string;
  profile?: 'general_profile' | 'machine_learning';
  proposal: ProposalData;
}

export interface SaveProposalResponse {
  status: string;
  job_url: string;
  proposal: ProposalData;
}

export interface ApplyForJobResponse {
  status: string;
  message: string;
}

export const proposalService = {
  async generateProposal(jobUrl: string): Promise<GenerateProposalResponse> {
    const encoded = encodeURIComponent(jobUrl);
    return api.post<GenerateProposalResponse>(
      `/proposals/generate_proposal?job_url=${encoded}`,
      {}
    );
  },

  async getProposal(jobUrl: string): Promise<GetProposalResponse> {
    const encoded = encodeURIComponent(jobUrl);
    return api.get<GetProposalResponse>(
      `/proposals/get_proposal?job_url=${encoded}`
    );
  },

  async saveProposal(payload: SaveProposalRequest): Promise<SaveProposalResponse> {
    return api.post<SaveProposalResponse>('/proposals/save_proposal', payload);
  },

  async applyForJob(jobUrl: string): Promise<ApplyForJobResponse> {
    const payload = { job_url: jobUrl };
    const params = new URLSearchParams();
    params.set('task_type', 'apply_for_job');
    params.set('payload', JSON.stringify(payload));
    const query = params.toString();
    return api.get<ApplyForJobResponse>(`/tasks/enqueue_task?${query}`);
  },
};
