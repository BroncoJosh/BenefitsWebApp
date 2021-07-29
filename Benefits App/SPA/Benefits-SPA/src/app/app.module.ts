import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { BenefitsEnrollmentComponent } from './application-content/benefits-enrollment/benefits-enrollment.component';
import { EmployeeListComponent } from './application-content/benefits-enrollment/employee-list/employee-list.component';
import { EnrollmentViewComponent } from './application-content/benefits-enrollment/enrollment-view/enrollment-view.component';
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import { EmployeeNavigationPanelComponent } from './application-content/employee-navigation-panel/employee-navigation-panel.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NotImplementedComponent } from './application-content/not-implemented/not-implemented.component';
import { ApplicationContentComponent } from './application-content/application-content.component';
import { OverviewComponent } from './application-content/overview/overview.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { DependentsDialogComponent } from './application-content/benefits-enrollment/dependents-dialog/dependents-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import { ConfirmationDialogComponent } from './application-content/benefits-enrollment/confirmation-dialog/confirmation-dialog.component';
import { EmployeeDialogComponent } from './application-content/benefits-enrollment/employee-dialog/employee-dialog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  entryComponents: [
    DependentsDialogComponent,
    ConfirmationDialogComponent,
    EmployeeDialogComponent
  ],
  declarations: [
    AppComponent,
    BenefitsEnrollmentComponent,
    EmployeeListComponent,
    EnrollmentViewComponent,
    EmployeeNavigationPanelComponent,
    NavbarComponent,
    NotImplementedComponent,
    ApplicationContentComponent,
    OverviewComponent,
    DependentsDialogComponent,
    ConfirmationDialogComponent,
    EmployeeDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule
  ],
  /*exports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    HttpClientModule,
    MatTableModule,
    MatCardModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule
  ],*/
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
]
})
export class AppModule { }
