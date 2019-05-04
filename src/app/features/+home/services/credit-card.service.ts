import { ICreditCard } from './../models/credit-card.interface';
import { AppSettings } from './../../../core/settings';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class CreditCardService {

    constructor(private http: HttpClient) { }

    public getAll(): Observable<ICreditCard[]> {
      return this.http.get<ICreditCard[]>(`${AppSettings.apiHost}/CreditCard`);
    }

    public createCard(card: ICreditCard): Observable<ICreditCard> {
      return this.http.post<ICreditCard>(`${AppSettings.apiHost}/CreditCard`, card);
    }
}
