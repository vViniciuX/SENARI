import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '@config/firebase.config';

export class StorageService {
  static async uploadImage(
    uri: string,
    path: string,
    fileName: string
  ): Promise<string> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `${path}/${fileName}`);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error('Erro ao fazer upload de imagem:', error);
      throw error;
    }
  }

  static async uploadFile(
    uri: string,
    path: string,
    fileName: string
  ): Promise<string> {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `${path}/${fileName}`);
      const snapshot = await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(snapshot.ref);

      return downloadURL;
    } catch (error) {
      console.error('Erro ao fazer upload de arquivo:', error);
      throw error;
    }
  }

  static async uploadProfilePicture(
    userId: string,
    uri: string
  ): Promise<string> {
    const fileName = `profile_${userId}_${Date.now()}.jpg`;
    return this.uploadImage(uri, `users/${userId}/profile`, fileName);
  }

  static async uploadMissionBanner(
    missaoId: string,
    uri: string
  ): Promise<string> {
    const fileName = `banner_${missaoId}_${Date.now()}.jpg`;
    return this.uploadImage(uri, `missoes/${missaoId}/banner`, fileName);
  }

  static async uploadMissionEvidence(
    missaoId: string,
    usuarioId: string,
    uri: string
  ): Promise<string> {
    const fileName = `evidence_${Date.now()}.jpg`;
    return this.uploadImage(uri, `missoes/${missaoId}/evidencias/${usuarioId}`, fileName);
  }

  static async uploadTeamBanner(
    equipeId: string,
    uri: string
  ): Promise<string> {
    const fileName = `banner_${equipeId}_${Date.now()}.jpg`;
    return this.uploadImage(uri, `equipes/${equipeId}/banner`, fileName);
  }

  static async uploadCommunityMedia(
    usuarioId: string,
    uri: string
  ): Promise<string> {
    const fileName = `media_${Date.now()}.jpg`;
    return this.uploadImage(uri, `comunidade/${usuarioId}/media`, fileName);
  }

  static async deleteFile(fileURL: string): Promise<void> {
    try {
      const fileRef = ref(storage, fileURL);
      await deleteObject(fileRef);
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error);
      throw error;
    }
  }

  static async deleteProfilePicture(userId: string, fileName: string): Promise<void> {
    const fileRef = ref(storage, `users/${userId}/profile/${fileName}`);
    await deleteObject(fileRef);
  }
}
