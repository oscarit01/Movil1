import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Job } from './job.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { switchMap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  // Agregar un trabajo con el ID del usuario autenticado
  addJob(job: Job): Promise<void> {
    const id = this.firestore.createId(); // Generar un ID único
    return this.afAuth.currentUser.then(user => {
      if (!user) {
        console.error('Error: Usuario no autenticado.');
        return Promise.reject('Usuario no autenticado.');
      }
      const jobWithUser = { ...job, id, userId: user.uid }; // Asociar ID de usuario
      console.log('Datos del trabajo a guardar:', jobWithUser);
  
      return this.firestore
        .collection('jobs')
        .doc(id)
        .set(jobWithUser)
        .then(() => {
          console.log('Trabajo creado exitosamente:', jobWithUser);
        })
        .catch(err => {
          console.error('Error al crear el trabajo:', err);
          throw err;
        });
    });
  }
  

  // Obtener todos los trabajos
  getJobs(): Observable<Job[]> {
    return this.firestore
      .collection<Job>('jobs')
      .valueChanges({ idField: 'id' })
      .pipe(
        map(jobs => {
          console.log('Trabajos cargados desde Firestore:', jobs);
          return jobs;
        })
      );
  }
  
  // Obtener trabajos creados por el usuario autenticado
  getUserJobs(): Observable<Job[]> {
    return this.afAuth.authState.pipe(
      take(1),
      switchMap(user => {
        if (!user) {
          console.error('Error: Usuario no autenticado.');
          throw new Error('Usuario no autenticado.');
        }
        console.log('Cargando trabajos para el usuario con ID:', user.uid);
        return this.firestore
          .collection<Job>('jobs', ref => ref.where('userId', '==', user.uid))
          .valueChanges({ idField: 'id' });
      }),
      map(jobs => {
        console.log('Trabajos del usuario autenticado:', jobs);
        return jobs;
      })
    );
  }
  
  // Obtener un trabajo por ID
  getJobById(id: string): Observable<Job | undefined> {
    return this.firestore.collection<Job>('jobs').doc<Job>(id).valueChanges();
  }

  // Actualizar un trabajo
  updateJob(id: string, updatedJob: Partial<Job>): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (!user) {
        return Promise.reject('Usuario no autenticado.');
      }
      return this.firestore
        .collection<Job>('jobs')
        .doc(id)
        .get()
        .toPromise()
        .then(doc => {
          if (!doc?.exists) {
            return Promise.reject('El trabajo no existe.');
          }
          const job = doc.data() as Job;
          if (job.userId !== user.uid) {
            return Promise.reject('No tienes permiso para actualizar este trabajo.');
          }
          return this.firestore.collection('jobs').doc(id).update(updatedJob);
        });
    });
  }

  // Eliminar un trabajo
  deleteJob(id: string): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (!user) {
        return Promise.reject('Usuario no autenticado.');
      }
      return this.firestore
        .collection<Job>('jobs')
        .doc(id)
        .get()
        .toPromise()
        .then(doc => {
          if (!doc?.exists) {
            return Promise.reject('El trabajo no existe.');
          }
          const job = doc.data() as Job;
          if (job.userId !== user.uid) {
            return Promise.reject('No tienes permiso para eliminar este trabajo.');
          }
          return this.firestore.collection('jobs').doc(id).delete();
        });
    });
  }
}
