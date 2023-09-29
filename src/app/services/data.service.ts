import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IUser} from "../core/models";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiBasePath = 'http://localhost:3000';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiBasePath}/users`);
  }
}
