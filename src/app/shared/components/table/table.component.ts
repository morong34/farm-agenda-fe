import { Component, Input, OnInit } from '@angular/core';

export interface iRows {}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.sass',
  standalone: true,
})
export class TableComponent implements OnInit {
  @Input() columns: string[];
  @Input() rows: iRows;
  constructor() {}

  ngOnInit() {}
}
