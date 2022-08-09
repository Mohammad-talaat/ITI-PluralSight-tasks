import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.scss']
})
export class ChildComponent implements OnInit {
  @Input() data:any
  @Output() clickedEvent:any = new EventEmitter()

  constructor() { }

  ngOnInit(): void {

  }
  emitEvent(event:any){
    console.log(event.target.parentElement.parentElement.parentElement.children[0].children[1].children[0].innerText )
    let userName = event.target.parentElement.parentElement.parentElement.children[0].children[1].children[0].innerText
    this.clickedEvent.emit(userName)
  }

}
