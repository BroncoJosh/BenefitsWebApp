import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-application-content',
  templateUrl: './application-content.component.html',
  styleUrls: ['./application-content.component.css']
})
export class ApplicationContentComponent implements OnInit {
  SelectedSection: string = "Overview";

  constructor() { }

  ngOnInit(): void {
  }

  NewSectionSelected(event : string) {
    this.SelectedSection = event;
  }
}
