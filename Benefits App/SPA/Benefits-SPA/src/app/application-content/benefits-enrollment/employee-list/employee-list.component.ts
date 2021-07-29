import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BenefitsService } from 'src/app/services/benefits.service';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  //Variables
  PaycheckInterval: number = this.benefitsService.PayCheckInterval;
  employeeList: any;  //Stores the Employee List (for selection to view Benefits Info & Dependents)
  selectedRow: number = 0;  //

  //Subscriptions
  employeeListWasUpdatedSubscription: any;

  //For Employee List Table
  employeeListDataSource: any;  //Used for the Grid
  displayedColumns: string[] = ["EmployeeId", "EmployeeName", "DependentCount", "EmployeeBenefitsAmount", "DependentBenefitsAmount", "TotalBenefitsAmount", "Paycheck", "PaycheckDeductions", "PaycheckAdjusted"];



  constructor(private benefitsService: BenefitsService, private employeeDialog: MatDialog) { }

  ngOnInit(): void {
    this.employeeListWasUpdatedSubscription = this.benefitsService.employeeListWasUpdated.subscribe((result) =>
    {
      this.employeeList = result;
      this.benefitsService.EmployeeList = result;
      this.employeeListDataSource = new MatTableDataSource(<any>this.employeeList);
    });

    this.getEmployeeList();
  }

  ngOnDestroy(): void {
    this.employeeListWasUpdatedSubscription.unsubscribe();
  }

  //Retrieves all Employees
  getEmployeeList() {
    this.benefitsService.getEmployeeList();
  }

  //Retrieves In Depth Details for Selected Employee
  getEmployeeInfo() {
    this.benefitsService.getEmployeeInfo();
  }

  //Employee row selected, make API call to grab detailed Employee Info & Dependent Info
  selectRow(id : number) {
    this.selectedRow = id;
    this.benefitsService.EmployeeId = id;

    this.getEmployeeInfo();
  }

  AddNewEmployee() {
    const dialogRef = this.employeeDialog.open(EmployeeDialogComponent,
      {
        data: {
          actiontype: 'ADD'
        }
      });
  }

  /* Functions used for cell calculations */
  getTotalBenefitsAmountForEmployeeAndDependents(row: any)
  {
    return this.benefitsService.getTotalBenefitsAmountForEmployeeAndDependents(row.EmployeeBenefitsAmount, row.DependentBenefitsAmount);
  }

  getTotals(column: string) 
  {
    return this.benefitsService.getTotals(column);
  }

  getPaycheckAmount(row: any) : number
  {
    return this.benefitsService.getPaycheckAmount(row.SalaryAmount);
  }

}
