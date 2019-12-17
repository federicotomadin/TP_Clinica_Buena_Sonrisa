import { Component, OnInit , Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pedirturno',
  templateUrl: './pedirturno.component.html',
  styleUrls: ['./pedirturno.component.css']
})
export class PedirturnoComponent implements OnInit {
  @Output() sacar : EventEmitter <Boolean> = new EventEmitter<Boolean>();

  constructor() { }

  ngOnInit() {
  }

  quitarPedirTurno(e:Event){
    
   // e.stopPropagation();
    //e.preventDefault();
    if(e["toElement"].className=="cont"){
        this.sacar.emit(true);
      }
  }

}
