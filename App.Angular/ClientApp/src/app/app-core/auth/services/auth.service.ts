import { Injectable } from '@angular/core';

import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { Subject } from 'rxjs';
import { AppConfig } from '../../../app-config.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private manager: UserManager;
    private currentuser: User = null;
    private loginChangedSubject = new Subject<boolean>();
    public loginChanged = this.loginChangedSubject.asObservable();
    // config: AppConfig;

    constructor() {
        // this.config = this.configService.readConfig();
        this.manager = new UserManager(getClientSettings());
        this.manager.events.addAccessTokenExpired(() => {
          this.loginChangedSubject.next(false);
        });
    }

    public isLoggedIn = (): Promise<boolean> => {
      return this.manager.getUser()
      .then(user => {
        if ( this.currentuser !== user){
          this.loginChangedSubject.next(this.checkUser(user));
        }
        this.currentuser = user;
        return this.checkUser(user);
      });
    }

    private checkUser = (user: User): boolean => {
      return !!user && !user.expired;
    }

    public getClaims = (): Promise<any> => {
      return this.manager.getUser()
      .then(user => {
        if ( !user?.expired) {
          return user?.profile;
        }
      });
    }

    public getDisplayName = (): Promise<string> => {
      return this.manager.getUser()
      .then(user => {
        if ( !user?.expired) {
          return user?.profile.given_name;
        }
      });
    }

    public getAccessToken = (): Promise<string> => {
      return this.manager.getUser()
      .then(us => {
        return !!us && !us.expired ? us.access_token : null;
      });
    }

    startAuthentication(): Promise<void> {
        return this.manager.signinRedirect();
    }

    public completeAuthentication = (): Promise<User> => {
      return this.manager.signinRedirectCallback()
      .then(user => {
        this.loginChangedSubject.next(this.checkUser(user));
        return user;
      });
    }

    public startSignout = () => {
      this.manager.signoutRedirect();
    }
    public finishLogout = () => {
      this.currentuser = null;
      this.loginChangedSubject.next(false);
      return this.manager.signoutRedirectCallback();
    }
}

export function getClientSettings(): UserManagerSettings {
    return {
        authority: AppConfig.settings.auth.domain,
        client_id: AppConfig.settings.auth.clientId,
        redirect_uri: `${AppConfig.settings.auth.domain}/auth-callback`,
        post_logout_redirect_uri: `${AppConfig.settings.auth.domain}/signout-callback`,
        response_type: 'id_token token',
        scope: 'openid offline_access WebAPI profile names',
        filterProtocolClaims: true,
        loadUserInfo: true,
        automaticSilentRenew: true,
        silent_redirect_uri: `${AppConfig.settings.auth.domain}/assets/silent-refresh.html`
    };
}
