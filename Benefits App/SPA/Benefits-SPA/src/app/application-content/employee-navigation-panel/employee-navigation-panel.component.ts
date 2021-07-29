import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';

@Component({
  selector: 'app-employee-navigation-panel',
  templateUrl: './employee-navigation-panel.component.html',
  styleUrls: ['./employee-navigation-panel.component.css']
})
export class EmployeeNavigationPanelComponent implements OnInit {
  @Input() SelectedItem = 'Overview'; 
  @Output() SectionSelected = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  NewSectionSelected(area: string) {
    this.SelectedItem = area;
    this.SectionSelected.emit(area);
  }
}
