import { Injectable } from '@angular/core';
import { UsersService } from './users.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService {
  constructor(private router: Router, private userService: UsersService) {}

  canActivate() {
    if (!this.userService.getToken()) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
