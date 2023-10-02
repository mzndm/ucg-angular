import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, of, switchMap, tap} from "rxjs";
import {IUser, MessageType} from "../core/models";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiBasePath = 'http://localhost:3000';
  users$ = new BehaviorSubject<IUser[]>([]);

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiBasePath}/users`)
      .pipe(
        tap(value => this.users$.next(value)),
        switchMap(() => this.users$.asObservable()),
        catchError(err => {
          this.messageService.showMessage({
            type: MessageType.ERROR,
            text: `${err.status}: ${err.statusText}`
          })
          return of([])
        })
      );
  }

  getUser(id: string): Observable<IUser | null> {
    return this.http.get<IUser>(`${this.apiBasePath}/users/${id}`)
      .pipe(
        catchError(err => {
          this.messageService.showMessage({
            type: MessageType.ERROR,
            text: `${err.status}: ${err.statusText}`
          })
          return of(null)
        })
      )
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

  checkIfUsernameExists(value: string, userId: string | undefined | null): Observable<boolean> {
    return of(this.users$.value.some(u => u.username === value && u.id !== userId) as boolean);
  }
}
