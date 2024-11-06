import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.page.html',
  styleUrls: ['./profile-view.page.scss'],
})
export class ProfileViewPage implements OnInit {
  userData = {
    fullName: '',
    description: '',
    profilePicture: null as string | null
  };

  constructor() {}

  ngOnInit() {
    this.loadDataFromLocalStorage();
  }

  private loadDataFromLocalStorage() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      this.userData = JSON.parse(savedData);
      console.log('Datos cargados desde localStorage en ProfileView:', this.userData);
    } else {
      console.error('No se encontraron datos de usuario en localStorage');
    }
  }
}
