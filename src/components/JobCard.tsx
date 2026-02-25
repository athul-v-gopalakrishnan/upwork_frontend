import { Link } from 'react-router';
import type { JobListItem } from '../types';

interface JobCardProps {
  job: JobListItem;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <Link
      to={`/jobs/${job.id}`}
      className="block bg-white border border-upwork-border rounded-xl p-6 hover:shadow-md hover:border-upwork-green/30 transition-all duration-200 group"
    >
      {/* Title */}
      <h3 className="text-lg font-semibold text-upwork-text group-hover:text-upwork-green transition-colors mb-2 line-clamp-2">
        {job.job_title}
      </h3>

      {/* Meta info */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-upwork-muted mb-3">
        <button
          onClick={(e) => {
            e.preventDefault();       // prevent Link navigation
            e.stopPropagation();      // stop bubbling
            window.open(job.job_url, "_blank", "noopener,noreferrer");
          }}
          className="text-upwork-green hover:text-upwork-dark-green hover:underline"
        >
          View on Upwork
        </button>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-xs text-upwork-muted pt-3 border-t border-upwork-border/50">
        <span>
          {job.proposal_generation_status === 'processing' ? (
            <span className="flex items-center gap-1 text-yellow-600">
              ⏳ Processing
            </span>
          ) : job.proposal_generation_status === 'pending' ? (
            <span>No Proposal Yet</span>
          ) : job.proposal_generation_status === 'applied' ? (
            <span className="flex items-center gap-1 text-upwork-green">
              ✅ Applied for Job
            </span>
          ) : (
            <span className="flex items-center gap-1 text-upwork-green">
              ✓ Proposal Ready
            </span>
          )}
        </span>
      </div>
    </Link>
  );
}
