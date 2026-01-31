import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';


@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  RequestCount = 0;

  constructor(private _service: NgxSpinnerService) { }

  loading() {
    this.RequestCount++;
    if (this.RequestCount === 1) {
      this._service.show(undefined, {
        bdColor: "rgba(0, 0, 0, 0.8)",
        size: "default",
        color: "#fff",
        type: "ball-clip-rotate",
        fullScreen: true,
      });
    }
  }
  hide() {
    if (this.RequestCount > 0) {
      this.RequestCount--;
    }
    if (this.RequestCount === 0) {
      this._service.hide();
    }
  }
}
