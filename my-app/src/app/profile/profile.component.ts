import { Component } from '@angular/core';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  activeTab: string = 'account-general'; // Default active tab

  changeTab(tab: string): void {
    this.activeTab = tab;
  }

  saveChanges(): void {
    // Implement save changes logic here
    console.log('Changes saved!');
  }

  cancel(): void {
    // Implement cancel logic here
    console.log('Changes canceled!');
  }
    // Add these properties
    username: string = 'trantnb';
    fullName: string = 'Trần Ngọc Bích Trân';
    email: string = 'tnbt@mail.com';
    company: string = 'K21411C';
  
}
