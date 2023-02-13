import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Injectable()
export class DashboardService {
  stats = [
    {
      title: 'Total Employee',
      amount: '250',
      progress: {
        value: 100,
      },
      color: 'bg-indigo-500',
    },
    {
      title: 'Total ESD Tests',
      amount: '200',
      progress: {
        value: 70,
      },
      color: 'bg-blue-500',
    },
    {
      title: 'ESD Pass',
      amount: '194',
      progress: {
        value: 80,
      },
      color: 'bg-green-500',
    },
    {
      title: 'ESD Fail',
      amount: '6',
      progress: {
        value: 6,
      },
      color: 'bg-teal-500',
    },
  ];



  constructor(private http: HttpClient) {}




  getStats() {
    return this.stats;
  }
}
