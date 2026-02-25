import { Link } from 'react-router';

export default function MyProposalsPage() {
  // Placeholder — will wire to a real backend later
  const proposals = [
    {
      id: 'prop-1',
      jobTitle: 'Full-Stack Developer for SaaS Dashboard',
      jobId: '1',
      status: 'submitted' as const,
      createdAt: '2026-02-15T10:30:00Z',
    },
    {
      id: 'prop-5',
      jobTitle: 'AI/ML Engineer – NLP Chatbot Development',
      jobId: '5',
      status: 'draft' as const,
      createdAt: '2026-02-16T08:15:00Z',
    },
  ];

  const statusStyles = {
    draft: 'bg-yellow-50 text-yellow-700',
    submitted: 'bg-blue-50 text-blue-700',
    accepted: 'bg-green-50 text-green-700',
    rejected: 'bg-red-50 text-red-700',
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-upwork-text">My Proposals</h1>
        <p className="text-sm text-upwork-muted mt-1">
          Track your submitted and draft proposals
        </p>
      </div>

      {proposals.length === 0 ? (
        <div className="text-center py-16 bg-white border border-upwork-border rounded-xl">
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
          <h3 className="text-lg font-semibold text-upwork-text mb-1">No proposals yet</h3>
          <p className="text-sm text-upwork-muted mb-4">
            Browse jobs and start submitting proposals!
          </p>
          <Link
            to="/jobs"
            className="inline-block bg-upwork-green text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-upwork-dark-green transition-colors"
          >
            Find Work
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <div
              key={proposal.id}
              className="bg-white border border-upwork-border rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <Link
                    to={`/jobs/${proposal.jobId}`}
                    className="text-base font-semibold text-upwork-text hover:text-upwork-green transition-colors"
                  >
                    {proposal.jobTitle}
                  </Link>
                  <p className="text-xs text-upwork-muted mt-1">
                    {new Date(proposal.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
                    statusStyles[proposal.status]
                  }`}
                >
                  {proposal.status}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <Link
                  to={`/jobs/${proposal.jobId}`}
                  className="text-sm text-upwork-green font-medium hover:text-upwork-dark-green transition-colors"
                >
                  View Job
                </Link>
                <span className="text-upwork-border">|</span>
                <Link
                  to={`/jobs/${proposal.jobId}/proposal`}
                  className="text-sm text-upwork-green font-medium hover:text-upwork-dark-green transition-colors"
                >
                  {proposal.status === 'draft' ? 'Edit Proposal' : 'View Proposal'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
