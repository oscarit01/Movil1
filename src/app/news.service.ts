import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiKey = 'a54f3b1d2cc14f3ab9947fc3d72ca377';
  private baseUrl = 'https://newsapi.org/v2';

  constructor() { }

  async getTopHeadlines(country: string = 'us') {
    try {
      const response = await axios.get(`${this.baseUrl}/top-headlines`, {
        params: {
          country: country,
          apiKey: this.apiKey
        }
      });
      return response.data.articles;
    } catch (error) {
      console.error('Error fetching news:', error);
      return [];
    }
  }

  // Puedes agregar más métodos para otras funcionalidades de la API
}
