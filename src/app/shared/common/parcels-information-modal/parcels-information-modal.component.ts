import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ParcelsService } from '../../services/parcels.service';
import { isEmpty } from 'lodash';

@Component({
  selector: 'app-parcels-information-modal',
  templateUrl: './parcels-information-modal.component.html',
  styleUrl: './parcels-information-modal.component.sass',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
})
export class ParcelsInformationModalComponent implements OnInit {
  pageIsReady: boolean = false;
  fieldId: number;
  parcel: any;
  hasCulture: boolean;
  constructor(
    public activeModal: NgbActiveModal,
    private parcelService: ParcelsService
  ) {}

  ngOnInit() {
    this.parcelService.getById(this.fieldId).subscribe(parcel => {
      this.parcel = parcel.data;
      this.hasCulture = !isEmpty(parcel.data.attributes.culture);
      this.pageIsReady = true;
    });
  }
}
