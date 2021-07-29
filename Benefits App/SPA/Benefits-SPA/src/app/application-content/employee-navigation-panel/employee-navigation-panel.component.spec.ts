import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { AppModule } from 'src/app/app.module';

import { EmployeeNavigationPanelComponent } from './employee-navigation-panel.component';

describe('EmployeeNavigationPanelComponent', () => {
  let component: EmployeeNavigationPanelComponent;
  let fixture: ComponentFixture<EmployeeNavigationPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeNavigationPanelComponent ],
      imports: [ AppModule, MatIconModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNavigationPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call NewSectionSelected set SelectedSection', () => {
    let selectedSection = 'ABC';
    component.NewSectionSelected(selectedSection);
    expect(component.SelectedItem).toBe(selectedSection);
  });
});
