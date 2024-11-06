import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../job.service';
import { Job } from '../job.model';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.page.html',
  styleUrls: ['./job-detail.page.scss'],
})
export class JobDetailPage implements OnInit {
  job: Job | undefined;

  constructor(private route: ActivatedRoute, private jobService: JobService) {}

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.jobService.getJobById(jobId).subscribe(job => {
        this.job = job;
      });
    }
  }

  contactEmployer() {
    if (this.job) {
      console.log('Contacto al empleador para el trabajo:', this.job.title);
      // Lógica para contactar al empleador
    }
  }
}
