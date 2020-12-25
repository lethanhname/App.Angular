import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Vendor } from '../models/vendor.model';

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {

        return this.http.get<Product[]>('/api/ErpApi/Products');
    }

    getVendors(): Observable<Vendor[]> {

        return this.http.get<Vendor[]>('/api/ErpApi/Vendors');
    }
}
