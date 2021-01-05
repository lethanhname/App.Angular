import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, VERSION, HostBinding } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { SidebarService } from './app-common/sidebar/sidebar.service';
import { DashboardWidgetService } from './app-core/dashboard-widgets/dashboard/services/dashboard-widget.service';
import { AuthService } from './app-core/auth/services/auth.service';
import { FormControl } from '@angular/forms';
import { OverlayContainer } from '@angular/cdk/overlay';
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
    toggleControl = new FormControl(false);
    @HostBinding('class') className = '';

    constructor(public title: Title,
        private authService: AuthService,
        public sidebarservice: SidebarService,
        private dashboardWidgetService: DashboardWidgetService,
        private overlay: OverlayContainer
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
    darkModeTogged() {
        this.toggleControl.setValue(!this.toggleControl.value);
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
        this.toggleControl.valueChanges.subscribe((darkMode) => {
            const darkClassName = 'darkMode';
            this.className = darkMode ? darkClassName : '';
            if (darkMode) {
                this.overlay.getContainerElement().classList.add(darkClassName);
            } else {
                this.overlay.getContainerElement().classList.remove(darkClassName);
            }
        });
    }
    ngAfterViewInit() {
    }
}
