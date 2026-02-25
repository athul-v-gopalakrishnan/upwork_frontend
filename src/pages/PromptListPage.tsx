import { useState, useEffect } from 'react';
import { promptService, type PromptVersion, type PromptDetail } from '../services/promptService';

export default function PromptListPage() {
  const [versions, setVersions] = useState<PromptVersion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPrompt, setSelectedPrompt] = useState<PromptDetail | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'create'>('view');
  const [draftText, setDraftText] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const fetchPrompts = async () => {
    setIsLoading(true);
    try {
      const data = await promptService.listPrompts();
      setVersions(data);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to load prompts.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePromptClick = async (version: number) => {
    try {
      const detail = await promptService.getPrompt(version);
      setSelectedPrompt(detail);
      setDraftText(detail.prompt_text);
      setModalMode('view');
      setShowDetailModal(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to load prompt details.');
    }
  };

  const openCreateModal = () => {
    setSelectedPrompt(null);
    setDraftText('');
    setModalMode('create');
    setShowDetailModal(true);
  };

  const handleCreatePrompt = async () => {
    if (!draftText.trim()) {
      alert('Prompt text cannot be empty.');
      return;
    }
    setIsSaving(true);
    try {
      await promptService.updatePrompt(draftText);
      await fetchPrompts();
      closeDetailModal();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to create prompt.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleMakeActive = async (version: number) => {
    try {
      await promptService.rollbackPrompt(version);
      await fetchPrompts();
      closeDetailModal();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to set active prompt.');
    }
  };

  useEffect(() => {
    fetchPrompts();
  }, []);

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedPrompt(null);
    setDraftText('');
    setModalMode('view');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-upwork-text">Prompts</h1>
        <p className="text-sm text-upwork-muted mt-1">
          Manage your reusable proposal templates and cover letter prompts
        </p>
      </div>

      {/* Header Actions */}
      <div className="mb-6 flex gap-3">
        <button
          type="button"
          onClick={openCreateModal}
          className="bg-upwork-green text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-upwork-dark-green transition-colors cursor-pointer"
        >
          + New Prompt
        </button>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-upwork-muted">
          {isLoading ? 'Loading...' : `${versions.length} versions found`}
        </p>
      </div>

      {/* Prompt Versions List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-upwork-border rounded-xl p-4 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="h-6 bg-upwork-light-green rounded w-20" />
                <div className="flex-1 h-4 bg-upwork-light-green rounded w-48" />
                <div className="h-6 bg-upwork-light-green rounded-full w-16" />
              </div>
            </div>
          ))}
        </div>
      ) : versions.length === 0 ? (
        <div className="text-center py-16">
          <svg
            className="mx-auto w-16 h-16 text-upwork-muted/40 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-upwork-text mb-1">No prompts yet</h3>
          <p className="text-sm text-upwork-muted mb-4">
            Create your first prompt to get started with proposal templates.
          </p>
          <button
            onClick={openCreateModal}
            className="inline-block bg-upwork-green text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-upwork-dark-green transition-colors"
          >
            Create Prompt
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {versions.map((version) => (
            <div
              key={version.version}
              className="bg-white border border-upwork-border rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handlePromptClick(version.version)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold text-upwork-text">
                      v{version.version}
                    </span>
                    {version.is_active && (
                      <span className="text-xl" title="Currently Active">
                        ⭐
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-upwork-muted truncate">
                      {version.created_at
                        ? new Date(version.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })
                        : 'Default version'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePromptClick(version.version);
                  }}
                  className="ml-4 text-sm text-upwork-green font-medium hover:text-upwork-dark-green transition-colors"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && (modalMode === 'create' || selectedPrompt) && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={closeDetailModal}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-upwork-border p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-upwork-text">
                    {modalMode === 'create' ? 'Create Prompt' : `Prompt Version ${selectedPrompt?.version}`}
                    {modalMode === 'view' && selectedPrompt?.is_active && (
                      <span className="ml-2 text-xl" title="Currently Active">
                        ⭐
                      </span>
                    )}
                  </h2>
                  {modalMode === 'view' && selectedPrompt?.created_at && (
                    <p className="text-xs text-upwork-muted mt-1">
                      Created: {new Date(selectedPrompt.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  )}
                </div>
                <button
                  onClick={closeDetailModal}
                  className="p-2 hover:bg-upwork-light-green rounded-lg transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-upwork-text"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Modal Body - Prompt Text */}
              <div className="p-6">
                <div className="bg-upwork-light-green/50 rounded-lg p-4 border border-upwork-border max-h-[60vh] overflow-auto">
                  <textarea
                    className="w-full min-h-[320px] bg-transparent text-sm text-upwork-text whitespace-pre-wrap leading-relaxed font-mono focus:outline-none"
                    value={draftText}
                    onChange={(e) => setDraftText(e.target.value)}
                    readOnly={modalMode !== 'create'}
                    placeholder="Write your prompt here..."
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-upwork-border p-6 flex gap-3 justify-end">
                <button
                  onClick={closeDetailModal}
                  className="px-6 py-2 rounded-lg text-sm font-semibold border border-upwork-border text-upwork-text hover:bg-upwork-light-green transition-colors"
                >
                  Close
                </button>
                {modalMode === 'create' ? (
                  <button
                    className="px-6 py-2 rounded-lg text-sm font-semibold bg-upwork-green text-white hover:bg-upwork-dark-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleCreatePrompt}
                    disabled={isSaving}
                  >
                    {isSaving ? 'Saving...' : 'Save Prompt'}
                  </button>
                ) : (
                  selectedPrompt &&
                  !selectedPrompt.is_active && (
                    <button
                      className="px-6 py-2 rounded-lg text-sm font-semibold bg-upwork-green text-white hover:bg-upwork-dark-green transition-colors"
                      onClick={() => handleMakeActive(selectedPrompt.version)}
                    >
                      Make Active
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}