import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  {path: '',component:PaymentComponent},
  {path: 'confirmation/:message',component:ConfirmationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
