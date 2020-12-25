import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Dashboard } from '../../app-core/dashboard-widgets/dashboard/models/dashboard-widgets.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private readonly DASHBOARDS = 'assets/data/dashboards.json';

  constructor(protected httpClient: HttpClient) {}

  getDashboards(): Observable<Dashboard[]> {
    return this.httpClient.get<Dashboard[]>(this.DASHBOARDS);
  }

  getDashboard(dashboardId: string): Observable<Dashboard>  {
    return this.httpClient.get<Dashboard[]>(this.DASHBOARDS).pipe(
      map((dashboards: Dashboard[]) => dashboards.find(dashboard => dashboard.id === dashboardId)));
  }
}
