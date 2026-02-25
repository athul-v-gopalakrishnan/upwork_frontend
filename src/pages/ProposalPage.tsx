import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { jobService } from '../services/jobService';
import { proposalService } from '../services/proposalService';
import type { Job } from '../types';
import type { ProposalData } from '../services/proposalService';

export default function ProposalPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [proposal, setProposal] = useState<ProposalData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [coverLetter, setCoverLetter] = useState('');
  const [qas, setQas] = useState<ProposalData['questions_and_answers']>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isApplying, setIsApplying] = useState(false);
  const [isReverting, setIsReverting] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<'general_profile' | 'machine_learning'>('general_profile');
  const [isApplied, setIsApplied] = useState(false);

  useEffect(() => {
    if (!jobId) return;

    const loadData = async () => {
      try {
        const jobData = await jobService.getJob(Number(jobId));
        setJob(jobData);

        if (jobData.proposal_generation_status === 'processing') {
          setProposal(null);
          setCoverLetter('');
          setQas([]);
          return;
        }

        const result = await proposalService.getProposal(jobData.job_url);
        if (result.status === 'Done') {
          setProposal(result.proposal);
          setCoverLetter(result.proposal.cover_letter || '');
          setQas(result.proposal.questions_and_answers || []);
          setSelectedProfile(result.profile || 'general_profile');
          setIsApplied(result.applied || false);
        } else {
          alert('Proposal not found for this job.');
          navigate(`/jobs/${jobId}`);
        }
      } catch (err) {
        alert(err instanceof Error ? err.message : 'Failed to load proposal.');
        navigate(`/jobs/${jobId}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [jobId, navigate]);

  const wordCount = coverLetter.trim()
    ? coverLetter.trim().split(/\s+/).length
    : 0;

  const handleAnswerChange = (index: number, value: string) => {
    setQas((prev) =>
      prev.map((qa, i) => (i === index ? { ...qa, answer: value } : qa))
    );
  };

  const handleSave = async () => {
    if (!job) return;
    setIsSaving(true);
    try {
      const normalizedQas = Array.isArray(qas) ? qas : [];
      const payload = {
        job_url: job.job_url,
        profile: selectedProfile,
        proposal: {
          cover_letter: coverLetter,
          questions_and_answers: normalizedQas,
        },
      };
      const result = await proposalService.saveProposal(payload);
      if (result.status === 'Done') {
        alert('Proposal saved successfully.');
      } else {
        alert('Failed to save proposal.');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to save proposal.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleApplyForJob = async () => {
    if (!job) return;
    setIsApplying(true);
    try {
      const result = await proposalService.applyForJob(job.job_url);
      if (result.status) {
        alert(result.message || 'Application queued successfully!');
      } else {
        alert('Failed to queue application.');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to apply for job.');
    } finally {
      setIsApplying(false);
    }
  };

  const handleRevert = async () => {
    if (!job) return;
    setIsReverting(true);
    try {
      const result = await proposalService.getProposal(job.job_url);
      if (result.status === 'Done') {
        setCoverLetter(result.proposal.cover_letter || '');
        setQas(result.proposal.questions_and_answers || []);
      } else {
        alert('Failed to fetch saved proposal.');
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to revert changes.');
    } finally {
      setIsReverting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-4 bg-upwork-light-green rounded w-24" />
          <div className="h-8 bg-upwork-light-green rounded w-3/4" />
          <div className="h-64 bg-upwork-light-green rounded-xl" />
        </div>
      </div>
    );
  }

  if (job?.proposal_generation_status === 'processing') {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white border border-upwork-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-upwork-text mb-2">Proposal is still processing</h2>
          <p className="text-sm text-upwork-muted mb-4">
            The proposal hasn’t been generated yet. Please wait and try again later.
          </p>
          <Link
            to={`/jobs/${jobId}`}
            className="inline-flex items-center gap-1.5 text-sm text-upwork-green hover:text-upwork-dark-green font-medium transition-colors"
          >
            ← Back to Job Details
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back link */}
      <Link
        to={`/jobs/${jobId}`}
        className="inline-flex items-center gap-1.5 text-sm text-upwork-green hover:text-upwork-dark-green font-medium mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Job Details
      </Link>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">

      {/* Header */}
      <div className="bg-white border border-upwork-border rounded-xl p-6 mb-6">
        <div className="flex items-center gap-2 text-xs text-upwork-muted mb-2">
          <span className="bg-upwork-light-green text-upwork-green font-semibold px-2.5 py-0.5 rounded-full">
            Proposal
          </span>
          <span>for</span>
        </div>
        <h1 className="text-xl font-bold text-upwork-text mb-2">{job?.job_title}</h1>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-upwork-muted">
          <span className="font-medium text-upwork-text">{job?.job_description.hourly_rate}</span>
          <span>{job?.job_description.job_type}</span>
          <span>{job?.job_description.duration}</span>
        </div>
      </div>

      {/* Profile Selection */}
      {proposal && (
        <div className="bg-white border border-upwork-border rounded-xl p-6 mb-6">
          <label className="block text-sm font-semibold text-upwork-text mb-2">
            Select Profile
          </label>
          <select
            value={selectedProfile}
            onChange={(e) => setSelectedProfile(e.target.value as 'general_profile' | 'machine_learning')}
            className="w-full px-4 py-2.5 border border-upwork-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-upwork-green focus:border-transparent transition-shadow bg-white text-upwork-text cursor-pointer"
          >
            <option value="general_profile">General Profile</option>
            <option value="machine_learning">Machine Learning</option>
          </select>
        </div>
      )}
      {proposal && (
        <div className="bg-white border border-upwork-border rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-upwork-text">Cover Letter</h2>
            <p className="text-xs text-upwork-muted">{wordCount} words</p>
          </div>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={14}
            className="w-full px-4 py-3 border border-upwork-border rounded-xl text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-upwork-green focus:border-transparent transition-shadow resize-y placeholder:text-upwork-muted/60 font-sans"
            placeholder="Write your cover letter here..."
          />
        </div>
      )}

      {/* Questions & Answers */}
      {proposal && (
        <div className="bg-white border border-upwork-border rounded-xl p-6 mb-6">
          <h2 className="text-lg font-semibold text-upwork-text mb-4">Questions & Answers</h2>
          {qas.length === 0 ? (
            <p className="text-sm text-upwork-muted">No screening questions for this job.</p>
          ) : (
            <div className="space-y-4">
              {qas.map((qa, i) => (
                <div key={i} className="bg-upwork-light-green rounded-lg p-4">
                  <p className="text-xs font-semibold text-upwork-muted mb-2">Q: {qa.question}</p>
                  <textarea
                    value={qa.answer}
                    onChange={(e) => handleAnswerChange(i, e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-upwork-border rounded-lg text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-upwork-green focus:border-transparent transition-shadow resize-y placeholder:text-upwork-muted/60 font-sans"
                    placeholder="Type your answer..."
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

        </div>

        {/* Right Sidebar */}
        <div className="fixed right-20 top-24 w-80">
          {proposal && (
            <div className="space-y-4">
              <button
                onClick={handleApplyForJob}
                disabled={isApplying || isApplied}
                className={`w-full py-4 rounded-xl text-base font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer ${
                  isApplied
                    ? 'bg-gray-400 text-white hover:bg-gray-500 disabled:opacity-60'
                    : 'bg-upwork-green text-white hover:bg-upwork-dark-green disabled:opacity-60 disabled:cursor-not-allowed'
                }`}
              >
                {isApplying ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Applying...
                  </>
                ) : isApplied ? (
                  <>
                    ✓ Already Applied
                  </>
                ) : (
                  <>
                    🚀 Apply for Job
                  </>
                )}
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-upwork-text text-white py-3 rounded-xl text-sm font-semibold hover:bg-upwork-dark-text transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isSaving ? 'Saving...' : '💾 Save Proposal'}
              </button>
              <button
                onClick={handleRevert}
                disabled={isReverting}
                className="w-full bg-gray-400 text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {isReverting ? 'Reverting...' : '↶ Revert Changes'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
