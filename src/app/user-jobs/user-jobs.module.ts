import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular'; // Importa IonicModule
import { UserJobsComponent } from './user-jobs.component';

const routes: Routes = [
  {
    path: '',
    component: UserJobsComponent
  }
];

@NgModule({
  declarations: [UserJobsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IonicModule // Asegúrate de agregar IonicModule aquí
  ]
})
export class UserJobsModule {}
