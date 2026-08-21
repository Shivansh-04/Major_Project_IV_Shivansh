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
    <main className="min-h-screen bg-[#f5f3ee] px-6 py-6 text-[#171816] lg:px-10">
      <nav className="flex w-full items-center justify-between">
        <Link to="/" className="text-xl font-black tracking-[-0.08em]">career<span className="text-[#a7d129]">/</span>ai</Link>
        <Link to="/" className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b6d65] transition hover:text-[#171816]">Back home <span aria-hidden="true">↗</span></Link>
      </nav>

      <section className="grid min-h-[calc(100vh-7rem)] w-full items-center gap-12 py-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <div className="hidden lg:block">
          <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b951e]">Start your signal</p>
          <h1 className="max-w-sm text-6xl font-black leading-[0.9] tracking-[-0.08em]">Make the next step <span className="text-[#7b951e]">intentional.</span></h1>
          <div className="mt-16 border-t border-[#171816]/25 pt-4 text-sm leading-6 text-[#6b6d65]"><span className="font-bold text-[#171816]">01</span><p className="mt-8 max-w-xs">Tell us where you are going. We&apos;ll help surface the path that fits.</p></div>
        </div>

        <form onSubmit={handleSubmit} className="mx-auto w-full max-w-md border-t-2 border-[#171816] pt-7">
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b951e]">New profile</p>
          <h2 className="text-4xl font-black tracking-[-0.07em]">Create your signal.</h2>
          <p className="mt-4 text-sm leading-6 text-[#6b6d65]">A clearer direction starts with a few details.</p>

          <div className="mt-8 grid grid-cols-2 border border-[#171816]">
            <button type="button" onClick={() => setRole('candidate')} aria-pressed={role === 'candidate'} className={`px-3 py-3 text-xs font-bold transition ${role === 'candidate' ? 'bg-[#a7d129] text-[#171816]' : 'bg-transparent text-[#6b6d65] hover:bg-[#e8e6df]'}`}>Job seeker</button>
            <button type="button" onClick={() => setRole('company')} aria-pressed={role === 'company'} className={`border-l border-[#171816] px-3 py-3 text-xs font-bold transition ${role === 'company' ? 'bg-[#a7d129] text-[#171816]' : 'bg-transparent text-[#6b6d65] hover:bg-[#e8e6df]'}`}>Company</button>
          </div>

          <div className="mt-6 space-y-5">
            <div><label htmlFor="register-name" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em]">{role === 'company' ? 'Company name' : 'Full name'}</label><input id="register-name" value={name} onChange={(e) => setName(e.target.value)} required autoComplete="name" className="w-full border-b border-[#171816]/30 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#6b6d65]/60 focus:border-[#7b951e]" placeholder={role === 'company' ? 'Your company' : 'Your name'} /></div>
            <div><label htmlFor="register-email" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em]">Email</label><input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" className="w-full border-b border-[#171816]/30 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#6b6d65]/60 focus:border-[#7b951e]" placeholder="you@example.com" /></div>
            <div><label htmlFor="register-password" className="mb-2 block text-xs font-bold uppercase tracking-[0.14em]">Password</label><input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete="new-password" className="w-full border-b border-[#171816]/30 bg-transparent px-0 py-3 text-sm outline-none transition placeholder:text-[#6b6d65]/60 focus:border-[#7b951e]" placeholder="Create a password" /></div>
          </div>

          {error && <p role="alert" className="mt-5 border-l-2 border-red-600 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

          <button type="submit" disabled={loading} className="mt-8 w-full bg-[#a7d129] px-6 py-3 text-sm font-bold transition hover:bg-[#171816] hover:text-white disabled:cursor-not-allowed disabled:opacity-60">{loading ? 'Building your signal...' : 'Create profile'} <span aria-hidden="true">↗</span></button>
          <p className="mt-6 text-center text-sm text-[#6b6d65]">Already have an account? <Link to="/login" className="font-bold text-[#171816] underline decoration-[#a7d129] decoration-2 underline-offset-4">Sign in</Link></p>
        </form>
      </section>
    </main>
  );
}