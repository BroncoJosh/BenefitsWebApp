import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationContentComponent } from './application-content.component';
import { AppModule } from '../app.module';

describe('ApplicationContentComponent', () => {
  let component: ApplicationContentComponent;
  let fixture: ComponentFixture<ApplicationContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationContentComponent],
      imports:  [ AppModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call NewSectionSelected set SelectedSection', () => {
    let selectedSection = 'ABC';
    component.NewSectionSelected(selectedSection);
    expect(component.SelectedSection).toBe(selectedSection);
  });


});
