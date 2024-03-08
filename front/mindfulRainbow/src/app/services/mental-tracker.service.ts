import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ImentalTracker } from '../interfaces/imental-tracker';

@Injectable({
  providedIn: 'root',
})
export class MentalTrackerService {
  constructor(private http: HttpClient) {}
  getMentalTrackers() {
    return this.http.get<ImentalTracker[]>(
      'http://localhost:3000/mood-tracking'
    );
  }
  getMentalTracker(moodTrackingId: number) {
    return this.http.get<ImentalTracker>(
      `http://localhost:3000/mood-tracking/${moodTrackingId}`
    );
  }
  createMentalTracker(formData: any) {
    return this.http.post<ImentalTracker>(
      'http://localhost:3000/mood-tracking',
      formData
    );
  }
  updateMentalTracker(moodTrackingId: number, body: any) {
    return this.http.put<ImentalTracker>(
      `http://localhost:3000/mood-tracking/${moodTrackingId}`,
      body
    );
  }
  deleteMentalTracker(moodTrackingId: number) {
    return this.http.delete<ImentalTracker>(
      `http://localhost:3000/mood-tracking/${moodTrackingId}`
    );
  }
}
