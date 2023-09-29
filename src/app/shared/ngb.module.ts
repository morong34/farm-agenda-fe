import { NgModule } from '@angular/core';
import { NgbDropdown, NgbDropdownItem, NgbDropdownMenu, NgbDropdownToggle } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [NgbDropdownMenu, NgbDropdownItem, NgbDropdown, NgbDropdownToggle],
  exports: [NgbDropdownMenu, NgbDropdownItem, NgbDropdown, NgbDropdownToggle]
})
export class NgbModule {}
