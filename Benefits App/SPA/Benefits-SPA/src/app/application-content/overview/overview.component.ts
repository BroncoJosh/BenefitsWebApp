import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @Output() SectionSelected = new EventEmitter<any>();
  
  constructor() { }

  ngOnInit(): void {
  }

  NavigateToAnotherArea(area: string) {
    this.SectionSelected.emit(area);
  }
}
