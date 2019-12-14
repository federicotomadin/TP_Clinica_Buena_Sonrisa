import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  @Input() eventos: [];


  constructor() { }

  ngOnInit() {
  }

}
