import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateJobPageRoutingModule } from './create-job-routing.module';

import { CreateJobPage } from './create-job.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateJobPageRoutingModule
  ],
  declarations: [CreateJobPage]
})
export class CreateJobPageModule {}
