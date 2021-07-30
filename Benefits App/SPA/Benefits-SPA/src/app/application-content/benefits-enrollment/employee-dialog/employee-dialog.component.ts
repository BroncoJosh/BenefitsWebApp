import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BenefitsService } from 'src/app/services/benefits.service';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrls: ['./employee-dialog.component.css']
})
export class EmployeeDialogComponent implements OnInit {
  UpdateMessage: string = "Update Existing Employee";
  AddMessage: string = "Add New Employee";

  DateOfBirth: FormControl = new FormControl();
  FirstName: FormControl = new FormControl();
  LastName: FormControl = new FormControl();
  Gender: string = '';
  EmployeeId: number = this.benefitsService.EmployeeId;

  GenderList: any[] = [{ id: 'M', desc: 'Male' }, { id: 'F', desc: 'Female' }, { id: 'O', desc: 'Other' }, { id: 'P', desc: 'Prefer not to say' }];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private benefitsService: BenefitsService, public dialogRef: MatDialogRef<EmployeeDialogComponent>) { }

  ngOnInit(): void {
    this.FirstName.setValue("");
    this.LastName.setValue("");
    this.DateOfBirth.setValue('01/01/1970');

    if (this.data.actiontype == "EDIT") {
      this.DateOfBirth.setValue(this.data.employee.DateOfBirth);
      this.FirstName.setValue(this.data.employee.FirstName);
      this.LastName.setValue(this.data.employee.LastName);
      this.Gender = this.data.employee.Gender;
    }

  }

  //Used for giving a Live view of what the Benefits Amount would be (so API isn't called every time name changes)
  GetBenefitsAmount(): number {
    return this.benefitsService.getBenefitsAmount(this.FirstName.value, 'Employee');
  }

  SaveChanges() {
    // console.log(this.FirstName);
    if (!this.FirstName.valid || !this.LastName.valid) {
      this.benefitsService.DisplaySnackBar('Please Provide a Valid First/Last Name! (Alpha characters only)', (this.data.actiontype == "EDIT" ? this.UpdateMessage : this.AddMessage));
      return;
    }
    if (this.FirstName.value.length == 0 || this.LastName.value.length == 0) {
      this.benefitsService.DisplaySnackBar('Please Provide a First/Last Name!', (this.data.actiontype == "EDIT" ? this.UpdateMessage : this.AddMessage));
      return;
    }

    if (!this.DateOfBirth.valid || this.DateOfBirth.value > new Date()) {
      this.benefitsService.DisplaySnackBar('Please Provide a Date of Birth!', (this.data.actiontype == "EDIT" ? this.UpdateMessage : this.AddMessage));
      return;
    }

    var EmployeeObject = {
      EmployeeId: this.data.actiontype == "EDIT" ? this.EmployeeId : 0,
      BenefitsAmount: this.GetBenefitsAmount(),
      DateOfBirth: this.DateOfBirth.value,
      FirstName: this.FirstName.value,
      LastName: this.LastName.value,
      Gender: this.Gender == '' ? 'P' : this.Gender
    }


    if (this.data.actiontype == "EDIT") {
      this.benefitsService.SaveEmployeeChanges(EmployeeObject);
    } else {
      this.benefitsService.AddNewEmployee(EmployeeObject);
    }

    this.dialogRef.close();

  }

}
