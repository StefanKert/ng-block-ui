import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs/Rx';
import { BlockUIActions } from '../constants/block-ui-actions.constant';
import { BlockUIDefaultName } from '../constants/block-ui-default-name.constant';
import { NgBlockUI } from '../models/block-ui.model';


@Injectable()
export class BlockUIService {
  private blockUISubject: ReplaySubject<any> = new ReplaySubject();
  private blockUIObservable: Observable<any> = this.blockUISubject.asObservable();

  constructor() { }

  decorate(name: string = BlockUIDefaultName): NgBlockUI {
    return {
      start: this.dispatch(this.blockUISubject, BlockUIActions.START, name),
      stop: this.dispatch(this.blockUISubject, BlockUIActions.STOP, name),
      reset: this.dispatch(this.blockUISubject, BlockUIActions.RESET, name),
    } as NgBlockUI;
  }

  observe(): Observable<any> {
    return this.blockUIObservable;
  }

  private dispatch(subject: ReplaySubject<any>, action: BlockUIActions, name: string = BlockUIDefaultName): Function {
    return (message?: string): void => {
      subject.next({
        name,
        action,
        message
      });
    };
  }
}
