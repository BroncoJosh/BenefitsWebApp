import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Subject } from 'rxjs';
import { HTTPRequestsService } from './http-requests.service';

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {
  //Variables
  PayCheckInterval: number = 26;

  //Represents the Current Employee Selected
  EmployeeId: any;

  //The List of Employees (can select in Grid to display in depth details or Dependents for Employee)
  EmployeeList: any;

  //Subscriptions
  employeeListWasUpdatedSubscription: Subscription = new Subscription;
  dependentsForEmployeeListWasUpdatedSubscription: Subscription = new Subscription;
  selectedEmployeeWasUpdatedSubscription: Subscription = new Subscription;

  //Subjects
  employeeListWasUpdated: Subject<any> = new Subject<any>();
  dependentsForEmployeeListWasUpdated: Subject<any> = new Subject<any>();
  selectedEmployeeWasUpdated: Subject<any> = new Subject<any>();
  dependentInformationWasUpdated: Subject<any> = new Subject<any>();

  constructor(private httpRequestsService: HTTPRequestsService, private snackBar: MatSnackBar) { }

  /** GET API CALLS */
  //Retrieves all Employees (Employee ID, First & Last Name)
  getEmployeeList() {
    this.httpRequestsService.getItems('Employee/GetEmployeeList', 'Employee Signup', '', this.employeeListWasUpdatedSubscription, this.employeeListWasUpdated)
  }

  //Retrieves all information (Salary, Benefits Amount) for an Employee
  getEmployeeInfo() {
    if(this.EmployeeId == null)
    {
      this.DisplaySnackBar('Employee ID is NULL', 'Get Employee Info');
      return;
    }
    this.httpRequestsService.getItems('Employee/GetEmployeeInfo', 'Get Employee Info', this.EmployeeId.toString(), this.selectedEmployeeWasUpdatedSubscription, this.selectedEmployeeWasUpdated)
  }

  getDependentsForEmployee() {
    if(this.EmployeeId == null)
    {
      this.DisplaySnackBar('Employee ID is NULL', 'Get Employee Info');
      return;
    }
    this.httpRequestsService.getItems('Dependent/GetDependentsForEmployee', 'Get Dependents For Employee', this.EmployeeId.toString(), this.dependentsForEmployeeListWasUpdatedSubscription, this.dependentsForEmployeeListWasUpdated)

  }

  /** PUT API CALLS */
  SaveDependentChanges(DependentObject: any) {
    if(DependentObject == null)
    {
      this.DisplaySnackBar('Dependent Object is NULL', 'Get Employee Info');
      return;
    }
    this.httpRequestsService.updateItem('Dependent/UpdateDependent', 'Update Dependent Information', '', DependentObject, this.dependentInformationWasUpdated);
  }

  SaveEmployeeChanges(EmployeeObject: any) {
    if(EmployeeObject == null)
    {
      this.DisplaySnackBar('Employee Object is NULL', 'Get Employee Info');
      return;
    }
    this.httpRequestsService.updateItem('Employee/UpdateEmployee', 'Update Employee Information', '', EmployeeObject, this.dependentInformationWasUpdated);
  }

  /** POST API CALLS */
  AddNewDependent(DependentObject: any) {
    if(DependentObject == null || this.EmployeeId == null)
    {
      this.DisplaySnackBar('Employee ID or Dependent ID are NULL', 'Get Employee Info');
      return;
    }
    this.httpRequestsService.addNewItem('Dependent/AddNewDependent', 'Add New Dependent', this.EmployeeId, DependentObject, this.dependentInformationWasUpdated);
  }

  AddNewEmployee(EmployeeObject: any) {
    if(EmployeeObject == null)
    {
      this.DisplaySnackBar('Employee Object is NULL', 'Get Employee Info');
      return;
    }
    this.httpRequestsService.addNewItem('Employee/AddNewEmployee', 'Add New Employee', '', EmployeeObject, this.dependentInformationWasUpdated);
  }

  /** DELETE API CALLS */
  RemoveDependent(DependentId: number) {
    this.httpRequestsService.deleteItem('Dependent/RemoveDependent', 'Remove Dependent', DependentId.toString(), this.dependentInformationWasUpdated);
  }

  RemoveEmployee(EmployeeId: number) {
    this.httpRequestsService.deleteItem('Employee/RemoveEmployee', 'Remove Employee', EmployeeId.toString(), this.dependentInformationWasUpdated);
  }

  /** UTILITY FUNCTIONS */
  //Display a Snackbar Message Box
  DisplaySnackBar(Message : string, section : string)
  {
    this.snackBar.open(Message, section, {
      duration: 4000
    });
  }

  //Returns the Total Benefits Amount for an Employee and any attached Dependents
  getTotalBenefitsAmountForEmployeeAndDependents(EmployeeInfo: any, DependentsList: any[]) {
    return EmployeeInfo.BenefitsAmount + DependentsList.reduce((total, arg) => total  + arg.BenefitsAmount, 0);
  }

  
  //Returns the Totals for the specified Employee List Column
  getTotals(column : string)
  {
    if(this.EmployeeList == null)
    {
      return;
    }

    return this.EmployeeList.reduce((total: number, arg: any) => total  + arg[column], 0);
  }

  //Even though the logic is set in the API, Adding/Updating existing Employees/Dependents can use this to reduce API Calls.
  //Would prefer if I retrieved the 500 & 1000 values from the API on application load, as well as the hardcoded 10%, in case those ever changed in the future
  getBenefitsAmount(FirstName: string, role: string) {
    if(role != "Employee" && role != "Dependent")
    {
      return 0; //In case invalid role provided
    }

    var BenefitsAmount = (role == "Employee") ? 1000 : 500;

    return FirstName[0].toUpperCase() == 'A' ? BenefitsAmount - (BenefitsAmount * 0.1) : BenefitsAmount;
  }

  //Same concept as getBenefitsAmount, but returns true or false (for displaying a discount icon that shows the Employee/Dependent has Discounted Rate)
  HasDiscountedRate(FirstName: string, role: string) {
    if(role == "Employee" && this.getBenefitsAmount(FirstName, role) != 1000)
    {
      return true;
    }

    if(role == "Dependent" && this.getBenefitsAmount(FirstName, role) != 500)
    {
      return true;
    }
    return false;
  }
  //Returns the Bi-Weekly Paycheck Amount
  getPaycheckAmount(SalaryAmount: number) : number {
    return SalaryAmount / 26;
  }
}
