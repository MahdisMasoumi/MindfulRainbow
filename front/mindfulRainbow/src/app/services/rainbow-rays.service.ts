import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IrainbowRays } from '../interfaces/irainbow-rays';

@Injectable({
  providedIn: 'root',
})
export class RainbowRaysService {
  constructor(private http: HttpClient) {}
  getRainbowRays() {
    return this.http.get<IrainbowRays[]>('http://localhost:3000/rainbow-rays');
  }
  getRainbowRay(rainbowRayId: number) {
    return this.http.get<IrainbowRays>(
      `http://localhost:3000/rainbow-rays/${rainbowRayId}`
    );
  }
  createRainbowRay(formData: any) {
    return this.http.post<IrainbowRays>(
      'http://localhost:3000/rainbow-rays',
      formData
    );
  }
  updateRainbowRay(rainbowRayId: number, body: any) {
    return this.http.put<IrainbowRays>(
      `http://localhost:3000/rainbow-rays/${rainbowRayId}`,
      body
    );
  }
  deleteRainbowRay(rainbowRayId: number) {
    return this.http.delete<IrainbowRays>(
      `http://localhost:3000/rainbow-rays/${rainbowRayId}`
    );
  }
}
