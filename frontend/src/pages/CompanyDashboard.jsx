import { useNavigate } from 'react-router-dom';

export default function CompanyDashboard() {
  const navigate = useNavigate();
  const name = localStorage.getItem('name');

  const logout = () => { localStorage.clear(); navigate('/'); };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Welcome, {name} 👋</h1>
        <button onClick={logout} className="text-sm text-slate-400 hover:text-white">Logout</button>
      </div>
      <p className="text-slate-400">Company dashboard — job posting and AI-ranked candidates coming next.</p>
    </div>
  );
}