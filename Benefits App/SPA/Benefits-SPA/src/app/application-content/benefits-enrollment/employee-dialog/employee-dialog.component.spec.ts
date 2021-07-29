import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { AppModule } from 'src/app/app.module';
import { BenefitsService } from 'src/app/services/benefits.service';

import { EmployeeDialogComponent } from './employee-dialog.component';

describe('EmployeeDialogComponent', () => {
  let component: EmployeeDialogComponent;
  let fixture: ComponentFixture<EmployeeDialogComponent>;
  let service: BenefitsService;

  const dialogMock = {
    close: () => { }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployeeDialogComponent],
      imports: [AppModule, MatIconModule, MatDialogModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDialogComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BenefitsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('GetBenefitsAmount = 1000', () => {
    let total: number | undefined;
    component.FirstName.setValue('Josh');
    total = component.GetBenefitsAmount();
    expect(total).toBe(1000);
  });

  it('GetBenefitsAmount = 900', () => {
    let total: number | undefined;
    component.FirstName.setValue('Alex');
    total = component.GetBenefitsAmount();
    expect(total).toBe(900);
  });

  it('Call Snackbar FirstName Empty', () => {
    spyOn(service, 'DisplaySnackBar');
    component.FirstName.setValue('');
    component.SaveChanges();
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });

  it('Call Snackbar LastName Empty', () => {
    spyOn(service, 'DisplaySnackBar');
    component.LastName.setValue('');
    component.SaveChanges();
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });

  it('Call Snackbar FirstName Invalid', () => {
    spyOn(service, 'DisplaySnackBar');
    component.FirstName.setValue('123');
    component.SaveChanges();
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });

  it('Call Snackbar LastName Invalid', () => {
    spyOn(service, 'DisplaySnackBar');
    component.LastName.setValue('123');
    component.SaveChanges();
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });

  it('Call Snackbar DateTime Invalid', () => {
    spyOn(service, 'DisplaySnackBar');
    component.FirstName.setValue('Josh');
    component.LastName.setValue('White');
    component.DateOfBirth.setValue('abc');
    component.SaveChanges();
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });

  it('Call Snackbar DateTime Invalid', () => {
    spyOn(service, 'DisplaySnackBar');
    component.FirstName.setValue('Josh');
    component.LastName.setValue('White');
    component.DateOfBirth.setValue(new Date().setFullYear(2070));
    component.SaveChanges();
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });
  
  it('Call SaveEmployeeChanges', () => {
    spyOn(service, 'SaveEmployeeChanges');
    component.data.actiontype = 'EDIT';
    component.FirstName.setValue('Josh');
    component.LastName.setValue('White');
    component.DateOfBirth.setValue(new Date());
    component.SaveChanges();
    expect(service.SaveEmployeeChanges).toHaveBeenCalled();
  });

  it('Call AddNewEmployee', () => {
    spyOn(service, 'AddNewEmployee');
    component.data.actiontype = 'ADD';
    component.FirstName.setValue('Josh');
    component.LastName.setValue('White');
    component.DateOfBirth.setValue(new Date());
    component.SaveChanges();
    expect(service.AddNewEmployee).toHaveBeenCalled();
  });
});
