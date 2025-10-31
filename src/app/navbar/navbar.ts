import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class NavbarComponent {
  categories = [
    { label: 'Physics', value: 'physics' },
    { label: 'Chemistry', value: 'chemistry' },
    { label: 'Medicine', value: 'medicine' },
    { label: 'Literature', value: 'literature' },
    { label: 'Peace', value: 'peace' },
    { label: 'Economic Sciences', value: 'economic-sciences' }
  ];
}
