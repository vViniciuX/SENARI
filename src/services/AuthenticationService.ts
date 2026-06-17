import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  confirmPasswordReset,
  Auth,
} from 'firebase/auth';
import { auth } from '@config/firebase.config';

const MAX_LOGIN_ATTEMPTS = parseInt(process.env.EXPO_PUBLIC_MAX_TENTATIVAS_LOGIN || '5', 10);
const LOCKOUT_DURATION = parseInt(process.env.EXPO_PUBLIC_TEMPO_BLOQUEIO_LOGIN || '900000', 10);

export class AuthenticationService {
  private static loginAttempts: Map<string, { count: number; timestamp: number }> = new Map();

  static async cadastro(
    email: string,
    senha: string,
    nome: string,
    dataNascimento: string
  ): Promise<any> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
      await sendEmailVerification(userCredential.user);

      return {
        success: true,
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        message: 'Cadastro realizado com sucesso. Verifique seu e-mail.',
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.mapFirebaseError(error.code),
      };
    }
  }

  static async login(email: string, senha: string): Promise<any> {
    try {
      // Verificar tentativas de login
      const attempts = this.loginAttempts.get(email);
      if (attempts && attempts.count >= MAX_LOGIN_ATTEMPTS) {
        const timeElapsed = Date.now() - attempts.timestamp;
        if (timeElapsed < LOCKOUT_DURATION) {
          const remainingTime = Math.ceil((LOCKOUT_DURATION - timeElapsed) / 1000);
          return {
            success: false,
            bloqueado: true,
            tempoRestante: remainingTime,
            error: `Conta temporariamente bloqueada. Tente novamente em ${remainingTime}s`,
          };
        } else {
          this.loginAttempts.delete(email);
        }
      }

      const userCredential = await signInWithEmailAndPassword(auth, email, senha);

      // Verificar se o e-mail foi verificado
      if (!userCredential.user.emailVerified) {
        await auth.signOut();
        return {
          success: false,
          emailNaoVerificado: true,
          email: userCredential.user.email,
          error: 'E-mail não verificado. Verifique seu e-mail para continuar.',
        };
      }

      // Limpar tentativas de login
      this.loginAttempts.delete(email);

      return {
        success: true,
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        message: 'Login realizado com sucesso',
      };
    } catch (error: any) {
      // Incrementar tentativas de login
      const attempts = this.loginAttempts.get(email);
      if (attempts) {
        attempts.count += 1;
      } else {
        this.loginAttempts.set(email, { count: 1, timestamp: Date.now() });
      }

      return {
        success: false,
        tentativas: this.loginAttempts.get(email)?.count || 1,
        error: this.mapFirebaseError(error.code),
      };
    }
  }

  static async esqueceuSenha(email: string): Promise<any> {
    try {
      await sendPasswordResetEmail(auth, email);
      return {
        success: true,
        message: 'E-mail de recuperação de senha enviado com sucesso.',
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.mapFirebaseError(error.code),
      };
    }
  }

  static async redefinirSenha(codigoResetSenha: string, novaSenha: string): Promise<any> {
    try {
      await confirmPasswordReset(auth, codigoResetSenha, novaSenha);
      return {
        success: true,
        message: 'Senha redefinida com sucesso.',
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.mapFirebaseError(error.code),
      };
    }
  }

  static async reenviarVerificacaoEmail(): Promise<any> {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        return {
          success: true,
          message: 'E-mail de verificação reenviado com sucesso.',
        };
      }
      return {
        success: false,
        error: 'Nenhum usuário autenticado.',
      };
    } catch (error: any) {
      return {
        success: false,
        error: this.mapFirebaseError(error.code),
      };
    }
  }

  static async logout(): Promise<void> {
    await auth.signOut();
  }

  static getCurrentUser() {
    return auth.currentUser;
  }

  static async getIdToken(): Promise<string> {
    if (auth.currentUser) {
      return await auth.currentUser.getIdToken();
    }
    throw new Error('Nenhum usuário autenticado');
  }

  private static mapFirebaseError(errorCode: string): string {
    const errorMap: { [key: string]: string } = {
      'auth/email-already-in-use': 'E-mail já cadastrado',
      'auth/invalid-email': 'E-mail inválido',
      'auth/weak-password': 'Senha fraca (mínimo 6 caracteres)',
      'auth/user-not-found': 'Usuário não encontrado',
      'auth/wrong-password': 'Senha incorreta',
      'auth/too-many-requests': 'Muitas tentativas. Tente novamente mais tarde.',
      'auth/operation-not-allowed': 'Operação não permitida',
      'auth/invalid-credential': 'Credenciais inválidas',
    };

    return errorMap[errorCode] || 'Erro de autenticação. Tente novamente.';
  }
}
