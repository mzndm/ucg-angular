import { Injectable } from '@angular/core';
import {IMessage} from "../core/models";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message$ = new BehaviorSubject<IMessage | null>(null);

  showMessage(message: IMessage): void {
    this.message$.next(message);
    setTimeout(() => this.message$.next(null), 5000);
  }
}
