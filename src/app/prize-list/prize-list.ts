import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NobelService } from '../nobel';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { forkJoin, Subject, debounceTime, switchMap, takeUntil, of } from 'rxjs';
import { LaureateDetailComponent } from '../laureate-dialog/laureate-dialog';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prize-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatPaginatorModule,
    RouterLink
  ],
  templateUrl: './prize-list.html',
  styleUrls: ['./prize-list.scss']
})
export class PrizeListComponent implements OnInit, OnDestroy {
  private nobel = inject(NobelService);
  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);

  @ViewChild('yearSelect') yearSelect!: MatSelect;
  @ViewChild('categorySelect') categorySelect!: MatSelect;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // UI state
  yearRanges: { label: string; start: number; end: number }[] = [];
  selectedRange: { label: string; start: number; end: number } | null = null;
  categories = [
    { value: '', label: 'All' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'medicine', label: 'Medicine' },
    { value: 'literature', label: 'Literature' },
    { value: 'peace', label: 'Peace' },
    { value: 'economic-sciences', label: 'Economic sciences' }
  ];

  selectedCategory = '';
  prizes: any[] = [];
  pagedPrizes: any[] = [];
  loading = false;
  error = '';

  private change$ = new Subject<void>();
  private destroy$ = new Subject<void>();

  // Year range setup
  minYear = 1970;
  maxYear = new Date().getFullYear();
  step = 5;

  // Pagination
  length = 0;
  pageSize = 6;
  pageIndex = 0;
  pageSizeOptions = [6, 12, 18];

  ngOnInit(): void {
    this.buildRanges();

    if (this.yearRanges.length) {
      this.selectedRange = this.yearRanges[this.yearRanges.length - 1];
    }

    // Listen for query param changes (category from navbar)
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const catFromUrl = params['category'] || '';
        if (catFromUrl !== this.selectedCategory) {
          this.selectedCategory = catFromUrl;
          this.triggerChange();
        }
      });

    // Fetch prizes on change
    this.change$
      .pipe(
        debounceTime(200),
        switchMap(() => {
          if (!this.selectedRange) return of([]);
          this.loading = true;
          this.error = '';

          const calls = [];
          for (let y = this.selectedRange.start; y <= this.selectedRange.end; y++) {
            calls.push(this.nobel.getPrizesByYear(y));
          }
          return calls.length ? forkJoin(calls) : of([]);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (responses: any) => {
          const flattened: any[] = [];
          if (Array.isArray(responses)) {
            for (const res of responses) {
              const list = res?.nobelPrizes || [];
              flattened.push(...list);
            }
          }

          const cat = this.selectedCategory?.trim().toLowerCase();
          const categoryMap: Record<string, string> = {
            physics: 'physics',
            chemistry: 'chemistry',
            medicine: 'physiology or medicine',
            literature: 'literature',
            peace: 'peace',
            'economic-sciences': 'economic sciences'
          };

          if (cat) {
            const apiCat = categoryMap[cat];
            this.prizes = flattened.filter(p => {
              const catValue =
                typeof p.category === 'string'
                  ? p.category.toLowerCase()
                  : p.category?.en?.toLowerCase?.() || '';
              return catValue === apiCat;
            });
          } else {
            this.prizes = flattened;
          }

          // Pagination setup
          this.length = this.prizes.length;
          this.pageIndex = 0;
          this.updatePagedPrizes();

          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Failed to load data';
          this.prizes = [];
          this.pagedPrizes = [];
          this.loading = false;
        }
      });

    // Initial load
    this.triggerChange();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  buildRanges() {
    this.yearRanges = [];
    const start = Math.max(1901, this.minYear);
    const end = Math.max(start, this.maxYear);
    for (let s = start; s <= end; s += this.step) {
      const e = Math.min(s + this.step - 1, end);
      this.yearRanges.push({ label: `${s} - ${e}`, start: s, end: e });
    }
  }

  onRangeChange() {
    this.triggerChange();
  }

  onCategoryChange() {
    this.triggerChange();
  }

  private triggerChange() {
    this.change$.next();
  }

  // MatPaginator event
  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.updatePagedPrizes();
  }

  private updatePagedPrizes() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedPrizes = this.prizes.slice(startIndex, endIndex);
  }
}
