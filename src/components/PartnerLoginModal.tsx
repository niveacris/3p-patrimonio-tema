import React, { useState } from 'react';
import { X, Lock, Mail, ShieldCheck, CheckCircle2, KeyRound } from 'lucide-react';
import { BrandLogo } from './BrandLogo';

interface PartnerLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (partnerName: string, partnerEmail: string) => void;
}

export const PartnerLoginModal: React.FC<PartnerLoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    const validEmails = ['socios@3ppatrimonio.com.br', 'contato@3ppatrimonio.com.br'];
    const isValidPass = password === '3P@socios' || password === '3p@socios';

    setTimeout(() => {
      setLoading(false);
      const inputEmail = email.trim().toLowerCase();

      if (validEmails.includes(inputEmail) && isValidPass) {
        setSuccessMsg('Acesso autorizado! Carregando painel dos sócios...');
        setTimeout(() => {
          onLoginSuccess('Sócio 3P Patrimônio', inputEmail);
          onClose();
        }, 600);
      } else {
        setErrorMsg('E-mail ou senha incorretos.');
      }
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-950/80 hover:bg-slate-800 rounded-full transition-all border border-slate-800"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 mx-auto">
            <BrandLogo variant="badge_3p" size="xl" />
          </div>

          <div>
            <span className="inline-block px-3 py-1 bg-amber-500/10 text-amber-400 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-amber-500/20">
              Área Restrita
            </span>
            <h2 className="text-xl font-bold text-white tracking-tight mt-2">
              Login dos Sócios
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Informe suas credenciais para acessar a gestão interna.
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-xs font-medium flex items-center gap-2">
              <Lock className="w-4 h-4 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 p-3 rounded-xl text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-slate-300">
              E-mail corporativo
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="email"
                required
                placeholder="socios@3ppatrimonio.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-semibold text-slate-300">
              Senha
            </label>
            <div className="relative">
              <KeyRound className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-amber-500 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-2.5 text-xs text-slate-500 hover:text-slate-300 font-medium"
              >
                {showPassword ? 'Ocultar' : 'Ver'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span>Autenticando...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Entrar no Painel</span>
              </>
            )}
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800/80 text-center text-[10px] text-slate-500">
          <p>3P Patrimônio • Acesso Restrito aos Sócios</p>
        </div>

      </div>
    </div>
  );
};
