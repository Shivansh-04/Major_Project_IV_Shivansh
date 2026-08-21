import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      <nav className="flex justify-between items-center px-8 py-5">
        <span className="text-xl font-bold">CareerAI</span>
        <div className="space-x-4">
          <Link to="/login" className="text-sm text-slate-300 hover:text-white">Login</Link>
          <Link to="/register" className="text-sm bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg">Get Started</Link>
        </div>
      </nav>

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl leading-tight">
          Your AI-Powered Career Advisor & Job Matching Engine
        </h1>
        <p className="text-slate-400 mt-4 max-w-xl">
          Upload your resume, get matched to the right jobs, find your skill gaps, and get personalized career advice — powered by NLP and semantic matching.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-12 w-full max-w-3xl">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left">
            <h2 className="text-lg font-semibold mb-2">For Job Seekers</h2>
            <p className="text-slate-400 text-sm mb-4">
              Upload your resume, get matched to relevant jobs, and see exactly what skills to learn next.
            </p>
            <Link to="/register?role=candidate" className="inline-block bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-sm">
              Join as Job Seeker
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-left">
            <h2 className="text-lg font-semibold mb-2">For Companies</h2>
            <p className="text-slate-400 text-sm mb-4">
              Post job openings and let AI rank incoming candidates by fit, automatically.
            </p>
            <Link to="/register?role=company" className="inline-block bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg text-sm">
              Join as Company
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}