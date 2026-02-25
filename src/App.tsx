import { Routes, Route, Navigate } from 'react-router'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import JobListPage from './pages/JobListPage'
import JobDetailPage from './pages/JobDetailPage'
import ProposalPage from './pages/ProposalPage'
import PromptListPage from './pages/PromptListPage'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes (no navbar) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected routes (with navbar layout) */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/jobs/:jobId" element={<JobDetailPage />} />
          <Route path="/jobs/:jobId/proposal" element={<ProposalPage />} />
          <Route path="/prompts" element={<PromptListPage />} />
        </Route>

        {/* Redirect root to jobs */}
        <Route path="/" element={<Navigate to="/jobs" replace />} />
        <Route path="*" element={<Navigate to="/jobs" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
