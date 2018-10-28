import { Component, OnInit, Inject } from '@angular/core';
import { DonateService } from '../donate.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private donateService: DonateService, @Inject(DOCUMENT) private document: any) { }
  amount: number;
  ngOnInit() {
  }
  donate(){
    this.donateService.donate(this.amount).subscribe((responseData)=>{
      console.log(responseData)
      this.document.location.href=responseData.message
    }, (error)=>{
      console.log(error);
    })
  }

}
