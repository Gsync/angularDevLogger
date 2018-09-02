import { Injectable } from '@angular/core';
import { Log } from '../models/log';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];
  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null
  });

  selectedLog = this.logSource.asObservable();

  constructor() {
    this.logs = [
      {
        id: '1',
        text: 'Generated Components',
        date: new Date('01/09/2018 14:38:00')
      },
      {
        id: '2',
        text: 'Configured the settings',
        date: new Date('01/09/2018 14:38:00')
      },
      {
        id: '3',
        text: 'Created the forms',
        date: new Date('01/09/2018 14:38:00')
      },
      {
        id: '4',
        text: 'Deployed first version',
        date: new Date('08/21/2018 12:38:00')
      }
    ];
  }

  getLogs(): Observable<Log[]> {
    return of(this.logs);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }
}
