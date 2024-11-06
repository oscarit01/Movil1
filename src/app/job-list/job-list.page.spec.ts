import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JobListPage } from './job-list.page';

describe('JobListPage', () => {
  let component: JobListPage;
  let fixture: ComponentFixture<JobListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JobListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
