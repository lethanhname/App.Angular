import { Injectable } from '@angular/core';
import { HttpClient, HttpBackend } from '@angular/common/http';

@Injectable()
export class AppConfig {
  static settings: IAppConfig;
  private httpClient: HttpClient;

  constructor(handler: HttpBackend) {
    this.httpClient = new HttpClient(handler);
  }
  load() {
      const jsonFile = `assets/data/app-config.json`;
      return new Promise<void>((resolve, reject) => {
          this.httpClient.get(jsonFile).toPromise().then((response: IAppConfig) => {
             AppConfig.settings = (response as IAppConfig);
             resolve();
          }).catch((response: any) => {
             reject(`Could not load file '${jsonFile}': ${JSON.stringify(response)}`);
          });
      });
  }
}
export interface IAppConfig {
  auth: {
    domain: string;
    clientId: string;
  };
}
