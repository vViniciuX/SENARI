import { useCallback } from 'react';
import useAuthStore from '@stores/authStore';
import { AuthenticationService } from '@services/AuthenticationService';

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    isLoading,
    error,
    tentativasLogin,
    bloqueioTemporario,
    setUser,
    setAuthenticated,
    setLoading,
    setError,
    incrementarTentativasLogin,
    zerarTentativasLogin,
    setBloqueioTemporario,
    atualizarUser,
    logout: storeLogout,
  } = useAuthStore();

  const login = useCallback(
    async (email: string, senha: string) => {
      setLoading(true);
      setError(null);

      const result = await AuthenticationService.login(email, senha);

      if (result.success) {
        zerarTentativasLogin();
        setAuthenticated(true);
        setLoading(false);
        return { success: true };
      }

      if (result.bloqueado) {
        setBloqueioTemporario(true, result.tempoRestante);
        setError(result.error);
      } else {
        incrementarTentativasLogin();
        if (result.tentativas >= 5) {
          setBloqueioTemporario(true, 15 * 60); // 15 minutos
        }
        setError(result.error);
      }

      setLoading(false);
      return { success: false, error: result.error };
    },
    [
      setLoading,
      setError,
      setAuthenticated,
      zerarTentativasLogin,
      incrementarTentativasLogin,
      setBloqueioTemporario,
    ]
  );

  const cadastro = useCallback(
    async (email: string, senha: string, nome: string, dataNascimento: string) => {
      setLoading(true);
      setError(null);

      const result = await AuthenticationService.cadastro(email, senha, nome, dataNascimento);

      if (result.success) {
        setLoading(false);
        return { success: true, message: result.message };
      }

      setError(result.error);
      setLoading(false);
      return { success: false, error: result.error };
    },
    [setLoading, setError]
  );

  const esqueceuSenha = useCallback(
    async (email: string) => {
      setLoading(true);
      setError(null);

      const result = await AuthenticationService.esqueceuSenha(email);

      if (result.success) {
        setLoading(false);
        return { success: true, message: result.message };
      }

      setError(result.error);
      setLoading(false);
      return { success: false, error: result.error };
    },
    [setLoading, setError]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await AuthenticationService.logout();
      storeLogout();
      setAuthenticated(false);
      setLoading(false);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [setLoading, setError, setAuthenticated, storeLogout]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    tentativasLogin,
    bloqueioTemporario,
    login,
    cadastro,
    esqueceuSenha,
    logout,
    atualizarUser,
  };
};
