import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage implements OnInit {
  user = {
    fullName: '',
    description: '',
    profilePicture: null as string | null,
    displayName: '',
    displayDescription: '',
  };

  editUser = {
    fullName: '',
    description: '',
  };

  isProfileVisible = true;
  showSuccessMessage: boolean = false;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadDataFromLocalStorage();
    this.editUser.fullName = this.user.displayName;
    this.editUser.description = this.user.displayDescription;
  }

  // Manejar selección de archivo desde el sistema local
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profilePicture = reader.result as string; // Muestra la imagen seleccionada
      };
      reader.readAsDataURL(file);
    }
  }

  // Tomar foto con la cámara del navegador
  async takePictureWithBrowser() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert('Tu navegador no soporta el acceso a la cámara.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });

      // Crear un elemento de video dinámico
      const video = document.createElement('video');
      video.srcObject = stream;
      video.play();

      // Crear un canvas para capturar la imagen
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;

      // Esperar un momento para estabilizar la cámara
      setTimeout(() => {
        const context = canvas.getContext('2d');
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height);
          this.user.profilePicture = canvas.toDataURL('image/png'); // Actualizar foto de perfil
        }

        // Detener la cámara
        stream.getTracks().forEach(track => track.stop());
      }, 3000);
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
      alert('No se pudo acceder a la cámara. Asegúrate de que tu navegador permita el acceso.');
    }
  }

  saveProfile() {
    this.user.displayName = this.editUser.fullName;
    this.user.displayDescription = this.editUser.description;
    this.saveDataToLocalStorage();
    this.showSuccessMessage = true;

    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 3000);
  }

  private saveDataToLocalStorage() {
    const userData = {
      fullName: this.editUser.fullName,
      description: this.editUser.description,
      profilePicture: this.user.profilePicture,
    };
    localStorage.setItem('userData', JSON.stringify(userData));
    console.log('Datos guardados en localStorage:', userData);
  }

  private loadDataFromLocalStorage() {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      const userData = JSON.parse(savedData);
      this.user.displayName = userData.fullName;
      this.user.displayDescription = userData.description;
      this.user.profilePicture = userData.profilePicture;
    }
  }

  goHome() {
    this.navCtrl.back();
  }

  goToProfileView() {
    this.navCtrl.navigateForward('/profile-view');
  }
}
