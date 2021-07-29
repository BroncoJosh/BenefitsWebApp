import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BenefitsService } from 'src/app/services/benefits.service';
import { HTTPRequestsService } from 'src/app/services/http-requests.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { DependentsDialogComponent } from '../dependents-dialog/dependents-dialog.component';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-enrollment-view',
  templateUrl: './enrollment-view.component.html',
  styleUrls: ['./enrollment-view.component.css']
})
export class EnrollmentViewComponent implements OnInit, OnDestroy {
  
  PaycheckInterval: number = this.benefitsService.PayCheckInterval;
  EmployeeId: any = null;
  DependentsList: any;
  EmployeeInfo: any;
  dependentListDataSource: any;

  //Subscriptions
  selectedEmployeeWasUpdatedSubscription: any;
  dependentsForEmployeeListWasUpdatedSubscription: any;
  dependentsInformationWasUpdatedSubscription: any;

  displayedColumns: string[] = ["DependentId", "FullName", "DateOfBirth", "BenefitsAmount", "EditDependent", "RemoveDependent"];
  constructor(private benefitsService: BenefitsService, private dependentsDialog: MatDialog, private employeeDialog: MatDialog, private removeConfirmationDialog: MatDialog) { }

  ngOnInit(): void {
    //API Call made when Employee selected from Grid. Once this call returns, make a call to obtain Dependents for selected Employee
    this.selectedEmployeeWasUpdatedSubscription = this.benefitsService.selectedEmployeeWasUpdated.subscribe((result) =>
    {
      this.EmployeeInfo = result[0];
      this.DependentsList = null;
      this.GetDependentsForEmployee(this.benefitsService.EmployeeId);
    });

    //API Call returning Dependents for selected Employee (returned from this.GetDependentsForEmployee(employee id))
    this.dependentsForEmployeeListWasUpdatedSubscription = this.benefitsService.dependentsForEmployeeListWasUpdated.subscribe((result) =>
    {
      this.DependentsList = result;
      this.dependentListDataSource = new MatTableDataSource(<any> this.DependentsList);
    });

    //New Dependent Added or Existing Depending Information was Updated, Refresh Employee List & Dependent List
    this.dependentsInformationWasUpdatedSubscription = this.benefitsService.dependentInformationWasUpdated.subscribe((result) =>
    {
      this.benefitsService.getEmployeeList(); //Refresh the Employee List
      this.benefitsService.getEmployeeInfo(); //Refresh the Selected Employee
      this.benefitsService.getDependentsForEmployee();  //Refresh the Dependents Grid
    });
    
  }

  ngOnDestroy(): void {
    this.selectedEmployeeWasUpdatedSubscription.unsubscribe();
    this.dependentsForEmployeeListWasUpdatedSubscription.unsubscribe();
    this.dependentsInformationWasUpdatedSubscription.unsubscribe();
  }

  getEmployeeList() {
    this.benefitsService.getEmployeeList();
  }

  getEmployeeInfo() {
    this.benefitsService.getEmployeeInfo();
  }

  selectEmployeeEntry(id : number) {
    this.benefitsService.EmployeeId = id;

    this.getEmployeeInfo();
    // this.benefitsService.selectedEmployeWasUpdated.next(id);  //Emit that the Selected Employee has Changed
  }

  GetDependentsForEmployee(id: number)
  {
    this.benefitsService.getDependentsForEmployee();
  }

  getTotalBenefitsAmountForEmployeeAndDependents()
  {
    
    return this.benefitsService.getTotalBenefitsAmountForEmployeeAndDependents(this.EmployeeInfo, this.DependentsList);
  }

  HasDiscountedRate(FirstName: string, role: string) : boolean {
    return this.benefitsService.HasDiscountedRate(FirstName, role);
  }

  addNewDependent() {
    
    const dialogRef = this.dependentsDialog.open(DependentsDialogComponent,
      {
        data: {
          actiontype: 'ADD'
        }
      });
  }
  editSelectedDependent(row : any) {
      const dialogRef = this.dependentsDialog.open(DependentsDialogComponent,
        {
          data: {
            dependent: row,
            actiontype: 'EDIT'
          }
        });
  }

  EditEmployee() {
    const dialogRef = this.employeeDialog.open(EmployeeDialogComponent,
      {
        data: {
          dependent: this.EmployeeInfo,
          actiontype: 'EDIT'
        }
      });
  }

  removeSelectedRow(row : any) {
    
    const dialogRef = this.removeConfirmationDialog.open(ConfirmationDialogComponent,
      {
        data: {
          area: 'Dependent'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result == true || result == "true")
        {
          this.benefitsService.RemoveDependent(row.DependentId);
        }
      });
  }

  removeEmployee() {
    const dialogRef = this.removeConfirmationDialog.open(ConfirmationDialogComponent,
      {
        data: {
          area: 'Employee'
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result == true || result == "true")
        {
          this.benefitsService.RemoveEmployee(this.EmployeeInfo.EmployeeId);
        }
      });

  }
  
}
