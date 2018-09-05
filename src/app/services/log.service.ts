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

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear = this.stateSource.asObservable();

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
    if (localStorage.getItem('logs')) {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a, b) => b.date - a.date));
  }

  addToLocalStorage() {
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  addLog(log: Log) {
    this.logs.unshift(log);

    // Add to local storage
    this.addToLocalStorage();
  }

  updateLog(log: Log) {
    this.logs.forEach((c, i) => {
      if (log.id === c.id) {
        this.logs.splice(i, 1);
      }
    });
    this.logs.unshift(log);

    // Update to local storage
    this.addToLocalStorage();
  }

  deleteLog(log: Log) {
    this.logs.forEach((c, i) => {
      if (log.id === c.id) {
        this.logs.splice(i, 1);
      }
    });

    // Delete from local storage
    this.addToLocalStorage();
  }
  clearState() {
    this.stateSource.next(true);
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }
}
