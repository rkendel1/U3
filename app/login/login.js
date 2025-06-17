// pages/login.js
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';

export default function Login() {
  const router = useRouter();
  async function handleLogin(form) {
    const res = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
    });
    if (res.ok) router.push('/dashboard');
    else alert('Login failed');
  }
  return (
    <div>
      <h2>Login</h2>
      <AuthForm onSubmit={handleLogin} buttonText="Login" />
    </div>
  );
}