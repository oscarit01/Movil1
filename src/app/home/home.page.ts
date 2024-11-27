import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showAboutCard = false; // Controla la visibilidad de la tarjeta "Acerca de"
  articles: any[] = []; // Propiedad para almacenar los artículos de noticias
  isLoading = true; // Indicador de carga
  errorMessage: string | null = null; // Mensaje de error

  constructor(private router: Router, private newsService: NewsService) {}

  async ngOnInit() {
    try {
      this.articles = await this.newsService.getTopHeadlines('us');
    } catch (error) {
      console.error('Error al cargar las noticias:', error);
      this.errorMessage = 'No se pudieron cargar las noticias. Intenta nuevamente más tarde.';
    } finally {
      this.isLoading = false; // Finaliza la carga
    }
  }

  goToProfile() {
    this.router.navigate(['/profile-view']);
  }

  goToCreateOffer() {
    this.router.navigate(['/create-job']);
  }

  goToAvailableJobs() {
    this.router.navigate(['/job-list']);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }

  goToAbout() {
    this.toggleAboutCard(); // Llama al método toggle para mostrar/ocultar la tarjeta
  }

  toggleAboutCard() {
    this.showAboutCard = !this.showAboutCard; // Alterna la visibilidad de la tarjeta "Acerca de"
  }

  goToHome() {
    this.router.navigate(['/home']); // Redirige a la página Home
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
