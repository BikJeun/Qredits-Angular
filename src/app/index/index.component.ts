import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Merchant } from '../models/merchant';
import { MerchantServiceService } from '../services/merchant-service.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  providers: [MessageService]
})
export class IndexComponent implements OnInit {
  staff: Merchant | undefined;
  loginError: boolean | undefined;
  errorMessage: string | undefined;

  model = {
    username: "",
    password: ""
  }


  constructor(private router: Router, private activatedRouter: ActivatedRoute, public sessionService: SessionService, private merchantService: MerchantServiceService, private messageService: MessageService) {
    this.loginError = false;
  }


  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(this.model.username, this.model.password);
    this.model.username = this.model.username.trim();
    console.log(this.model.username, this.model.password);
    this.staffLogin();
  }

  staffLogin(this: any) {
    console.log(">>>>>> LOGIN <<<<<<<<");
    this.sessionService.setUsername(this.model.username);
    this.sessionService.setPassword(this.model.password);
    this.merchantService.staffLogin(this.model.username, this.model.password).subscribe(
      (response: Merchant) => {
        let staff: Merchant = response;

        if (staff != null && staff.role == "Cashier") {
          this.sessionService.setIsLogin(true);
          this.sessionService.setCurrentStaff(staff);
          this.loginError = false;
          this.router.navigate(["/main-page"]);
        } else {
          this.loginError = true;
          this.messageService.add({ severity: 'error', summary: 'Login Error', detail: "Staff does not exist" });
        }
        console.log(JSON.parse(sessionStorage.currentStaff));

      },
      (error: any) => {
        this.loginError = true;
        this.errorMessage = error;
        this.messageService.add({ severity: 'error', summary: 'Login Error', detail: this.errorMessage });
      }
    );
  }

}
