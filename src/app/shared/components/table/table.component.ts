import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TableButtonAction } from './components/action-buttons/action-buttons.component';
import { TableColumn } from './consts/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup } from '@angular/forms';
import { FormMode } from '../../helpers/forms/baseFormComponent';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass']
})
export class TableComponent implements OnInit, OnChanges, OnDestroy {
  @Input() showSelectAll: boolean = false;
  @Input() pagination: boolean = false;
  @Input() showAction: boolean = false;
  @Output() action: EventEmitter<TableButtonAction> = new EventEmitter<TableButtonAction>();
  @Input() columns: Array<TableColumn>;
  @Input() mode: FormMode = FormMode.View;
  @Input() dataset: Array<any> = [];
  @Input() parentFormGroup: FormGroup;
  @Input() style: any;

  @ViewChild(MatTable) table!: MatTable<any>;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  selection = new SelectionModel<any>(true, []);
  pageIsReady: boolean = false;
  constructor(private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.setColumns();
    this.initiateTable();
    this.initiateRows();

    this.mode === FormMode.Edit ? this.masterToggle() : '';
    this.pageIsReady = true;
  }

  setColumns() {
    if (this.showSelectAll) {
      this.displayedColumns.push('select');
    }

    this.displayedColumns = this.displayedColumns.concat(this.columns.map((x) => x.columnDef));

    if (this.showAction) {
      this.displayedColumns.push('action');
    }
  }

  initiateTable() {
    this.dataSource = new MatTableDataSource<any>(this.dataset);
    this.selection = new SelectionModel(true, []);
  }

  initiateRows() {
    if (this.dataset) {
      this.dataSource = new MatTableDataSource<any>(this.dataset);
    }

    if (this.parentFormGroup) {
      this.parentFormGroup.controls.polygon.valueChanges.subscribe((value) => {
        this.dataSource = new MatTableDataSource<any>(this.createDataSource(value));
        this.changeDetectorRef.detectChanges();
      });
    }
  }

  createDataSource(value: any[]) {
    let result = [];
    value.map((item: any, index: any) => result.push({ position: ++index, points: item[0].length }));
    return result;
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('dataset' in changes && changes.dataset.firstChange === false) {
      this.dataSource = new MatTableDataSource<any>(this.dataset);
    }
  }

  isAllSelected() {
    const numSelected = this.selection?.selected?.length;
    const numRows = this.dataSource?.data?.length;
    return numSelected === numRows;
  }
  onTableAction(event: TableButtonAction, element: string): void {
    this.action.emit(Object.assign(event, { value: element }));
  }

  masterToggle() {
    this.isAllSelected() ? this.selection?.clear() : this.dataSource?.data?.forEach((row) => this.selection?.select(row));
  }

  get getSelected() {
    return this.selection?.selected;
  }

  ngOnDestroy() {
    this.columns = [];
    this.dataset = [];
    this.displayedColumns = [];
  }
}
