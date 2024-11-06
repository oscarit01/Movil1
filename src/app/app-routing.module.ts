import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'register', 
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'job-list', 
    loadChildren: () => import('./job-list/job-list.module').then(m => m.JobListPageModule)
  },
  {
    path: 'create-job', 
    loadChildren: () => import('./create-job/create-job.module').then(m => m.CreateJobPageModule)
  },
  {
    path: 'job-detail/:id', 
    loadChildren: () => import('./job-detail/job-detail.module').then(m => m.JobDetailPageModule)
  },
  {
    path: 'edit-job/:id', 
    loadChildren: () => import('./edit-job/edit-job.module').then(m => m.EditJobPageModule)
  },
  {
    path: 'profile-view', // Ruta para la vista de perfil con datos de localStorage
    loadChildren: () => import('./profile-view/profile-view.module').then(m => m.ProfileViewPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
