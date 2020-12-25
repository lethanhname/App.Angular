import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, VERSION } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SidebarService } from './app-common/sidebar/sidebar.service';
import { DashboardWidgetService } from './app-core/dashboard-widgets/dashboard/services/dashboard-widget.service';
import { AuthService } from './app-core/auth/services/auth.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

    // navItems: any[] = [
    //     { name: 'Home', route: 'home' },
    //     { name: 'Roles', route: 'security/role' }
    // ];
    public userAuthenticated = false;


    constructor(public title: Title,
                private authService: AuthService,
                public sidebarservice: SidebarService,
                private dashboardWidgetService: DashboardWidgetService
    ) {

        this.toggleSidebar();
        // Automatically load user profile
        // this.oAuthService.events
        //     .pipe(filter(e => e.type === 'token_received'))
        //     .subscribe(_ => {
        //         // tslint:disable-next-line:no-console
        //         console.debug('state', this.oAuthService.state);
        //         this.oAuthService.loadUserProfile();
        //     });

        this.authService.loginChanged
        .subscribe(userAuthenticated => {
          this.userAuthenticated = userAuthenticated;
        });
    }
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
        window.dispatchEvent(new Event('resize'));

        setTimeout(() => {
            this.dashboardWidgetService.reflowWidgets();
        }, 500);

      }

      getSideBarState() {
        return this.sidebarservice.getSidebarState();
      }

    ngOnInit() {
        console.log('App Init');
        this.authService.isLoggedIn()
        .then(userAuthenticated => {
          this.userAuthenticated = userAuthenticated;
        });
    }
    ngAfterViewInit() {
    }
}
