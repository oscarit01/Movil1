import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service'; // Servicio para interactuar con Firestore
import { Job } from '../job.model'; // Interfaz Job
import { Router } from '@angular/router'; // Para navegación
import { AuthService } from '../auth.service'; // Servicio de autenticación
import { Geolocation } from '@capacitor/geolocation'; // Importar Geolocalización

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.page.html',
  styleUrls: ['./job-list.page.scss'],
})
export class JobListPage implements OnInit {
  jobs: Job[] = []; // Almacena todas las ofertas de trabajo
  currentUserId: string | null = null; // ID del usuario autenticado
  loading: boolean = true; // Indicador de carga
  errorMessage: string | null = null; // Almacena mensajes de error
  currentLocation: { latitude: number; longitude: number } | null = null; // Ubicación del usuario

  constructor(
    private jobService: JobService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    try {
      // Obtener el ID del usuario autenticado
      this.currentUserId = await this.authService.getUserId();

      // Obtener la ubicación del usuario
      await this.getUserLocation();

      // Obtener todas las ofertas de trabajo desde Firestore
      this.jobService.getJobs().subscribe({
        next: jobs => {
          this.jobs = jobs.filter(job => job.id && job.title); // Filtrar trabajos válidos
          console.log('Trabajos cargados:', this.jobs);
          this.loading = false; // Finalizar carga
        },
        error: err => {
          console.error('Error al cargar los trabajos:', err);
          this.errorMessage = 'No se pudieron cargar las ofertas de trabajo.';
          this.loading = false;
        },
      });
    } catch (err) {
      console.error('Error durante la inicialización:', err);
      this.errorMessage = 'Error al obtener los datos del usuario.';
      this.loading = false;
    }
  }

  // Método para obtener la ubicación del usuario
  async getUserLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      this.currentLocation = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      };
      console.log('Ubicación actual:', this.currentLocation);
    } catch (error) {
      console.error('Error al obtener la ubicación:', error);
      this.errorMessage = 'No se pudo obtener la ubicación actual.';
    }
  }

  // Navegar a los detalles de un trabajo
  goToJobDetail(job: Job) {
    if (job.id) {
      console.log('Navegando a los detalles del trabajo con ID:', job.id);
      this.router.navigate(['/job-detail', job.id]);
    } else {
      console.error('El trabajo no tiene un ID válido.');
    }
  }

  // Navegar al Home
  goToHome() {
    console.log('Navegando al Home');
    this.router.navigate(['/home']);
  }

  // Navegar al perfil del usuario
  goToProfile() {
    console.log('Navegando al perfil del usuario');
    this.router.navigate(['/profile']);
  }

  // Navegar a la sección "Acerca de"
  goToAbout() {
    console.log('Navegando a la sección Acerca de');
    this.router.navigate(['/about']);
  }

  // Cerrar sesión
  logout() {
    console.log('Cerrando sesión');
    this.authService.logout(); // Llama al método logout del servicio
  }
}
