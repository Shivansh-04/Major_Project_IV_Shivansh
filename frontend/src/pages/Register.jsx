import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';

export default function Register() {
  const [searchParams] = useSearchParams();
  const defaultRole = searchParams.get('role') === 'company' ? 'company' : 'candidate';

  const [role, setRole] = useState(defaultRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, name, email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('name', data.name);
      navigate(data.role === 'company' ? '/company/dashboard' : '/candidate/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4">
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Create your account</h1>

        <div className="flex mb-5 rounded-lg overflow-hidden border border-slate-700">
          <button type="button" onClick={() => setRole('candidate')}
            className={`flex-1 py-2 text-sm ${role === 'candidate' ? 'bg-indigo-600' : 'bg-slate-800 text-slate-400'}`}>
            Job Seeker
          </button>
          <button type="button" onClick={() => setRole('company')}
            className={`flex-1 py-2 text-sm ${role === 'company' ? 'bg-emerald-600' : 'bg-slate-800 text-slate-400'}`}>
            Company
          </button>
        </div>

        <label className="block text-sm text-slate-400 mb-1">{role === 'company' ? 'Company Name' : 'Full Name'}</label>
        <input value={name} onChange={(e) => setName(e.target.value)} required
          className="w-full mb-4 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm" />

        <label className="block text-sm text-slate-400 mb-1">Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
          className="w-full mb-4 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm" />

        <label className="block text-sm text-slate-400 mb-1">Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
          className="w-full mb-4 px-3 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm" />

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <button type="submit" disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-500 py-2 rounded-lg text-sm font-medium">
          {loading ? 'Creating account...' : 'Sign Up'}
        </button>

        <p className="text-slate-400 text-sm mt-4 text-center">
          Already have an account? <Link to="/login" className="text-indigo-400">Login</Link>
        </p>
      </form>
    </div>
  );
}