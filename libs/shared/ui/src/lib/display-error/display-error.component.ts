import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-display-error',
  templateUrl: './display-error.component.html',
  styleUrls: ['./display-error.component.css'],
  imports : [TranslateModule]
})
export class DisplayErrorComponent implements OnInit {
  @Input() control!: FormControl | null;

  constructor() { }

  ngOnInit() {
  }

}
