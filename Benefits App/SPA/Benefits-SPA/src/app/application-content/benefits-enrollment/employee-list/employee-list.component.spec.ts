import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from 'src/app/app.module';
import { BenefitsService } from 'src/app/services/benefits.service';

import { EmployeeListComponent } from './employee-list.component';

describe('EmployeeListComponent', () => {
  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;
  let service: BenefitsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeListComponent ],
      imports: [ AppModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(BenefitsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Call getPaycheckAmount', () => {
    spyOn(service, 'getPaycheckAmount');
    var fakeObject = {SalaryAmount: 10};
    component.getPaycheckAmount(fakeObject);
    expect(service.getPaycheckAmount).toHaveBeenCalled();
  });

  it('Call getTotals', () => {
    spyOn(service, 'getTotals');
    component.getTotals('any');
    expect(service.getTotals).toHaveBeenCalled();
  });

  it('Call getTotalBenefitsAmountForEmployeeAndDependents', () => {
    spyOn(service, 'getTotalBenefitsAmountForEmployeeAndDependents');
    component.getTotalBenefitsAmountForEmployeeAndDependents('any');
    expect(service.getTotalBenefitsAmountForEmployeeAndDependents).toHaveBeenCalled();
  });

  it('Call getEmployeeInfo', () => {
    spyOn(service, 'getEmployeeInfo');
    component.getEmployeeInfo();
    expect(service.getEmployeeInfo).toHaveBeenCalled();
  });

  it('Call getEmployeeList', () => {
    spyOn(service, 'getEmployeeList');
    component.getEmployeeList();
    expect(service.getEmployeeList).toHaveBeenCalled();
  });

  it('Call selectRow', () => {
    spyOn(service, 'getEmployeeInfo');
    component.selectRow(1);
    expect(service.getEmployeeInfo).toHaveBeenCalled();
  });

  it('Call selectRow, Benefits EmployeeId set to 1', () => {
    component.selectRow(1);
    expect(service.EmployeeId).toEqual(1);
  });

  it('Call selectRow, selectedRow set to 1', () => {
    component.selectRow(1);
    expect(component.selectedRow).toEqual(1);
  });


  /*
ngOnInit(): void {
    this.employeeListWasUpdatedSubscription = this.benefitsService.employeeListWasUpdated.subscribe((result) =>
    {
      this.employeeList = result;
      this.benefitsService.EmployeeList = result;
      this.employeeListDataSource = new MatTableDataSource(<any>this.employeeList);
    });

    this.getEmployeeList();
  }
  */
});
