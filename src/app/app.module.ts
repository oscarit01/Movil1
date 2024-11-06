import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Importación de AngularFireModule y el archivo de configuración
import { AngularFireModule } from '@angular/fire/compat'; // Asegúrate de usar la versión de compatibilidad
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; // Importa AngularFirestoreModule
import { AngularFireStorageModule } from '@angular/fire/compat/storage'; // Importa AngularFireStorageModule
import { environment } from '../environments/environment'; // Importa la configuración de Firebase

// Importa el componente de menú
import { MenuComponent } from './menu/menu.component'; // Asegúrate de que la ruta sea correcta

// Importa AuthService
import { AuthService } from './auth.service'; // Asegúrate de que la ruta sea correcta

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent // Agrega el componente de menú aquí
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // Inicializa Firebase con la configuración
    AngularFirestoreModule, // Agrega AngularFirestoreModule aquí
    AngularFireStorageModule // Agrega AngularFireStorageModule aquí
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthService // Asegúrate de agregar AuthService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
