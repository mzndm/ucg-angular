import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, of, switchMap, tap} from "rxjs";
import {IUser} from "../core/models";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiBasePath = 'http://localhost:3000';
  users$ = new BehaviorSubject<IUser[]>([]);
  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiBasePath}/users`)
      .pipe(
        tap(value => this.users$.next(value)),
        switchMap(() => this.users$.asObservable())
      );
  }

  getUser(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiBasePath}/users/${id}`);
  }

  saveUser(user: IUser): Observable<IUser[]> {
    return this.http.post(`${this.apiBasePath}/users`, user)
      .pipe(switchMap(() => this.getUsers()));
  }

  updateUser(user: IUser): Observable<IUser[]> {
    return this.http.put(`${this.apiBasePath}/users/${user.id}`, user)
      .pipe(switchMap(() => this.getUsers()));
  }

  deleteUser(userId: string): Observable<IUser[]> {
    return this.http.delete(`${this.apiBasePath}/users/${userId}`)
      .pipe(switchMap(() => this.getUsers()));
  }

  checkIfUsernameExists(value: string): Observable<boolean> {
    return of(this.users$.value.some(u => u.username === value) as boolean);
  }
}
