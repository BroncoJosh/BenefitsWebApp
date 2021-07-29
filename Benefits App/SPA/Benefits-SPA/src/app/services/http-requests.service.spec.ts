import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTPRequestsService } from './http-requests.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

describe('HTTPRequestsService', () => {
  let service: HTTPRequestsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    TestBed.configureTestingModule({
      // declarations: [ ApplicationContentComponent],
      imports:  [ MatSnackBarModule, HttpClientModule, HttpClientTestingModule ]
    })
    .compileComponents();
    
    service = TestBed.inject(HTTPRequestsService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});
