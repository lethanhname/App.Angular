import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../models/field.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, of, concat } from 'rxjs';
import { distinctUntilChanged, tap, switchMap, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;

  itemsBuffer = [];
  selectInput$ = new Subject<string>();
  recordsTotal = 0;
  pageSize = 10;
  loading = false;
  searchValue: string;
  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.itemsBuffer = [this.field.selectedItem];
    this.searchInit();
  }
  get({ skip = 0, searchValue }: { skip: number; searchValue: string; }): Observable<any> {
    const params = {};
    // params['Skip'] = skip.toString();

    const httpParams = new HttpParams().set('Skip', skip.toString())
    .set('Take', this.pageSize.toString())
    .set('OrderColumn', '')
    .set('SortDirection', 'asc')
    .set('Draw', '')
    .set('SearchValue', (searchValue === undefined || searchValue === null) ? '' : searchValue.toString());

    // tslint:disable-next-line:forin
    for (const key in params) {
      httpParams.set(key, params[key]);
      }

    return this.http.get(this.field.selectDataUrl, { params: httpParams });
  }

  onScrollToEnd() {
    if (this.itemsBuffer.length < this.recordsTotal) {
      this.fetchMore(this.searchValue);
    }
  }

  onScroll({ end }) {
    if (this.itemsBuffer.length === 1) {
      this.fetchMore('');
    }
  }

  private fetchMore(searhvalue) {
    const len = this.itemsBuffer.length;
    this.loading = true;

    this.get({ skip: len, searchValue: searhvalue }).subscribe(source => {
      this.itemsBuffer = this.itemsBuffer.concat(source.results);
      this.recordsTotal = source.recordsTotal;
      this.loading = false;
    });
  }

  private searchInit() {
    this.selectInput$.subscribe({
      next: (term) => this.search(term)
    });
  }
  private search(searhvalue) {
    this.loading = true;
    this.searchValue = searhvalue;
    this.get({ skip: 0, searchValue: searhvalue }).subscribe(source => {
      this.itemsBuffer = source.results;
      this.recordsTotal = source.recordsTotal;
      this.loading = false;
    });
  }

}
