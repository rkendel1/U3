// pages/dashboard.js
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ title: '', description: '', budget: '' });

  if (status === 'loading') return <div>Loading...</div>;
  if (!session) {
    router.push('/login');
    return null;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch('/api/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ title: '', description: '', budget: '' });
    alert('Job posted!');
  }

  return (
    <div>
      <Navbar />
      <h2>Post a Job</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
        <textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
        <input type="number" placeholder="Budget" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} required />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}