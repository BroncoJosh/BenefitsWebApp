import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BenefitsService } from 'src/app/services/benefits.service';

@Component({
  selector: 'app-dependents-dialog',
  templateUrl: './dependents-dialog.component.html',
  styleUrls: ['./dependents-dialog.component.css']
})
export class DependentsDialogComponent implements OnInit {
  UpdateMessage: string = "Update Existing Dependent";
  AddMessage: string = "Add New Dependent";

  //DateOfBirth: Date = new Date('01/01/1970');
  FirstName: FormControl = new FormControl();
  LastName: FormControl = new FormControl();
  DateOfBirth: FormControl = new FormControl();
  Gender: string = '';
  EmployeeId: number = this.benefitsService.EmployeeId;
  DependentId: number = 0;


  GenderList: any[] = [{ id: 'M', desc: 'Male' }, { id: 'F', desc: 'Female' }, { id: 'O', desc: 'Other' }, { id: 'P', desc: 'Prefer not to say' }];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private benefitsService: BenefitsService, public dialogRef: MatDialogRef<DependentsDialogComponent>) { }

  ngOnInit(): void {
    this.FirstName.setValue("");
    this.LastName.setValue("");
    this.DateOfBirth.setValue('01/01/1970');

    if (this.data.actiontype == "EDIT") {
      this.DateOfBirth.setValue(this.data.dependent.DateOfBirth);
      this.FirstName.setValue(this.data.dependent.FirstName);
      this.LastName.setValue(this.data.dependent.LastName);
      this.Gender = this.data.dependent.Gender;
      this.DependentId = this.data.dependent.DependentId;
    }

  }

  //Used for giving a Live view of what the Benefits Amount would be (so API isn't called every time name changes)
  GetBenefitsAmount(): number {
    return this.benefitsService.getBenefitsAmount(this.FirstName.value, 'Dependent');
  }

  SaveChanges() {
    if (!this.FirstName.valid || !this.LastName.valid) {
      this.benefitsService.DisplaySnackBar('Please Provide a Valid First/Last Name! (Alpha characters only)', (this.data.actiontype == "EDIT" ? "Update Dependent Information" : "Add New Dependent"));
      return;
    }
    if (this.FirstName.value.length == 0 || this.LastName.value.length == 0) {
      this.benefitsService.DisplaySnackBar('Please Provide a First/Last Name!', (this.data.actiontype == "EDIT" ? "Update Dependent Information" : "Add New Dependent"));
      return;
    }

    if (!this.DateOfBirth.valid || this.DateOfBirth.value > new Date()) {
      this.benefitsService.DisplaySnackBar('Please Provide a Date of Birth!', (this.data.actiontype == "EDIT" ? "Update Dependent Information" : "Add New Dependent"));
      return;
    }
    
    var DependentObject = {
      DependentId: this.DependentId,
      EmployeeId: this.EmployeeId,
      BenefitsAmount: this.GetBenefitsAmount(),
      DateOfBirth: this.DateOfBirth.value,
      FirstName: this.FirstName.value,
      LastName: this.LastName.value,
      Gender: this.Gender == '' ? 'P' : this.Gender
    }


    if (this.data.actiontype == "EDIT") {
      this.benefitsService.SaveDependentChanges(DependentObject);
    } else {
      this.benefitsService.AddNewDependent(DependentObject);
    }

    this.dialogRef.close();

  }

}
