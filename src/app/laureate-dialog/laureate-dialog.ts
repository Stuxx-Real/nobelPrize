import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-laureate-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, MatProgressSpinnerModule],
  templateUrl: './laureate-dialog.html',
  styleUrls: ['./laureate-dialog.scss']
})
export class LaureateDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  laureate: any = null;
  loading = true;
  error = '';

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.fetchLaureate(id);
    } else {
      this.loading = false;
      this.error = 'Invalid laureate ID.';
    }
  }

fetchLaureate(id: string) {
  this.loading = true;
  this.http.get(`https://api.nobelprize.org/2.1/laureate/${id}`).subscribe({
    next: (res: any) => {
      console.log('API Response:', res); // Check actual structure
      this.laureate = res?.laureates?.[0] || res?.[0] || null;
      console.log('Extracted laureate:', this.laureate);
      this.loading = false;
    },
    error: (err) => {
      console.error(err);
      this.error = 'Failed to load laureate details.';
      this.loading = false;
    }
  });
}

}
