import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  NotificationMessage,
  NotificationService
} from '../services/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  messages$: Observable<NotificationMessage[]> = this.notificationService.getMessages();

  constructor(private notificationService: NotificationService) {}

  dismiss(id: number): void {
    this.notificationService.dismiss(id);
  }

  trackByMessageId(index: number, message: NotificationMessage): number {
    return message.id;
  }
}
