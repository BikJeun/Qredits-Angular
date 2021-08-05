import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { SessionService } from '../services/session.service';
import { Voucher } from '../models/voucher';
import { VoucherService } from '../services/voucher.service';
import { Merchant } from '../models/merchant';

@Component({
  selector: 'app-voucher-management',
  templateUrl: './voucher-management.component.html',
  styleUrls: ['./voucher-management.component.css']
})
export class VoucherManagementComponent implements OnInit {
  currentMerchant: Merchant
  promoCodes: Voucher[]
  promoCodeToCreate: Voucher
  createDisplay: Boolean

  promoCodeToView: Voucher

  availableError: Boolean;
  message: String;
  submitted: Boolean;
  startError: Boolean;
  endError: Boolean;
  resultError: Boolean;

  items!: MenuItem[];

  showUpdate: boolean = false;
  showDelete: boolean = false;

  constructor(private confirmationService: ConfirmationService, public sessionService: SessionService, private router: Router, private voucherService: VoucherService, private messageService: MessageService, public datePipe: DatePipe) {
    this.currentMerchant = sessionService.getCurrentStaff();
    this.promoCodes = new Array();
    this.promoCodeToCreate = new Voucher();
    this.promoCodeToView = new Voucher();
    this.createDisplay = false;
    this.availableError = false;
    this.message = ""
    this.submitted = false;
    this.startError = false;
    this.endError = false;
    this.resultError = false;

    this.items = [
      {

        label: "Update",
        icon: "pi pi-folder-open",
        command: () => { this.showUpdateDialog(); },
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => { this.deleteVoucher(); },
      }

    ];
  }

  ngOnInit(): void {
  }

  passVoucher(code: Voucher) {
    this.promoCodeToView = code;
  }

  showUpdateDialog(): void {
    this.showUpdate = true;
    // this.messageService.add({ severity: 'success', summary: 'Update Staff', detail: "Staff updated successfully" });
  }

  deleteVoucher(): void {
    this.showDelete = true;

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.promoCodeToView.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.promoCodeToView.id != null) {
          this.voucherService.deleteVoucher(this.promoCodeToView.id, this.currentMerchant.id).subscribe(
            response => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Voucher Deleted', life: 3000 });
              this.promoCodes = this.promoCodes.filter(val => val.id !== this.promoCodeToView.id);
              this.ngOnInit();
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Staff Deletion Fail', life: 3000 });
              console.log('********** deleteVoucher: ' + error);

            }
          )
        }

      }
    });
  }

  displayCreateDialog() {
    this.createDisplay = true;
    this.availableError = false;
    this.startError = false;
    this.endError = false;
    this.resultError = false;
    this.promoCodeToCreate = new Voucher();
  }

  updateCode() {
    if (this.promoCodeToView.id != null) {
      this.voucherService.updatePromoCode(this.promoCodeToView, this.currentMerchant.id, this.promoCodeToView.id).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Promo Updated', life: 3000 });

        console.log("promoCode of ID: " + this.promoCodeToView.id + "is updated!");
      }, error => {
        console.log(error)
      })
    }
  }

  createPromo(createPromoForm: NgForm) {
    let allChecks = true;
    this.submitted = true;

    if (this.promoCodeToCreate.expiry == null) {
      this.startError = true;
      allChecks = false;
    } else {
      this.startError = false;
    }

    if (this.promoCodeToCreate.isAvailable != null && this.promoCodeToCreate.expiry != null) {
      allChecks = true;
    }
    if (allChecks) {
      if (createPromoForm.valid) {
        this.promoCodeToCreate.isAvailable = true;
        this.promoCodeToCreate.isGenerated = false;
        this.voucherService.createPromoCode(this.promoCodeToCreate, this.currentMerchant.id).subscribe(
          response => {
            let voucher: Voucher = response;
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Promo Created', life: 3000 });

            this.createDisplay = false;
            this.updateTable();
            // window.location.reload();
          }, error => {
            this.resultError = true;
            this.message = error;
          })
      }
    }
  }

  updateTable(): void {
    this.voucherService.getPromoCodes(this.currentMerchant.id).subscribe(response => {
      this.promoCodes = response;
    }, error => {
      console.log('************* VoucherManagement.ts' + error);
    })
  }

  clear() {
    this.promoCodeToCreate = new Voucher();
  }

  returnDate(date: Date): any {
    let newDate;
    newDate = date.toString().substring(0, date.toString().length - 5);
    console.log(newDate)
    date = new Date(newDate);
    return this.datePipe.transform(date, 'dd/MM/yyyy hh:mm:ss a')
  }

}
