// src/app/job.service.ts
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Job } from './job.model';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth para la autenticación
import { map } from 'rxjs/operators'; // Importa map para transformar los datos

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private firestore: AngularFirestore, private afAuth: AngularFireAuth) {} // Inyecta AngularFireAuth

  // Método para agregar un trabajo
  addJob(job: Job): Promise<any> {
    const id = this.firestore.createId(); // Genera un nuevo ID
    return this.afAuth.currentUser.then(user => {
      if (user) {
        const jobWithUser = { ...job, id, userId: user.uid }; // Añade el userId del usuario autenticado
        return this.firestore.collection('jobs').doc(id).set(jobWithUser)
          .then(() => {
            console.log('Trabajo creado con éxito:', jobWithUser); // Mensaje de éxito para depuración
            return jobWithUser; // Retorna el trabajo creado
          })
          .catch(error => {
            console.error('Error al crear trabajo:', error); // Mensaje de error para depuración
            throw error; // Vuelve a lanzar el error para que pueda ser manejado donde se llama
          });
      } else {
        throw new Error('No está autenticado');
      }
    });
  }

  // Método para obtener todos los trabajos
  getJobs(): Observable<Job[]> {
    return this.firestore.collection<Job>('jobs').valueChanges();
  }

  // Método para obtener un trabajo por su ID
  getJobById(id: string): Observable<Job | undefined> {
    return this.firestore.collection<Job>('jobs').doc<Job>(id).valueChanges();
  }

  // Método para actualizar un trabajo solo si el usuario es el creador
  updateJob(id: string, updatedJob: Partial<Job>): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        // Verifica si el usuario autenticado es el creador del trabajo
        return this.getJobById(id).pipe(
          map(job => {
            if (job && job.userId === user.uid) {
              // Si el usuario es el creador, permite la actualización
              return this.firestore.collection('jobs').doc(id).update(updatedJob);
            } else {
              throw new Error('No tiene permiso para actualizar este trabajo.');
            }
          })
        ).toPromise() as Promise<void>; // Asegúrate de que el tipo de retorno sea Promise<void>
      } else {
        throw new Error('No está autenticado');
      }
    });
  }

  // Método para eliminar un trabajo solo si el usuario es el creador
  deleteJob(id: string): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        // Verifica si el usuario autenticado es el creador del trabajo
        return this.getJobById(id).pipe(
          map(job => {
            if (job && job.userId === user.uid) {
              // Si el usuario es el creador, permite la eliminación
              return this.firestore.collection('jobs').doc(id).delete();
            } else {
              throw new Error('No tiene permiso para eliminar este trabajo.');
            }
          })
        ).toPromise() as Promise<void>; // Asegúrate de que el tipo de retorno sea Promise<void>
      } else {
        throw new Error('No está autenticado');
      }
    });
  }
}
