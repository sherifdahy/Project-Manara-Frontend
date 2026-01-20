import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
@Component({
  selector: 'app-dialog',
  standalone: true,
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  @Input() dialogId!: string;

  @ViewChild('closeModalBtn') closeModalBtn!: ElementRef;
  @ViewChild('openModalBtn') openModalBtn!: ElementRef;

  constructor() { }

  ngOnInit() { }
  open() {
    this.openModalBtn.nativeElement.click(); // simulate open
  }
  close() {
    this.closeModalBtn.nativeElement.click();
  }
}
