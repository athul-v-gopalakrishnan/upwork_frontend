import { api } from './api';

export interface PromptVersion {
  id?: number;
  prompt_name?: string;
  version: number;
  is_active: boolean;
  created_at: string | null;
}

export interface PromptDetail extends PromptVersion {
  prompt_text: string;
}

class PromptService {
  async listPrompts(): Promise<PromptVersion[]> {
    try {
      const response = await api.get<any>('/prompts/list_proposal_prompt_versions');
      if (response.status === 'Done' && response.value) {
        if (Array.isArray(response.value)) {
          return response.value.map((item: PromptVersion) => ({
            ...item,
            created_at: item.created_at ?? null,
          }));
        }

        // Backward compatibility: parse legacy string format
        const versions: PromptVersion[] = [];
        const lines = response.value.split('\n');
        let currentVersion: Partial<PromptVersion> = {};

        for (const line of lines) {
          if (!line.trim()) {
            if (Object.keys(currentVersion).length > 0) {
              versions.push(currentVersion as PromptVersion);
              currentVersion = {};
            }
            continue;
          }

          const separatorIndex = line.indexOf(':');
          if (separatorIndex === -1) continue;
          const key = line.slice(0, separatorIndex).trim();
          const value = line.slice(separatorIndex + 1).trim();

          if (key && value) {
            if (key === 'version') {
              currentVersion.version = parseInt(value);
            } else if (key === 'is_active') {
              currentVersion.is_active = value === 'True';
            } else if (key === 'created_at') {
              currentVersion.created_at = value !== 'None' ? value : null;
            }
          }
        }

        if (Object.keys(currentVersion).length > 0) {
          versions.push(currentVersion as PromptVersion);
        }

        return versions;
      }

      throw new Error(response.message || 'Failed to fetch prompt versions');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to list prompts');
    }
  }

  async getPrompt(version: number): Promise<PromptDetail> {
    try {
      const response = await api.get<any>(`/prompts/get_proposal_prompt?version=${version}`);

      if (response.status === 'Done' && response.value) {
        const promptDetail = response.value;
        return {
          id: promptDetail.id,
          prompt_name: promptDetail.prompt_name,
          version: promptDetail.version,
          is_active: promptDetail.is_active,
          created_at: promptDetail.created_at,
          prompt_text: promptDetail.prompt_text,
        };
      }

      throw new Error(response.message || 'Failed to fetch prompt');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to get prompt details');
    }
  }

  async getActivePrompt(): Promise<PromptDetail> {
    try {
      const response = await api.get<any>('/prompts/get_active_proposal_prompt');

      if (response.status === 'Done' && response.value) {
        const value = response.value;
        if (typeof value === 'string') {
          return {
            version: -1,
            is_active: true,
            created_at: null,
            prompt_text: value,
          };
        }
        return value as PromptDetail;
      }

      throw new Error(response.message || 'Failed to fetch active prompt');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to get active prompt');
    }
  }

  async updatePrompt(promptText: string): Promise<number> {
    try {
      const response = await api.post<any>(
        `/prompts/update_proposal_prompt?prompt_text=${encodeURIComponent(promptText)}`,
        {}
      );

      if (response.status === 'Done') {
        const match = response.value?.match(/version (\d+)/);
        if (match) {
          return parseInt(match[1]);
        }
        return -1;
      }

      throw new Error(response.message || 'Failed to update prompt');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to update prompt');
    }
  }

  async rollbackPrompt(version: number): Promise<void> {
    try {
      const response = await api.post<any>(`/prompts/rollback_proposal_prompt?version=${version}`, {});

      if (response.status !== 'Done') {
        throw new Error(response.message || 'Failed to rollback prompt');
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to rollback prompt');
    }
  }
}

export const promptService = new PromptService();
