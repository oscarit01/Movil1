import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../job.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.page.html',
  styleUrls: ['./edit-job.page.scss'],
})
export class EditJobPage implements OnInit {
  job: Job | null = null;
  currentUser: string | null = null;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private authService: AuthService,
    private router: Router
  ) {}

  async ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.jobService.getJobById(jobId).subscribe(job => {
        this.job = job || null;
        this.checkPermissions(); 
      });

      this.currentUser = await this.authService.getUserId();
    }
  }

  checkPermissions() {
    if (this.job && this.job.userId !== this.currentUser) {
      this.errorMessage = 'No tienes permiso para editar esta oferta de trabajo.';
      setTimeout(() => {
        this.router.navigate(['/job-list']);
      }, 3000);
    }
  }

  async updateJob() {
    if (this.job && this.job.id && this.job.userId === this.currentUser) {
      await this.jobService.updateJob(this.job.id, this.job);
      this.successMessage = 'Cambios realizados con éxito.';
      setTimeout(() => {
        this.router.navigate(['/job-list']);
      }, 2000);
    } else {
      this.errorMessage = 'No puedes actualizar esta oferta de trabajo.';
    }
  }

  async deleteJob() {
    if (this.job && this.job.id && this.job.userId === this.currentUser) {
      await this.jobService.deleteJob(this.job.id);
      this.successMessage = 'Oferta de trabajo eliminada con éxito.';
      setTimeout(() => {
        this.router.navigate(['/job-list']);
      }, 2000);
    } else {
      this.errorMessage = 'No puedes eliminar esta oferta de trabajo.';
    }
  }
}
