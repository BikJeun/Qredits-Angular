import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Merchant } from '../models/merchant';
import { User } from '../models/user';
import { MerchantServiceService } from '../services/merchant-service.service';
import { SessionService } from '../services/session.service';
import { UserManagementService } from '../services/user-management.service';

@Component({
  selector: 'app-merchant-management',
  templateUrl: './merchant-management.component.html',
  styleUrls: ['./merchant-management.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class MerchantManagementComponent implements OnInit {
  staffs: User[];
  staffToView: User;
  staff: User;

  items!: MenuItem[];

  showUpdate: boolean = false;
  showDelete: boolean = false;
  showCreate: boolean = false;

  submitted: boolean = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, public sessionService: SessionService, private staffManagementService: UserManagementService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.staffs = new Array();
    this.staffToView = new User();
    this.staff = new User();

    this.items = [
      {

        label: "Update",
        icon: "pi pi-folder-open",
        command: () => { this.showUpdateDialog(); },
      },
      {
        label: "Delete",
        icon: "pi pi-trash",
        command: () => { this.deleteStaff(); },
      }

    ];

  }

  ngOnInit(): void {
    this.staffManagementService.getStaffs().subscribe(
      response => {
        this.staffs = response;
      },
      error => {
        console.log('********** ViewAllStaffComponent.ts: ' + error);
      }
    );
  }

  passStaff(staff: User) {
    this.staffToView = staff;
  }

  showUpdateDialog(): void {
    this.showUpdate = true;
    // this.messageService.add({ severity: 'success', summary: 'Update Staff', detail: "Staff updated successfully" });
  }

  showCreateDialog(): void {
    this.showCreate = true;
  }

  createNewStaff(): void {

    if (this.staff != null) {
      console.log(this.staff);
      this.staffManagementService.createNewStaff(this.staff).subscribe(
        res => {
          let newStaffId: User = res;
          if (newStaffId.id != null) {
            this.staffManagementService.getStaffByStaffId(newStaffId.id).subscribe(
              res => {
                this.staff = res;
              },
              error => {
                console.log('********** retrieve by id: ' + error);
              }
            );
          }
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Staff Created', life: 3000 });
          this.staffs.push(this.staff);
          this.ngOnInit();
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Staff Creation Failed', life: 3000 });
          console.log('********** create staff: ' + error);
        }
      );
    }
    this.showCreate = false;
  }

  deleteStaff(): void {
    this.showDelete = true;

    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + this.staffToView.id + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (this.staffToView.id != null) {
          this.staffManagementService.deleteStaff(this.staffToView.id).subscribe(
            response => {
              this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Staff Deleted', life: 3000 });
              this.staffs = this.staffs.filter(val => val.id !== this.staffToView.id);
              this.ngOnInit();
              // this.router.navigate(["/staffManagement"]);
            },
            error => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Staff Deletion Fail', life: 3000 });
              console.log('********** DeleteStaff: ' + error);

            }
          )
        }

      }
    });
  }

  hideDialog(): void {
    this.showUpdate = false;
    this.showCreate = false;
  }

  updateStaff() {

    this.submitted = true;
    if (this.staffToView.id != null) {
      this.staffManagementService.updateStaff(this.staffToView, this.staffToView.id).subscribe(
        response => {
          this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Staff Updated', life: 3000 });
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Staff Update Fail', life: 3000 });
          console.log('********** UpdateProductComponent.ts: ' + error);
        }

      );

      this.ngOnInit();
      this.showUpdate = false;
    }
  }




}
