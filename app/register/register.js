// pages/register.js
import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';

export default function Register() {
  const router = useRouter();
  async function handleRegister(form) {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) router.push('/login');
    else alert('Registration failed');
  }
  return (
    <div>
      <h2>Register</h2>
      <AuthForm onSubmit={handleRegister} buttonText="Register" />
    </div>
  );
}