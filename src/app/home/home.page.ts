import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from '../news.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  showAboutCard = false;
  articles: any[] = []; // Propiedad para almacenar los artículos de noticias

  constructor(private router: Router, private newsService: NewsService) {}

  async ngOnInit() {
    this.articles = await this.newsService.getTopHeadlines('us'); // Cargar noticias en la inicialización
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
    this.showAboutCard = !this.showAboutCard;
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
