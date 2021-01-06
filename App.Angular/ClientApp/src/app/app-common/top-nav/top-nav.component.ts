import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/app-core/auth/services/auth.service';

@Component({
    selector: 'app-top-nav',
    templateUrl: './top-nav.component.html',
    styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
    @Output() toggled: EventEmitter<any> = new EventEmitter<any>();

    public isUserAuthenticated = false;
    public givenName = '';

    returnUrl: string;

    constructor(private authenticationService: AuthService, private router: Router,
    ) {

        this.router.events.subscribe((event) => {

            if (event instanceof NavigationEnd) {

                this.returnUrl = event.url;
            }

        });

    }

    ngOnInit(): void {
        this.authenticationService.loginChanged
            .subscribe(res => {
                this.isUserAuthenticated = res;
                this.getDisplayName();
                if (!this.isUserAuthenticated) {
                    // this.router.navigate(['/'], { replaceUrl: true });
                    this.login();
                }

            });
    }


    public getDisplayName = () => {
        return this.authenticationService.getDisplayName()
            .then(res => {
                this.givenName = res;
            });
    }

    public logout() {
        this.authenticationService.startSignout();
    }

    public login() {
        this.authenticationService.startAuthentication();
    }
    toggleSidebar() {
        this.toggled.emit();
    }
}
