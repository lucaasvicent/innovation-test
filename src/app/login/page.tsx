'use client';

import api from '@/lib/api/api';
import { ENDPOINTS } from '@/lib/api/endpoint';
import { useAuthStore } from '@/lib/store/authStore';
import { Lock, UserRound } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const setToken = useAuthStore((state) => state.setToken);
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post(ENDPOINTS.login, { email, senha });
      if (response.data.status === 1) {
        setToken(response.data.token_de_acesso);
        router.push('/produtos');
      } else {
        setError(response.data.message || 'Erro ao fazer login.');
      }
    } catch (err) {
      setError('Ocorreu um erro na requisição. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex flex-col min-h-screen items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: "url('/login.jpg')" }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-green-600 mb-6 text-center">
        Bem-vindo a Innovation Brindes
      </h2>

      <div className="w-full max-w-md rounded-lg -[#83BE06]bg p-8 shadow-lg">
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2">
            <UserRound className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              id="user"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Usuário"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              required
            />
          </div>

          <div className="flex items-center gap-2 rounded-full bg-white px-4 py-2">
            <Lock className="h-5 w-5 text-gray-500" />
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Senha"
              className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-500"
              required
            />
          </div>

          <div className="flex items-center justify-between text-sm text-white">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="accent-white" />
              <span>Manter logado</span>
            </label>
            <a href="#" className="hover:underline">
              Esqueceu a senha?
            </a>
          </div>

          {error && <p className="text-sm text-red-100">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-white py-2 text-black font-semibold hover:bg-gray-100 transition disabled:bg-gray-200 disabled:text-gray-400"
          >
            {isLoading ? 'Entrando...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
