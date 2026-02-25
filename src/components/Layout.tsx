import { Outlet } from 'react-router';
import Navbar from './Navbar';

export default function Layout() {
  return (
    <div className="min-h-screen bg-upwork-bg">
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
