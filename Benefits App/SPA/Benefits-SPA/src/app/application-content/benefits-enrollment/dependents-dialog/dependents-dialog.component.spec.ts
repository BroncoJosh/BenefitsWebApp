import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppModule } from 'src/app/app.module';
import { BenefitsService } from 'src/app/services/benefits.service';

import { DependentsDialogComponent } from './dependents-dialog.component';

describe('DependentsDialogComponent', () => {
  let component: DependentsDialogComponent;
  let fixture: ComponentFixture<DependentsDialogComponent>;
  let service: BenefitsService;

  const dialogMock = {
    close: () => { }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DependentsDialogComponent],
      imports: [AppModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: dialogMock }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DependentsDialogComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BenefitsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('GetBenefitsAmount = 500', () => {
    let total: number | undefined;
    component.FirstName.setValue('Josh');
    total = component.GetBenefitsAmount();
    expect(total).toBe(500);
  });

  it('GetBenefitsAmount = 450', () => {
    let total: number | undefined;
    component.FirstName.setValue('Alex');
    total = component.GetBenefitsAmount();
    expect(total).toBe(450);
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

  it('Call SaveDependentChanges', () => {
    spyOn(service, 'SaveDependentChanges');
    component.data.actiontype = 'EDIT';
    component.FirstName.setValue('Josh');
    component.LastName.setValue('White');
    component.DateOfBirth.setValue(new Date());
    component.SaveChanges();
    expect(service.SaveDependentChanges).toHaveBeenCalled();
  });

  it('Call AddNewDependent', () => {
    spyOn(service, 'AddNewDependent');
    component.data.actiontype = 'ADD';
    component.FirstName.setValue('Josh');
    component.LastName.setValue('White');
    component.DateOfBirth.setValue(new Date());
    component.SaveChanges();
    expect(service.AddNewDependent).toHaveBeenCalled();
  });
});
