import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

const API = 'http://localhost:5000/api';

export default function CandidateDashboard() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const authHeaders = { Authorization: `Bearer ${token}` };

  const [profile, setProfile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [loadingJobs, setLoadingJobs] = useState(true);

  const fetchProfile = async () => {
    const res = await fetch(`${API}/candidate/profile`, { headers: authHeaders });
    setProfile(await res.json());
  };

  const fetchJobs = async () => {
    setLoadingJobs(true);
    const res = await fetch(`${API}/candidate/jobs`, { headers: authHeaders });
    setJobs(await res.json());
    setLoadingJobs(false);
  };

  useEffect(() => {
    if (!token) { navigate('/login'); return; }
    Promise.resolve().then(() => {
      fetchProfile();
      fetchJobs();
    });
    // eslint-disable-next-line
  }, []);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('resume', file);
      const res = await fetch(`${API}/candidate/resume`, { method: 'POST', headers: authHeaders, body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Upload failed');
      setProfile(data.user);
      await fetchJobs();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const logout = () => { localStorage.clear(); navigate('/'); };

  if (!profile) {
    return <main className="flex min-h-screen items-center justify-center bg-[#f5f3ee] text-sm text-[#6b6d65]">Reading your signal...</main>;
  }

  const skills = profile.skills || [];
  const topMatch = jobs[0];

  return (
    <main className="min-h-screen bg-[#f5f3ee] text-[#171816]">
      <nav className="border-b border-[#171816]/15 bg-[#f5f3ee]">
        <div className="flex w-full items-center justify-between px-6 py-5 lg:px-12">
          {/* <Link to="/" className="text-xl font-black tracking-[-0.08em]">career<span className="text-[#a7d129]">/</span>ai</Link> */}
          <div className="flex items-center gap-8">
  <Link
    to="/"
    className="text-xl font-black tracking-[-0.08em]"
  >
    career<span className="text-[#a7d129]">/</span>ai
  </Link>

  <span className="hidden border-l border-[#171816]/20 pl-8 text-[11px] font-bold uppercase tracking-[0.18em] text-[#6b6d65] sm:block">
    Candidate workspace
  </span>
</div>
          <div className="flex items-center gap-5"><span className="hidden text-sm text-[#6b6d65] sm:block">Hi, {profile.name}</span><button onClick={logout} className="text-xs font-bold uppercase tracking-[0.16em] text-[#6b6d65] transition hover:text-[#171816]">Log out <span aria-hidden="true">↗</span></button></div>
        </div>
      </nav>

      <section className="w-full px-6 pb-12 pt-12 lg:px-12 lg:pb-16 lg:pt-16">
        <div className="flex flex-col justify-between gap-7 border-b border-[#171816] pb-10 md:flex-row md:items-end">
          <div><p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#7b951e]">Your career signal</p><h1 className="max-w-3xl text-5xl font-black leading-[0.9] tracking-[-0.08em] sm:text-7xl">A clearer path starts <span className="text-[#7b951e]">here.</span></h1><p className="mt-6 max-w-lg text-sm leading-6 text-[#6b6d65]">Your profile is being compared with live opportunities. Upload your resume to make every match more precise.</p></div>
          <div className="flex shrink-0 items-center gap-4 border-l-2 border-[#a7d129] pl-4"><span className="text-5xl font-black tracking-[-0.08em]">{jobs.length}</span><span className="max-w-[90px] text-xs font-bold uppercase leading-4 tracking-[0.12em] text-[#6b6d65]">roles found for you</span></div>
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="space-y-8">
            <section className="border border-[#171816] bg-[#20221d] p-5 text-white shadow-[8px_8px_0_#a7d129] sm:p-6">
              <div className="mb-8 flex items-start justify-between"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-white/45">Profile status</p><h2 className="text-2xl font-bold tracking-[-0.05em]">{profile.resumeFileName ? 'Signal is active' : 'Signal needs a source'}</h2></div><span className="text-2xl text-[#a7d129]">{profile.resumeFileName ? '●' : '○'}</span></div>
              <form onSubmit={handleUpload} className="space-y-4"><label htmlFor="resume-upload" className="block cursor-pointer border border-dashed border-white/25 p-4 transition hover:border-[#a7d129]"><span className="mb-2 block text-xs font-bold text-white">{file ? file.name : profile.resumeFileName || 'Choose a PDF or DOCX resume'}</span><span className="block text-xs text-white/45">{file ? 'Ready to parse' : 'Your resume powers every match'}</span><input id="resume-upload" type="file" accept=".pdf,.docx" onChange={(e) => setFile(e.target.files[0])} className="sr-only" /></label><button type="submit" disabled={!file || uploading} className="w-full bg-[#a7d129] px-4 py-3 text-sm font-bold text-[#171816] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50">{uploading ? 'Parsing your signal...' : profile.resumeFileName ? 'Update resume' : 'Upload resume'} <span aria-hidden="true">↗</span></button>{error && <p role="alert" className="border-l-2 border-red-400 bg-red-950/40 px-3 py-2 text-xs text-red-200">{error}</p>}</form>
            </section>

            <section className="border-t-2 border-[#171816] pt-5"><div className="mb-6 flex items-center justify-between"><h2 className="text-xl font-black tracking-[-0.05em]">Your profile</h2><span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#7b951e]">{skills.length} skills</span></div><dl className="space-y-5 text-sm"><div><dt className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6d65]">Education</dt><dd>{profile.education || <span className="text-[#6b6d65]">Not extracted yet</span>}</dd></div><div><dt className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#6b6d65]">Experience</dt><dd>{profile.experience || <span className="text-[#6b6d65]">Not extracted yet</span>}</dd></div></dl><div className="mt-6 flex flex-wrap gap-2">{skills.length > 0 ? skills.map((skill) => <span key={skill} className="border border-[#171816]/20 bg-[#e8e6df] px-2 py-1 text-xs">{skill}</span>) : <p className="text-sm text-[#6b6d65]">Upload a resume to extract your skills.</p>}</div></section>
          </aside>

          <section>
            <div className="mb-5 flex items-end justify-between border-b border-[#171816]/20 pb-4"><div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#7b951e]">The shortlist</p><h2 className="text-2xl font-black tracking-[-0.06em]">Recommended roles</h2></div><span className="text-xs text-[#6b6d65]">Sorted by fit</span></div>
            {loadingJobs ? <div className="border-t border-[#171816]/20 py-8 text-sm text-[#6b6d65]">Finding your best matches...</div> : jobs.length === 0 ? <div className="border border-dashed border-[#171816]/30 px-6 py-12 text-center"><p className="mb-2 text-lg font-bold">No roles yet.</p><p className="text-sm text-[#6b6d65]">New opportunities will appear here as they are added.</p></div> : <div className="space-y-3">{jobs.map((job, index) => <article key={job._id} className="border border-[#171816]/20 bg-[#faf9f5] p-5 transition hover:border-[#171816] hover:shadow-[5px_5px_0_#a7d129] sm:p-6"><div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div className="flex gap-4"><span className="pt-1 text-xs font-bold text-[#7b951e]">0{index + 1}</span><div><h3 className="text-lg font-bold tracking-[-0.04em]">{job.title}</h3><p className="mt-1 text-sm text-[#6b6d65]">{job.company} <span aria-hidden="true">·</span> {job.location}</p></div></div><div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1"><span className="text-3xl font-black tracking-[-0.07em] text-[#7b951e]">{job.matchScore}%</span><span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6b6d65]">match</span></div></div><div className="mt-5 h-1 bg-[#e8e6df]"><div className="h-full bg-[#a7d129]" style={{ width: `${job.matchScore}%` }} /></div><div className="mt-5 grid gap-4 text-xs sm:grid-cols-2"><div><p className="mb-2 font-bold uppercase tracking-[0.12em] text-[#6b6d65]">Matched skills</p><div className="flex flex-wrap gap-2">{(job.matched || []).length > 0 ? job.matched.map((skill) => <span key={skill} className="bg-[#dfe9ad] px-2 py-1 text-[#536815]">+ {skill}</span>) : <span className="text-[#6b6d65]">None yet</span>}</div></div><div><p className="mb-2 font-bold uppercase tracking-[0.12em] text-[#6b6d65]">Build next</p><div className="flex flex-wrap gap-2">{(job.missing || []).length > 0 ? job.missing.map((skill) => <span key={skill} className="bg-[#e8e6df] px-2 py-1 text-[#6b6d65]">{skill}</span>) : <span className="text-[#7b951e]">Strong alignment</span>}</div></div></div></article>)}</div>}
          </section>
        </div>
      </section>
      <footer className="border-t border-[#171816]/15 px-6 py-6 lg:px-12"><div className="flex w-full justify-between text-xs text-[#6b6d65]"><span>career<span className="text-[#7b951e]">/</span>ai candidate workspace</span>{topMatch && <span>Top signal: {topMatch.matchScore}% match</span>}</div></footer>
    </main>
  );
}