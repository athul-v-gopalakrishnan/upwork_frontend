import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { jobService } from '../services/jobService';
import { proposalService } from '../services/proposalService';
import type { Job } from '../types';

export default function JobDetailPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!jobId) return;
    setIsLoading(true);
    jobService
      .getJob(Number(jobId))
      .then(setJob)
      .catch((err) => {
        alert(err instanceof Error ? err.message : 'Failed to load job.');
        navigate('/jobs');
      })
      .finally(() => setIsLoading(false));
  }, [jobId, navigate]);

  const handleGenerateProposal = async () => {
    if (!job) return;
    setIsGenerating(true);
    try {
      const result = await proposalService.generateProposal(job.job_url);
      setJob({ ...job, proposal_generation_status: 'processing' });
      alert(result.message || 'Proposal generation started.');
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to generate proposal. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-4 bg-upwork-light-green rounded w-24 mb-6" />
          <div className="h-8 bg-upwork-light-green rounded w-3/4 mb-4" />
          <div className="h-4 bg-upwork-light-green rounded w-1/3 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-4 bg-upwork-light-green rounded w-full" />
              <div className="h-4 bg-upwork-light-green rounded w-full" />
              <div className="h-4 bg-upwork-light-green rounded w-5/6" />
              <div className="h-4 bg-upwork-light-green rounded w-4/6" />
            </div>
            <div className="space-y-4">
              <div className="h-40 bg-upwork-light-green rounded-xl" />
              <div className="h-48 bg-upwork-light-green rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!job) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Back link */}
      <Link
        to="/jobs"
        className="inline-flex items-center gap-1.5 text-sm text-upwork-green hover:text-upwork-dark-green font-medium mb-6 transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Jobs
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title Card */}
          <div className="bg-white border border-upwork-border rounded-xl p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h1 className="text-2xl font-bold text-upwork-text mb-2">{job.job_title}</h1>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-upwork-muted">
                  <a
                    href={job.job_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-upwork-green hover:text-upwork-dark-green hover:underline"
                  >
                    View on Upwork ↗
                  </a>
                </div>
              </div>
              <span
                className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${
                  job.job_description.job_type === 'Fixed Price'
                    ? 'bg-blue-50 text-blue-700'
                    : 'bg-purple-50 text-purple-700'
                }`}
              >
                {job.job_description.job_type === 'Fixed Price' ? '💰 Fixed Price' : '⏱ Hourly'}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white border border-upwork-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-upwork-text mb-4">Job Description</h2>
            <div className="text-sm text-upwork-text leading-relaxed whitespace-pre-line">
              {job.job_description.summary}
            </div>
          </div>

          {/* Job Details Grid */}
          <div className="bg-white border border-upwork-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-upwork-text mb-4">Job Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center gap-1.5 text-xs text-upwork-muted mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Rate
                </div>
                <p className="text-sm font-semibold text-upwork-text">{job.job_description.hourly_rate}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-upwork-muted mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Type
                </div>
                <p className="text-sm font-semibold text-upwork-text">{job.job_description.job_type}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-upwork-muted mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Duration
                </div>
                <p className="text-sm font-semibold text-upwork-text">{job.job_description.duration}</p>
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs text-upwork-muted mb-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Qualified
                </div>
                <p className="text-sm font-semibold text-upwork-text">{job.job_description.qualified ? '✅ Yes' : '❌ No'}</p>
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="bg-white border border-upwork-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-upwork-text mb-4">Skills & Expertise</h2>
            <div className="flex flex-wrap gap-2">
              {job.job_description.skills
                .split(',')
                .map((skill) => skill.trim())
                .filter(Boolean)
                .map((skill) => (
                  <span
                    key={skill}
                    className="inline-block bg-upwork-light-green text-upwork-text text-sm font-medium px-4 py-1.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
            </div>
          </div>

          {/* Questions */}
          {job.job_description.questions && job.job_description.questions !== 'N/A' && (
            <div className="bg-white border border-upwork-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-upwork-text mb-4">Screening Questions</h2>
              <div className="text-sm text-upwork-text leading-relaxed whitespace-pre-line">
                {job.job_description.questions}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Action Button */}
          <div className="bg-white border border-upwork-border rounded-xl p-6 space-y-3">
            {job.proposal_generation_status === 'processing' || isGenerating ? (
              <button
                disabled
                className="w-full bg-yellow-500 text-white py-3 rounded-full text-sm font-semibold transition-colors disabled:opacity-80 disabled:cursor-not-allowed"
              >
                <span className="inline-flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Processing...
                </span>
              </button>
            ) : job.proposal_generation_status === 'pending' ? (
              <button
                onClick={handleGenerateProposal}
                className="w-full bg-upwork-green text-white py-3 rounded-full text-sm font-semibold hover:bg-upwork-dark-green transition-colors cursor-pointer"
              >
                ✨ Generate Proposal
              </button>
            ) : (
              <Link
                to={`/jobs/${job.id}/proposal`}
                className="block w-full bg-upwork-green text-white py-3 rounded-full text-sm font-semibold hover:bg-upwork-dark-green transition-colors text-center"
              >
                📄 View Proposal
              </Link>
            )}
          </div>

          {/* Client Info */}
          <div className="bg-white border border-upwork-border rounded-xl p-6">
            <h3 className="text-base font-semibold text-upwork-text mb-4">About the Client</h3>
            <div className="space-y-3">
              {job.job_description.payment_verified && (
                <div className="flex items-center gap-2 text-sm">
                  <svg className="w-5 h-5 text-upwork-green" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-upwork-text font-medium">Payment Verified</span>
                </div>
              )}

              <div className="pt-2 border-t border-upwork-border/50 space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-upwork-muted">Location</span>
                  <span className="text-upwork-text font-medium">{job.job_description.client_location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-upwork-muted">Total Spent</span>
                  <span className="text-upwork-text font-medium">{job.job_description.total_spent}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-upwork-muted">Hire Rate</span>
                  <span className="text-upwork-text font-medium">{job.job_description.hire_rate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-upwork-muted">Member Since</span>
                  <span className="text-upwork-text font-medium">{job.job_description.member_since}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
