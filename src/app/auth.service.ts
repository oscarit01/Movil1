import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore // Agregamos Firestore
  ) {
    // Configurar la persistencia de sesión al inicializar el servicio
    this.setPersistence();
  }

  // Configura la persistencia local para mantener la sesión iniciada
  async setPersistence(): Promise<void> {
    try {
      await this.afAuth.setPersistence('local'); // Configura la persistencia local
      console.log('Persistencia configurada en local');
    } catch (error) {
      console.error('Error al configurar la persistencia:', error);
      throw error;
    }
  }

  // Método para iniciar sesión con email y contraseña
  async login(email: string, password: string): Promise<void> {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('Inicio de sesión exitoso');
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error;
    }
  }

  // Método para registrar un nuevo usuario
  async register(email: string, password: string): Promise<void> {
    try {
      const credential = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      // Crear un documento en Firestore para el nuevo usuario
      if (credential.user) {
        await this.firestore.collection('users').doc(credential.user.uid).set({
          email: credential.user.email,
          displayName: '', // Nombre por defecto vacío
          description: '', // Descripción por defecto vacía
          profilePicture: null, // Foto de perfil vacía inicialmente
          createdAt: new Date(), // Fecha de creación
        });
        console.log('Usuario registrado y perfil inicial creado en Firestore');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error;
    }
  }

  // Método para cerrar sesión
  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      console.log('Cierre de sesión exitoso');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  // Método para obtener el ID del usuario autenticado
  async getUserId(): Promise<string | null> {
    try {
      const user = await this.afAuth.currentUser;
      return user?.uid || null;
    } catch (error) {
      console.error('Error al obtener el ID del usuario:', error);
      return null;
    }
  }

  // Método para verificar el estado de autenticación en tiempo real
  getAuthState() {
    return this.afAuth.authState;
  }

  // Método para verificar si el usuario está autenticado
  async isAuthenticated(): Promise<boolean> {
    try {
      const user = await this.afAuth.currentUser;
      return !!user;
    } catch (error) {
      console.error('Error al verificar la autenticación:', error);
      return false;
    }
  }

  // Método para obtener el perfil del usuario desde Firestore
  async getUserProfile(): Promise<any> {
    const userId = await this.getUserId();
    if (!userId) {
      throw new Error('Usuario no autenticado.');
    }

    try {
      const userDoc = await this.firestore
        .collection('users')
        .doc(userId)
        .get()
        .toPromise();
      return userDoc?.data() || null;
    } catch (error) {
      console.error('Error al obtener el perfil del usuario:', error);
      throw error;
    }
  }

  // Método para actualizar el perfil del usuario en Firestore
  async updateUserProfile(
    data: Partial<{
      displayName: string;
      description: string;
      profilePicture: string;
    }>
  ): Promise<void> {
    const userId = await this.getUserId();
    if (!userId) {
      throw new Error('Usuario no autenticado.');
    }

    try {
      await this.firestore.collection('users').doc(userId).update(data);
      console.log('Perfil del usuario actualizado en Firestore');
    } catch (error) {
      console.error('Error al actualizar el perfil del usuario:', error);
      throw error;
    }
  }
}
