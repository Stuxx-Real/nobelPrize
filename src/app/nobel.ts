import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class NobelService {
  private base = 'https://api.nobelprize.org/2.1/nobelPrizes';

  constructor(private http: HttpClient) {}

  // returns Observable of the API response for a given year
  getPrizesByYear(year: number): Observable<any> {
    const url = `${this.base}?nobelPrizeYear=${year}`;
    return this.http.get(url);
  }
}
