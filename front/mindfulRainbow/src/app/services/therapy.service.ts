import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Itherapy } from '../interfaces/itherapy';

@Injectable({
  providedIn: 'root',
})
export class TherapyService {
  constructor(private http: HttpClient) {}
  getTherapies() {
    return this.http.get<Itherapy[]>('http://localhost:3000/therapy-tracker');
  }
  getTherapy(therapyId: number) {
    return this.http.get<Itherapy>(
      `http://localhost:3000/therapy-tracker/${therapyId}`
    );
  }
  createTherapy(formData: any) {
    return this.http.post<Itherapy>(
      'http://localhost:3000/therapy-tracker',
      formData
    );
  }
  updateTherapy(therapyId: number, body: any) {
    return this.http.put<Itherapy>(
      `http://localhost:3000/therapy-tracker/${therapyId}`,
      body
    );
  }
  deleteTherapy(therapyId: number) {
    return this.http.delete<Itherapy>(
      `http://localhost:3000/therapy-tracker/${therapyId}`
    );
  }
}
