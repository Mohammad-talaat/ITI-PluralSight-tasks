import { Component, OnInit, Output } from '@angular/core';
import { HttpService } from './shared-module/get-data/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data:any
  constructor(private httpService:HttpService){}
  userNameFromChild:string=''
  ngOnInit(): void {
    this.httpService.getData().subscribe(response =>{
        console.log('response received')
        this.data = response
      })


  }

  displayData(data: any){
    this.userNameFromChild = data
  }

}




