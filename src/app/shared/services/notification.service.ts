import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface NotificationMessage {
  id: number;
  type: NotificationType;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly messagesSubject = new BehaviorSubject<NotificationMessage[]>([]);
  private nextId = 1;

  getMessages(): Observable<NotificationMessage[]> {
    return this.messagesSubject.asObservable();
  }

  showSuccess(message: string): void {
    this.addMessage('success', message);
  }

  showError(message: string): void {
    this.addMessage('error', message);
  }

  showInfo(message: string): void {
    this.addMessage('info', message);
  }

  showWarning(message: string): void {
    this.addMessage('warning', message);
  }

  dismiss(id: number): void {
    this.messagesSubject.next(
      this.messagesSubject.value.filter(message => message.id !== id)
    );
  }

  clear(): void {
    this.messagesSubject.next([]);
  }

  private addMessage(type: NotificationType, message: string): void {
    const notification: NotificationMessage = {
      id: this.nextId++,
      type,
      message
    };

    this.messagesSubject.next([...this.messagesSubject.value, notification]);
  }
}
