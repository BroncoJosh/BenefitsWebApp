import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { AppModule } from 'src/app/app.module';

import { EnrollmentViewComponent } from './enrollment-view.component';


describe('EnrollmentViewComponent', () => {
  let component: EnrollmentViewComponent;
  let fixture: ComponentFixture<EnrollmentViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnrollmentViewComponent ],
      imports: [ AppModule, MatIconModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentViewComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
