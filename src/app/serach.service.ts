import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICraft } from './app.component';

@Injectable({
  providedIn: 'root',
})
export class SerachService {
  constructor(private http: HttpClient) {}

  searchCraft(searchTerm: string): any {
    return this.http.get<ICraft[]>(
      `https://66bd922a74dfc195586ce90a.mockapi.io/crafts?search=${searchTerm}`
    );
  }
}
