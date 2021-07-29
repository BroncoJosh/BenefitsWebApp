import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BenefitsService } from './benefits.service';
import { HTTPRequestsService } from './http-requests.service';

describe('BenefitsService', () => {
  let service: BenefitsService;
  let httpService: HTTPRequestsService;
  
  beforeEach(() => {
    // TestBed.configureTestingModule({});
    TestBed.configureTestingModule({
      // declarations: [ ApplicationContentComponent],
      imports:  [ MatSnackBarModule, HttpClientModule, BrowserAnimationsModule ]
    })
    .compileComponents()
    ,
    service = TestBed.inject(BenefitsService);
    httpService = TestBed.inject(HTTPRequestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Returns Employee Benefits Amount', () => {
    let actualCount: number | undefined;
    actualCount = service.getBenefitsAmount('Josh', 'Employee');
    expect(actualCount).toBe(1000);
  });

  it('Returns Discounted Employee Benefits Amount', () => {
    let actualCount: number | undefined;
    actualCount = service.getBenefitsAmount('Alex', 'Employee');
    expect(actualCount).toBe(900);
  });

  it('Returns Dependent Benefits Amount', () => {
    let actualCount: number | undefined;
    actualCount = service.getBenefitsAmount('Josh', 'Dependent');
    expect(actualCount).toBe(500);
  });

  it('Returns Discounted Dependent Benefits Amount', () => {
    let actualCount: number | undefined;
    actualCount = service.getBenefitsAmount('Alex', 'Dependent');
    expect(actualCount).toBe(450);
  });

  it('Returns 0 Employee Paycheck Amount', () => {
    let amount: number | undefined;
    amount = service.getPaycheckAmount(0);
    expect(amount).toBe(0);
  });

  it('Returns Employee Paycheck Amount', () => {
    let amount: number | undefined;
    amount = service.getPaycheckAmount(52000);
    expect(amount).toBe(52000/26);
  });


  it('Returns Employee Has Discounted = FALSE', () => {
    let hasdiscount: boolean;
    hasdiscount = service.HasDiscountedRate('Josh', 'Employee');
    expect(hasdiscount).toBe(false);
  });

  it('Returns Employee Has Discounted = TRUE', () => {
    let hasdiscount: boolean;
    hasdiscount = service.HasDiscountedRate('Alex', 'Employee');
    expect(hasdiscount).toBe(true);
  });

  it('Returns Dependent Has Discounted = FALSE', () => {
    let hasdiscount: boolean;
    hasdiscount = service.HasDiscountedRate('Josh', 'Dependent');
    expect(hasdiscount).toBe(false);
  });

  it('Returns Dependent Has Discounted = TRUE', () => {
    let hasdiscount: boolean;
    hasdiscount = service.HasDiscountedRate('Alex', 'Dependent');
    expect(hasdiscount).toBe(true);
  });

  it('GetTotalsForColumn = Undefined', () => {
    let total: number | undefined;
    service.EmployeeList = null;
    total = service.getTotals('Total');
    expect(total).toBe(undefined);
  });

  it('GetTotalsForColumn = 10', () => {
    let total: number | undefined;
    service.EmployeeList = [{'Total': 5}, {'Total': 5}];
    total = service.getTotals('Total');
    expect(total).toBe(10);
  });

  it('getTotalBenefitsAmountForEmployeeAndDependents = 50', () => {
    let total: number | undefined;
    var EmployeeInfo: any = {BenefitsAmount: 10};
    var DependentsList: any[] = [{BenefitsAmount: 20}, {BenefitsAmount: 20}];
    total = service.getTotalBenefitsAmountForEmployeeAndDependents(EmployeeInfo, DependentsList);
    expect(total).toBe(50);
  });

  /* GET */
  it('calling getEmployeeList makes HTTP Request GET request', () => {
    spyOn(httpService, 'getItems');
    service.getEmployeeList();
    expect(httpService.getItems).toHaveBeenCalled();
  });

  it('calling getEmployeeInfo makes HTTP Request GET request', () => {
    spyOn(httpService, 'getItems');
    service.EmployeeId = 1;
    service.getEmployeeInfo();
    expect(httpService.getItems).toHaveBeenCalled();
  });

  it('calling getDependentsForEmployee makes HTTP Request GET request', () => {
    spyOn(httpService, 'getItems');
    service.EmployeeId = 1;
    service.getDependentsForEmployee();
    expect(httpService.getItems).toHaveBeenCalled();
  });

  it('calling getEmployeeInfo with Null Employee ID returns SnackBar', () => {
    spyOn(service, 'DisplaySnackBar');
    service.EmployeeId = null;
    service.getEmployeeInfo();
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });

  it('calling getDependentsForEmployee with Null Employee ID returns SnackBar', () => {
    spyOn(service, 'DisplaySnackBar');
    service.EmployeeId = null;
    service.getDependentsForEmployee();
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });

  /* PUT */
  it('calling SaveDependentChanges makes HTTP Request PUT request', () => {
    spyOn(httpService, 'updateItem');
    var DependentObject = {DependentId: 1};
    service.SaveDependentChanges(DependentObject);
    expect(httpService.updateItem).toHaveBeenCalled();
  });

  it('calling SaveEmployeeChanges makes HTTP Request PUT request', () => {
    spyOn(httpService, 'updateItem');
    var EmployeeObject = {DependentId: 1};
    service.SaveEmployeeChanges(EmployeeObject);
    expect(httpService.updateItem).toHaveBeenCalled();
  });

  it('calling SaveDependentChanges with Null Dependent returns SnackBar', () => {
    spyOn(service, 'DisplaySnackBar');
    var DependentObject = null;
    service.SaveDependentChanges(DependentObject);
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });

  it('calling SaveEmployeeChanges with Null Employee Object returns SnackBar', () => {
    spyOn(service, 'DisplaySnackBar');
    var EmployeeObject = null;
    service.SaveEmployeeChanges(EmployeeObject);
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });

  /* POST */
  it('calling AddNewDependent makes HTTP Request POST request', () => {
    spyOn(httpService, 'addNewItem');
    var DependentObject = {DependentId: 1};
    service.EmployeeId = 1;
    service.AddNewDependent(DependentObject);
    expect(httpService.addNewItem).toHaveBeenCalled();
  });

  it('calling AddNewEmployee makes HTTP Request POST request', () => {
    spyOn(httpService, 'addNewItem');
    var EmployeeObject = {EmployeeId: 1};
    service.AddNewEmployee(EmployeeObject);
    expect(httpService.addNewItem).toHaveBeenCalled();
  });

  it('calling AddNewDependent with Null Dependent Object returns SnackBar', () => {
    spyOn(service, 'DisplaySnackBar');
    var DependentObject = null;
    service.EmployeeId = 1;
    service.AddNewDependent(DependentObject);
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });

  it('calling AddNewDependent with Null Employee ID returns SnackBar', () => {
    spyOn(service, 'DisplaySnackBar');
    var DependentObject = {DependentId: 1};
    service.EmployeeId = null;
    service.AddNewDependent(DependentObject);
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });

  it('calling AddNewEmployee with Null Employee Object returns SnackBar', () => {
    spyOn(service, 'DisplaySnackBar');
    var EmployeeObject = null;
    service.AddNewEmployee(EmployeeObject);
    expect(service.DisplaySnackBar).toHaveBeenCalled();
  });

  /* DELETE */
  it('calling RemoveDependent makes HTTP Request DELETE request', () => {
    spyOn(httpService, 'deleteItem');
    var DependentId = 1;
    service.RemoveDependent(DependentId);
    expect(httpService.deleteItem).toHaveBeenCalled();
  });

  it('calling RemoveEmployee makes HTTP Request DELETE request', () => {
    spyOn(httpService, 'deleteItem');
    var EmployeeId = 1;
    service.RemoveEmployee(EmployeeId);
    expect(httpService.deleteItem).toHaveBeenCalled();
  });



});
