import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Utils } from '../../assets/helpers/utils';

@Injectable()
export class CEPService {

    constructor(private http: HttpClient) { }

    public getCEP(cepNumber: number): Promise<object> {
        return this.http.get(`${Utils.urlCEPService}${cepNumber}/json`).toPromise();
    }

    public getCEP2(cepNumber: number): Promise<object> {
        return this.http.get(`${Utils.urlCEPService2}${cepNumber}/&formato=json`).toPromise();
    }
}