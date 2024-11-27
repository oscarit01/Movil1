import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Job } from '../job.model';

@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: []
})
export class UserJobsComponent implements OnInit {
  userJobs: Job[] = []; // Almacena las ofertas del usuario
  userId: string | null = null; // ID del usuario autenticado
  loading: boolean = true; // Estado de carga
  errorMessage: string | null = null; // Mensajes de error

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      const user = await this.afAuth.currentUser;
      this.userId = user?.uid || null;

      if (!this.userId) {
        this.errorMessage = 'No se pudo obtener la autenticación del usuario.';
        this.loading = false;
        return;
      }

      // Obtener y filtrar trabajos creados por el usuario
      this.firestore
        .collection<Job>('jobs', ref => ref.where('userId', '==', this.userId))
        .valueChanges({ idField: 'id' }) // Incluye el ID del documento
        .subscribe({
          next: jobs => {
            this.userJobs = jobs.filter(job => job.id); // Filtrar trabajos sin ID
            this.loading = false;
          },
          error: err => {
            console.error('Error al cargar las ofertas del usuario:', err);
            this.errorMessage = 'Error al cargar las ofertas. Intente más tarde.';
            this.loading = false;
          }
        });
    } catch (err) {
      console.error('Error al inicializar UserJobsComponent:', err);
      this.errorMessage = 'Error inesperado. Intente más tarde.';
      this.loading = false;
    }
  }

  // Navegar a la página de edición
  editJob(jobId?: string) {
    if (!jobId) {
      console.error('No se puede editar un trabajo sin ID.');
      return;
    }
    this.router.navigate(['/edit-job', jobId]);
  }
}
