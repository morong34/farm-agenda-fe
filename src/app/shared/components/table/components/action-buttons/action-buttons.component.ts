import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TableConstant } from '../../consts/table';

export interface TableButtonAction {
  name: string;
  value?: any;
}

@Component({
  selector: '[action-buttons]',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.sass']
})
export class ActionButtonsComponent {
  @Input() value: string;
  @Output() buttonAction: EventEmitter<TableButtonAction> = new EventEmitter<TableButtonAction>();

  onEditClick() {
    this.buttonAction.emit({
      name: TableConstant.actionButton.edit,
      value: this.value
    });
  }
  onDeleteClick() {
    this.buttonAction.emit({ name: TableConstant.actionButton.delete });
  }
  onViewClick() {
    this.buttonAction.emit({ name: TableConstant.actionButton.view });
  }
}
