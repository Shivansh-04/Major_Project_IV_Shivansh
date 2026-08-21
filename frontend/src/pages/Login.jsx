import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
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
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');

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
    <main className="min-h-screen bg-[#f5f3ee] px-6 py-6 text-[#171816] lg:px-10">
      <nav className="flex w-full items-center justify-between">
        <Link to="/" className="text-xl font-black tracking-[-0.08em]">career<span className="text-[#a7d129]">/</span>ai</Link>
        <Link to="/" className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b6d65] transition hover:text-[#171816]">Back home <span aria-hidden="true">↗</span></Link>
      </nav>

      <section className="grid min-h-[calc(100vh-7rem)] w-full items-center gap-12 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="hidden lg:block">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b951e]">Your next move, clearer</p>
          <h1 className="max-w-sm text-6xl font-black leading-[0.9] tracking-[-0.08em]">Pick up where you <span className="text-[#7b951e]">left off.</span></h1>
          <div className="mt-16 border-t border-[#171816]/25 pt-4 text-sm leading-6 text-[#6b6d65]"><span className="font-bold text-[#171816]">01</span><p className="mt-8 max-w-xs">Your matches, applications, and next steps are waiting in one focused place.</p></div>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md border-t-2 border-[#171816] pt-7">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b951e]">Welcome back</p>
          <h2 className="text-4xl font-black tracking-[-0.07em]">Sign in to your signal.</h2>
          <p className="mt-4 text-sm leading-6 text-[#6b6d65]">Keep your career direction moving.</p>

          <div className="mt-9 space-y-5">
            <div><label htmlFor="login-email" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em]">Email</label><input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="w-full border-b border-[#171816]/30 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#6b6d65]/60 focus:border-[#7b951e]" placeholder="you@example.com" /></div>
            <div><label htmlFor="login-password" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em]">Password</label><input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="current-password" className="w-full border-b border-[#171816]/30 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#6b6d65]/60 focus:border-[#7b951e]" placeholder="Enter your password" /></div>
          </div>

          {error && <p role="alert" className="mt-5 border-l-2 border-red-600 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button type="submit" disabled={loading} className="mt-8 w-full bg-[#a7d129] px-6 py-3 text-sm font-bold transition hover:bg-[#171816] hover:text-white disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Reading your signal...' : 'Sign in'} <span aria-hidden="true">↗</span></button>
          <p className="mt-6 text-center text-sm text-[#6b6d65]">New here? <Link to="/register" className="font-bold text-[#171816] underline decoration-[#a7d129] decoration-2 underline-offset-4">Create an account</Link></p>
        </form>
      </section>
    </main>
  );
}