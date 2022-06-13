import { Component, createPlatform, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface ProviderLOV{
  Id: number;
  Name: string;
  Rate: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  form: FormGroup;
  providerList: ProviderLOV[];

  InitialAmount:number = 0;
  ElevyCharge:number = 0;
  ServiceCharge:number = 0;
  FinalAmount:number = 0;

  SelectedProviderRate: number = 0;

  elevyRateLabel;
  serviceRateLabel;
  senderProviderRate: ProviderLOV;
  receiverProviderRate: ProviderLOV;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.providerList = [
      {Id: undefined, Name: 'Select Network Provider', Rate: undefined},
      {Id: 1, Name: 'MTN MoMo', Rate: 0.75},
      {Id: 2, Name: 'Vodafone Cash', Rate: 0.00},
      {Id: 3, Name: 'AirtelTigo Money', Rate: 0.75}
    ];

    this.createForm();
  }

  createForm(){
    this.form = this.fb.group({
      amount: [null, Validators.required],
      senderProviderRate: [null, Validators.required],
      receiverProviderRate: [null, Validators.required]
    })
  }

  onSubmit(){
    const e_levy = 1.5;
    if(this.form.valid){
      const SenderProviderRate = this.form.get('senderProviderRate').value;
      const ReceiverProviderRate = this.form.get('receiverProviderRate').value;
      console.log('from => ', SenderProviderRate);
      console.log('to => ', ReceiverProviderRate);
      this.InitialAmount = Number(this.form.get('amount').value);
      if(this.InitialAmount < 0){
        console.log('Enter a valid amount');
        return;
      }
      if(this.InitialAmount <=100){
        this.ElevyCharge = 0;
        this.elevyRateLabel = '';
      }else{
        this.ElevyCharge = Number(this.InitialAmount * e_levy / 100);
        this.elevyRateLabel = `(${e_levy}%)`;
      }

      // mtn to mtn
      if(SenderProviderRate.Id == 1){
        console.log('mtn to mtn');
        if(this.InitialAmount <= 50){
          this.ServiceCharge = 0.5;
          this.serviceRateLabel = '';
        }
        if(this.InitialAmount > 50 && this.InitialAmount <= 1000){
          this.ServiceCharge = Number(this.InitialAmount * SenderProviderRate.Rate / 100);
          this.serviceRateLabel = `(${SenderProviderRate.Rate}%)`;
        }
        if(this.InitialAmount > 1000){
          this.ServiceCharge = 10;
          this.serviceRateLabel = '';
        }
      }else{
        this.ServiceCharge = 0;
          this.serviceRateLabel = '';
      }
      // this.SelectedProviderRate = this.form.get('providerRate').value;
      // this.ServiceCharge = Number(this.InitialAmount * this.SelectedProviderRate / 100);
      this.FinalAmount = this.InitialAmount + this.ElevyCharge + this.ServiceCharge;

    }
  }

  reset(){
    this.form.reset();
    this.InitialAmount = this.ElevyCharge = this.ServiceCharge = this.FinalAmount = 0;
    this.serviceRateLabel = this.elevyRateLabel = '';
  }

}
