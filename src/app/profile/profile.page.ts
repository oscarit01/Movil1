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
    profilePicture: null as string | ArrayBuffer | null,
    displayName: '',
    displayDescription: '',
  };

  editUser = {
    fullName: '',
    description: '',
  };

  isProfileVisible = true;
  selectedFile: File | null = null;

  // Variable para controlar la visualización del mensaje de éxito
  showSuccessMessage: boolean = false;

  constructor(
    private navCtrl: NavController,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Cargar datos del localStorage al iniciar
    this.loadDataFromLocalStorage();
    // Inicializar editUser con los datos del usuario
    this.editUser.fullName = this.user.displayName;
    this.editUser.description = this.user.displayDescription;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.profilePicture = reader.result; // Visualización de la foto seleccionada
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
    }
  }

  async saveProfile() {
    const userId = await this.authService.getUserId();
    if (!userId) {
      console.error('No se pudo obtener el ID del usuario');
      return;
    }

    // Guardamos los datos del perfil en localStorage
    // Asegúrate de convertir ArrayBuffer a string o usar null si es necesario
    const profilePictureUrl = this.selectedFile ? this.user.profilePicture as string : null;
    await this.updateProfile(userId, profilePictureUrl);

    // Mostrar el mensaje de éxito
    this.showSuccessMessage = true;
    setTimeout(() => {
      this.showSuccessMessage = false; // Ocultar mensaje después de 3 segundos
    }, 3000);
  }

  private async updateProfile(userId: string, profilePictureUrl: string | null) {
    // Actualizamos el objeto `user` local
    this.isProfileVisible = true;
    this.user.displayName = this.editUser.fullName;
    this.user.displayDescription = this.editUser.description;
    this.user.profilePicture = profilePictureUrl;

    // Guardamos los datos actualizados en localStorage
    this.saveDataToLocalStorage(profilePictureUrl);

    alert('El perfil ha sido modificado exitosamente');
  }

  private saveDataToLocalStorage(profilePictureUrl: string | null) {
    const userData = {
      fullName: this.editUser.fullName,
      description: this.editUser.description,
      profilePicture: profilePictureUrl
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
