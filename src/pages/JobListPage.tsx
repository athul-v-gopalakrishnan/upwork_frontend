import { useState, useEffect, useRef } from 'react';
import { jobService } from '../services/jobService';
import JobCard from '../components/JobCard';
import type { JobListItem } from '../types';

export default function JobListPage() {
  const [jobs, setJobs] = useState<JobListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'generated' | 'draft' | 'applied'>('all');
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const limit = 20;
  const resetPageRef = useRef(false);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const data = await jobService.getJobs({
        search: debouncedSearch || undefined,
        status: statusFilter,
        page,
        limit,
      });
      setJobs(data.jobs);
      setTotal(data.total);
      setHasNext(data.hasNext);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to load jobs.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const id = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => window.clearTimeout(id);
  }, [search]);

  useEffect(() => {
    resetPageRef.current = true;
    setPage(1);
  }, [statusFilter, debouncedSearch]);

  useEffect(() => {
    if (resetPageRef.current) {
      if (page !== 1) return;
      resetPageRef.current = false;
    }
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, statusFilter, debouncedSearch]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
  };

  const clearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setPage(1);
  };


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-upwork-text">Find Work</h1>
        <p className="text-sm text-upwork-muted mt-1">
          Browse jobs that match your skills and interests
        </p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-3 flex-wrap">
          <div className="flex-1 relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-upwork-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for jobs by title, skill, or keyword..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-upwork-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-upwork-green focus:border-transparent transition-shadow placeholder:text-upwork-muted/60"
            />
          </div>
          <button
            type="submit"
            className="bg-upwork-green text-white px-6 py-3 rounded-xl text-sm font-semibold hover:bg-upwork-dark-green transition-colors cursor-pointer"
          >
            Search
          </button>
          <div className="min-w-[200px]">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="w-full px-4 py-3 bg-white border border-upwork-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-upwork-green focus:border-transparent transition-shadow"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="generated">Generated</option>
              <option value="draft">Draft</option>
              <option value="applied">Applied</option>
            </select>
          </div>
        </div>
      </form>

      {/* Results Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-upwork-muted">
          {isLoading ? 'Loading...' : `${jobs.length} of ${total} jobs`}
        </p>
        <p className="text-xs text-upwork-muted">
          Page {page} of {Math.max(1, Math.ceil(total / limit))}
        </p>
      </div>

      {/* Job List */}
      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-upwork-border rounded-xl p-6 animate-pulse"
            >
              <div className="h-4 bg-upwork-light-green rounded w-24 mb-3" />
              <div className="h-6 bg-upwork-light-green rounded w-3/4 mb-3" />
              <div className="h-4 bg-upwork-light-green rounded w-1/2 mb-4" />
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-upwork-light-green rounded w-full" />
                <div className="h-3 bg-upwork-light-green rounded w-5/6" />
              </div>
              <div className="flex gap-2">
                <div className="h-7 bg-upwork-light-green rounded-full w-16" />
                <div className="h-7 bg-upwork-light-green rounded-full w-20" />
                <div className="h-7 bg-upwork-light-green rounded-full w-14" />
              </div>
            </div>
          ))}
        </div>
      ) : jobs.length === 0 ? (
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <h3 className="text-lg font-semibold text-upwork-text mb-1">No jobs found</h3>
          <p className="text-sm text-upwork-muted">
            Try adjusting your search or filters to find more results.
          </p>
          <button
            onClick={clearFilters}
            className="mt-4 text-sm text-upwork-green font-semibold hover:text-upwork-dark-green cursor-pointer"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && total > 0 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-upwork-border text-upwork-text hover:bg-upwork-light-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>
          <span className="text-sm text-upwork-muted">
            Page {page} of {Math.max(1, Math.ceil(total / limit))}
          </span>
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!hasNext}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-upwork-border text-upwork-text hover:bg-upwork-light-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}
