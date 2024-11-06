import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  // Método para iniciar sesión con email y contraseña
  async login(email: string, password: string) {
    try {
      await this.afAuth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error en el inicio de sesión:', error);
      throw error; // Vuelve a lanzar el error para manejarlo en el componente
    }
  }

  // Método para registrar un nuevo usuario
  async register(email: string, password: string) {
    try {
      await this.afAuth.createUserWithEmailAndPassword(email, password);
    } catch (error) {
      console.error('Error en el registro:', error);
      throw error; // Vuelve a lanzar el error para manejarlo en el componente
    }
  }

  // Método para cerrar sesión
  async logout() {
    await this.afAuth.signOut();
  }

  // Método para obtener el ID del usuario autenticado
  async getUserId(): Promise<string | null> {
    const user = await this.afAuth.currentUser;
    return user ? user.uid : null; // Retorna el userId del usuario autenticado o null
  }
}
