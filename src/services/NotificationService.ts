import * as Notifications from 'expo-notifications';
import { getMessaging, onMessage } from 'firebase/messaging';
import { messaging } from '@config/firebase.config';
import { NotificacaoInterna, NotificacaoPush } from '@types/index';
import { FirestoreService } from './FirestoreService';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export class NotificationService {
  static async requestPermissions(): Promise<boolean> {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('Erro ao solicitar permissões de notificação:', error);
      return false;
    }
  }

  static async getExpoPushToken(): Promise<string | null> {
    try {
      const token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: process.env.EXPO_PUBLIC_EXPO_PROJECT_ID,
        })
      ).data;
      return token;
    } catch (error) {
      console.error('Erro ao obter token Expo Push:', error);
      return null;
    }
  }

  static setupPushNotificationListener(
    onReceive: (notification: any) => void
  ): () => void {
    const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
      onReceive(response.notification);
    });

    return () => {
      subscription.remove();
    };
  }

  static setupFirebaseMessagingListener(
    onReceive: (message: any) => void
  ): (() => void) | null {
    try {
      const unsubscribe = onMessage(messaging, (message) => {
        onReceive(message);
      });
      return unsubscribe;
    } catch (error) {
      console.error('Erro ao configurar listener de Firebase Messaging:', error);
      return null;
    }
  }

  static async sendLocalNotification(
    titulo: string,
    descricao: string,
    dados?: Record<string, any>
  ): Promise<void> {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: titulo,
        body: descricao,
        data: dados || {},
      },
      trigger: { seconds: 1 },
    });
  }

  static async saveInternalNotification(
    usuarioId: string,
    notificacao: Omit<NotificacaoInterna, 'id' | 'criadoEm'>
  ): Promise<void> {
    await FirestoreService.registerAuditLog({
      tipo: 'notificacao_interna',
      usuarioId,
      entidadeId: usuarioId,
      entidadeTipo: 'notificacao',
      alteracoes: notificacao,
    });
  }

  static async notifyMissionParticipants(
    missaoId: string,
    titulo: string,
    mensagem: string,
    dados?: Record<string, any>
  ): Promise<void> {
    const missao = await FirestoreService.getMissao(missaoId);
    if (missao) {
      for (const usuarioId of missao.participantes) {
        await this.saveInternalNotification(usuarioId, {
          tipo: 'missao',
          titulo,
          mensagem,
          dados: { missaoId, ...dados },
          lida: false,
        });
      }
    }
  }

  static async notifyTeamMembers(
    equipeId: string,
    titulo: string,
    mensagem: string,
    dados?: Record<string, any>
  ): Promise<void> {
    const equipe = await FirestoreService.getEquipe(equipeId);
    if (equipe) {
      for (const membro of equipe.membros) {
        await this.saveInternalNotification(membro.usuarioId, {
          tipo: 'equipe',
          titulo,
          mensagem,
          dados: { equipeId, ...dados },
          lida: false,
        });
      }
    }
  }

  static async notifyNewComment(
    usuarioId: string,
    nomeComentante: string,
    publicacaoId: string
  ): Promise<void> {
    await this.saveInternalNotification(usuarioId, {
      tipo: 'comentario',
      titulo: `Novo comentário de ${nomeComentante}`,
      mensagem: 'Você recebeu um novo comentário em sua publicação',
      dados: { publicacaoId },
      lida: false,
    });
  }

  static async notifyMissionCompletion(
    usuarioId: string,
    missaoTitulo: string,
    pontosGanhos: number
  ): Promise<void> {
    await this.saveInternalNotification(usuarioId, {
      tipo: 'missao_concluida',
      titulo: `Missão concluída: ${missaoTitulo}`,
      mensagem: `Você ganhou ${pontosGanhos} EcoPontos!`,
      dados: { pontosGanhos },
      lida: false,
    });
  }
}
