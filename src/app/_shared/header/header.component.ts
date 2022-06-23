import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[];
  toggleClass;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.toggleClass = Capacitor.isNativePlatform() ? 'show-back-btn' : '';

    if(this.router.url === '/'){
      this.toggleClass = '';
    }

    this.items = [
      {label: 'FAQ', icon: 'pi pi-fw pi-question-circle', url: '/faq'},
      {label: 'Disclaimer', icon: 'pi pi-fw pi-info-circle', url: '/disclaimer'}
  ];
  }

}
