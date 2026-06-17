import {
  collection,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@config/firebase.config';
import { User, Missao, Equipe, Publicacao } from '@types/index';

export class FirestoreService {
  // ==================== USER OPERATIONS ====================

  static async createUser(userId: string, userData: Partial<User>): Promise<void> {
    const userDocRef = doc(db, 'users', userId);
    await setDoc(userDocRef, {
      ...userData,
      criadoEm: Timestamp.now(),
      atualizadoEm: Timestamp.now(),
      verificadoEmail: false,
    });
  }

  static async getUser(userId: string): Promise<User | null> {
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    return userDoc.exists() ? (userDoc.data() as User) : null;
  }

  static async updateUser(userId: string, updates: Partial<User>): Promise<void> {
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
      ...updates,
      atualizadoEm: Timestamp.now(),
    });
  }

  static async getUserByEmail(email: string): Promise<User | null> {
    const q = query(collection(db, 'users'), where('email', '==', email));
    const snapshot = await getDocs(q);
    return snapshot.empty ? null : (snapshot.docs[0].data() as User);
  }

  // ==================== MISSION OPERATIONS ====================

  static async createMissao(missaoData: Partial<Missao>): Promise<string> {
    const colRef = collection(db, 'missoes');
    const docRef = await addDoc(colRef, {
      ...missaoData,
      criadoEm: Timestamp.now(),
      atualizadoEm: Timestamp.now(),
      participantes: [],
    });
    return docRef.id;
  }

  static async getMissao(missaoId: string): Promise<Missao | null> {
    const docRef = doc(db, 'missoes', missaoId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as Missao) : null;
  }

  static async updateMissao(missaoId: string, updates: Partial<Missao>): Promise<void> {
    const docRef = doc(db, 'missoes', missaoId);
    await updateDoc(docRef, {
      ...updates,
      atualizadoEm: Timestamp.now(),
    });
  }

  static async deleteMissao(missaoId: string): Promise<void> {
    const docRef = doc(db, 'missoes', missaoId);
    await deleteDoc(docRef);
  }

  static async getMissoesByTurma(turmaId: string): Promise<Missao[]> {
    const q = query(
      collection(db, 'missoes'),
      where('turmas', 'array-contains', turmaId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Missao);
  }

  static async getMissoesByStatus(status: string): Promise<Missao[]> {
    const q = query(collection(db, 'missoes'), where('status', '==', status));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Missao);
  }

  // ==================== TEAM OPERATIONS ====================

  static async createEquipe(equipeData: Partial<Equipe>): Promise<string> {
    const colRef = collection(db, 'equipes');
    const docRef = await addDoc(colRef, {
      ...equipeData,
      criadoEm: Timestamp.now(),
      atualizadoEm: Timestamp.now(),
      membros: [],
    });
    return docRef.id;
  }

  static async getEquipe(equipeId: string): Promise<Equipe | null> {
    const docRef = doc(db, 'equipes', equipeId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as Equipe) : null;
  }

  static async updateEquipe(equipeId: string, updates: Partial<Equipe>): Promise<void> {
    const docRef = doc(db, 'equipes', equipeId);
    await updateDoc(docRef, {
      ...updates,
      atualizadoEm: Timestamp.now(),
    });
  }

  static async deleteEquipe(equipeId: string): Promise<void> {
    const docRef = doc(db, 'equipes', equipeId);
    await deleteDoc(docRef);
  }

  static async getEquipesByInstituicao(instituicaoId: string): Promise<Equipe[]> {
    const q = query(
      collection(db, 'equipes'),
      where('instituicaoId', '==', instituicaoId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Equipe);
  }

  // ==================== COMMUNITY OPERATIONS ====================

  static async createPublicacao(publicacaoData: Partial<Publicacao>): Promise<string> {
    const colRef = collection(db, 'publicacoes');
    const docRef = await addDoc(colRef, {
      ...publicacaoData,
      criadoEm: Timestamp.now(),
      atualizadoEm: Timestamp.now(),
      editado: false,
      deletado: false,
    });
    return docRef.id;
  }

  static async getPublicacao(publicacaoId: string): Promise<Publicacao | null> {
    const docRef = doc(db, 'publicacoes', publicacaoId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as Publicacao) : null;
  }

  static async updatePublicacao(
    publicacaoId: string,
    updates: Partial<Publicacao>
  ): Promise<void> {
    const docRef = doc(db, 'publicacoes', publicacaoId);
    await updateDoc(docRef, {
      ...updates,
      atualizadoEm: Timestamp.now(),
    });
  }

  static async deletePublicacao(publicacaoId: string): Promise<void> {
    const docRef = doc(db, 'publicacoes', publicacaoId);
    await updateDoc(docRef, {
      conteudo: '[Conteúdo removido]',
      deletado: true,
      atualizadoEm: Timestamp.now(),
    });
  }

  static async getPublicacoesByComunidade(comunidadeId: string): Promise<Publicacao[]> {
    const q = query(
      collection(db, 'publicacoes'),
      where('comunidadeId', '==', comunidadeId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Publicacao);
  }

  // ==================== AUDIT LOG OPERATIONS ====================

  static async registerAuditLog(auditData: any): Promise<string> {
    const colRef = collection(db, 'auditLogs');
    const docRef = await addDoc(colRef, {
      ...auditData,
      criadoEm: Timestamp.now(),
    });
    return docRef.id;
  }

  static async getAuditLogsByEntidade(entidadeId: string): Promise<any[]> {
    const q = query(collection(db, 'auditLogs'), where('entidadeId', '==', entidadeId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data());
  }

  // ==================== ECOPONTOS OPERATIONS ====================

  static async getEcoPontos(usuarioId: string): Promise<any | null> {
    const docRef = doc(db, 'ecoPontos', usuarioId);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data() : null;
  }

  static async updateEcoPontos(
    usuarioId: string,
    saldo: number,
    motivo: string
  ): Promise<void> {
    const docRef = doc(db, 'ecoPontos', usuarioId);
    const current = await this.getEcoPontos(usuarioId);

    await setDoc(
      docRef,
      {
        usuarioId,
        saldo: (current?.saldo || 0) + saldo,
        conquistado: (current?.conquistado || 0) + (saldo > 0 ? saldo : 0),
        gasto: (current?.gasto || 0) + (saldo < 0 ? Math.abs(saldo) : 0),
        atualizadoEm: Timestamp.now(),
        motivo,
      },
      { merge: true }
    );
  }
}
