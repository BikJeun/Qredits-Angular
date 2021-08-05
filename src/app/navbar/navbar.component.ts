import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from "primeng/api";
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items!: MenuItem[];

  constructor(public sessionService: SessionService, private router: Router) { }

  ngOnInit(): void {
    this.items = [
      {
        label: "Home",
        icon: "pi pi-fw pi-home",
        routerLink: ['/home']
      },
      {
        label: "Generated Vouchers",
        icon: "pi pi-fw pi-calendar",
        routerLink: ['/voucherManagement']
      },
      {
        label: "Authorised Merchants",
        icon: "pi pi-fw pi-ticket",
        routerLink: ['/merchantManagement']
      }
    ];

  }

  logout() {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentStaff(null);

    this.router.navigate(["/index"])
  }
}