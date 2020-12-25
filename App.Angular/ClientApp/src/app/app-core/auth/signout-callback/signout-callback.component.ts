import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout-callback',
  templateUrl: './signout-callback.component.html',
  styles: []
})
export class SignoutCallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.finishLogout().then(_ => {
      this.router.navigate(['/'], { replaceUrl: true });
    });
  }

}
