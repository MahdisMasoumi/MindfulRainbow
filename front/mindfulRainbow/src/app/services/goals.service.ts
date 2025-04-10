import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Igoals } from '../interfaces/igoals';

@Injectable({
  providedIn: 'root',
})
export class GoalsService {
  constructor(private http: HttpClient) {}
  getGoals() {
    return this.http.get<Igoals[]>('http://localhost:3000/rainbow-goals');
  }
  getGoal(goalId: number) {
    return this.http.get<Igoals>(
      `http://localhost:3000/rainbow-goals/${goalId}`
    );
  }
  createGoal(formData: any) {
    return this.http.post<Igoals>(
      'http://localhost:3000/rainbow-goals',
      formData
    );
  }
  updateGoal(goalId: number, body: any) {
    return this.http.put<Igoals>(
      `http://localhost:3000/rainbow-goals/${goalId}`,
      body
    );
  }
  deleteGoal(goalId: number) {
    return this.http.delete<Igoals>(
      `http://localhost:3000/rainbow-goals/${goalId}`
    );
  }
}
