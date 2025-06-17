// components/AuthForm.js
import { useState } from 'react';

export default function AuthForm({ onSubmit, buttonText }) {
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  return (
    <form onSubmit={e => { e.preventDefault(); onSubmit(form); }}>
      <input placeholder="Name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
      <input type="email" placeholder="Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
      <input type="password" placeholder="Password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
      <button type="submit">{buttonText}</button>
    </form>
  );
}