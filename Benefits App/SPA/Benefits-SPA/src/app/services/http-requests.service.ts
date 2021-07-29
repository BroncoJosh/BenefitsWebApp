import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HTTPRequestsService {


  //Message(s)
  defaultErrorMessage: string = "Unable to Retrieve Results from Server. Please try again later!";

  constructor(public snackBar: MatSnackBar, private http: HttpClient) { }

  //Performs GET Request to API
  getItems(path: string, section: string, StringParameter: string = "", eventSubscription: Subscription, eventSubject: Subject<any>) {
    //If a Request is already ongoing, unsubscribe from previous request and make a new GET request
    if(eventSubscription) {
      eventSubscription.unsubscribe();
    }

    eventSubscription = this.http.get(environment.api + '/' + path + '/' + StringParameter).subscribe(
      response => {
        eventSubject.next(response);
      }, error => {
        this.snackBar.open(this.defaultErrorMessage, section, {
          duration: 4000
        });
      });
  }

  //Performs POST Request to API
  addNewItem(path: string, section: string, pathParam: string, object: any, eventSubject?: Subject<any>)
  {
    this.http.post(environment.api + '/' + path + '/' + pathParam, object)
      .subscribe(
        result => {
          this.snackBar.open("" + section + " Add Success!", section, {
            duration: 4000
          });
          if(eventSubject)
          {
            eventSubject.next(true);
          }
        },
        error => {
          this.snackBar.open(this.defaultErrorMessage, section, {
            duration: 4000
          });
        }
      );
  }
  //Performs PUT Request to API
  updateItem(path: string, section: string, pathParam: string, object: any, eventSubject?: Subject<any>)
  {
    this.http.put(environment.api + '/' + path + '/' + pathParam, object)
      .subscribe(
        result => {
          this.snackBar.open("" + section + " Update Success!", section, {
            duration: 4000
          });
          if (eventSubject)
          {
            eventSubject.next(true);
          }
        }, 
        error => {
          this.snackBar.open(this.defaultErrorMessage, section, {
            duration: 4000
          });
          if(eventSubject)
          {
            eventSubject.next(true);
          }
        }
      );
  }
  //Performs DELETE Request to API
  deleteItem(path: string, section: string, pathParam: string, eventSubject?: Subject<any>)
  {
    this.http.delete(environment.api + '/' + path + '/' + pathParam,)
      .subscribe(
        result => {
          this.snackBar.open("" + section + " Delete Success!", section, {
            duration: 4000
          });
          if (eventSubject)
          {
            eventSubject.next(true);
          }
        }, 
        error => {
          this.snackBar.open(this.defaultErrorMessage, section, {
            duration: 4000
          });
          if(eventSubject)
          {
            eventSubject.next(true);
          }
        }
      );
  }

}
