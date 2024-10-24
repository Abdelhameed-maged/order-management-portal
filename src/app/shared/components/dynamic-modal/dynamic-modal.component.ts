import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dynamic-modal',
  templateUrl: './dynamic-modal.component.html',
  styleUrls: ['./dynamic-modal.component.scss']
})
export class DynamicModalComponent {

  title?: string;
  closeBtnName?: string;
  message = "";

  constructor(public bsModalRef: BsModalRef) {}

}
