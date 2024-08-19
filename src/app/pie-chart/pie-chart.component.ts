import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICraft } from '../app.component';

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
})
export class PieChartComponent {
  @Input() chartType!: string;
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: string = 'pie';

  private apiUrl = 'https://66bd922a74dfc195586ce90a.mockapi.io/crafts';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchCrafts().subscribe((data) => {
      const categoryCounts = this.countCategories(data);
      this.pieChartLabels = Object.keys(categoryCounts);
      this.pieChartData = Object.values(categoryCounts);
    });
  }

  private fetchCrafts(): Observable<ICraft[]> {
    return this.http.get<ICraft[]>(this.apiUrl);
  }

  private countCategories(crafts: ICraft[]): { [key: string]: number } {
    return crafts.reduce((acc, craft) => {
      acc[craft.category] = (acc[craft.category] || 0) + 1;
      return acc;
    }, {} as { [key: string]: number });
  }
}
