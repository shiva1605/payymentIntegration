import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(private route : ActivatedRoute) { }
  message:string;
  ngOnInit() {
    this.route.params.subscribe(params =>this.message=params['message'])
  }

}
