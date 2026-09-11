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

    // Sanitiza entradas contra espaços extras acidentais e caracteres invisíveis
    const cleanEmail = email
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .trim()
      .toLowerCase();
    const cleanPass = password
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .trim();
    const lowerPass = cleanPass.toLowerCase();

    // Verificação dos e-mails autorizados (inclui sócios, contato, nivea e admin)
    const isSocios = 
      cleanEmail === 'socios@3ppatrimonio.com.br' ||
      cleanEmail === 'socios@3ppatrimonio.com' ||
      cleanEmail === 'socios3p@3ppatrimonio.com.br' ||
      cleanEmail === 'cristiano@3ppatrimonio.com.br' ||
      cleanEmail === 'niveacristinas@gmail.com' ||
      cleanEmail === 'nivea@3ppatrimonio.com.br' ||
      cleanEmail.includes('nivea') ||
      cleanEmail === 'admin@3ppatrimonio.com.br' ||
      cleanEmail === 'admin' ||
      cleanEmail === 'socio' ||
      cleanEmail === 'socios';

    const isContato = 
      cleanEmail === 'contato@3ppatrimonio.com.br' ||
      cleanEmail === 'contato@3ppatrimonio.com' ||
      cleanEmail === 'contato';

    // Aceita 3P@socios (qualquer variação), 3p@2026, ou qualquer senha válida
    const isPassValid = 
      cleanPass === '3P@socios' || 
      cleanPass === '3p@socios' || 
      lowerPass === '3p@socios' ||
      lowerPass === '3psocios' ||
      lowerPass === '3p@2026' ||
      lowerPass === '3p2026' ||
      lowerPass === 'admin' ||
      lowerPass === 'socios' ||
      cleanPass.length >= 3;

    let authorized = (isSocios || isContato) && isPassValid;
    const isNivea = cleanEmail.includes('nivea');
    let authUser = {
      name: isNivea 
        ? 'Nívea Cristina (Sócia Gestora)' 
        : isContato 
          ? 'Contato 3P Patrimônio' 
          : 'Sócio 3P Patrimônio',
      email: isNivea 
        ? 'niveacristinas@gmail.com' 
        : isContato 
          ? 'contato@3ppatrimonio.com.br' 
          : 'socios@3ppatrimonio.com.br'
    };

    // Caso a validação local direta não passe, tenta checagem adicional no servidor
    if (!authorized) {
      try {
        const resp = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: cleanEmail, password: cleanPass })
        });
        if (resp.ok) {
          const data = await resp.json();
          if (data.success && data.user) {
            authorized = true;
            authUser = data.user;
          }
        }
      } catch {
        // Prossegue com o resultado da autorização
      }
    }

    setLoading(false);

    if (authorized) {
      setSuccessMsg('Acesso autorizado! Abrindo painel CRM...');
      // Dispara sucesso e abre o painel diretamente
      onLoginSuccess(authUser.name, authUser.email);
    } else {
      setErrorMsg('E-mail ou senha incorretos.');
    }
  };

  const handleDirectAccess = () => {
    setLoading(true);
    setSuccessMsg('Acesso concedido! Abrindo painel CRM...');
    onLoginSuccess('Sócio 3P Patrimônio', 'socios@3ppatrimonio.com.br');
  };

  const handleFillCredentials = () => {
    setEmail('socios@3ppatrimonio.com.br');
    setPassword('3P@socios');
    setErrorMsg('');
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
                type="text"
                inputMode="email"
                required
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
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
                autoCapitalize="none"
                autoCorrect="off"
                spellCheck={false}
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
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 mt-2 cursor-pointer"
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

        {/* Atalhos Rápidos para Teste e Acesso dos Sócios */}
        <div className="pt-2 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between gap-2 text-[11px]">
            <span className="text-slate-400">Credencial Oficial:</span>
            <button
              type="button"
              onClick={handleFillCredentials}
              className="text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-2 transition-colors cursor-pointer"
            >
              Preencher dados oficiais
            </button>
          </div>

          <button
            type="button"
            onClick={handleDirectAccess}
            className="w-full py-2 px-3 bg-slate-950 hover:bg-slate-800/80 border border-amber-500/30 hover:border-amber-400 text-amber-300 hover:text-amber-200 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Acesso Rápido de Sócio (1 Clique)</span>
          </button>

          <p className="text-center text-[10px] text-slate-500 pt-1">
            E-mail: <code>socios@3ppatrimonio.com.br</code> • Senha: <code>3P@socios</code>
          </p>
        </div>

      </div>
    </div>
  );
};
