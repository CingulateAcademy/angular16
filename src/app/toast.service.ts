import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'danger';
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastsSignal = signal<Toast[]>([]);
  toasts = this.toastsSignal.asReadonly();

  private nextId = 0;

  show(message: string, type: 'success' | 'warning' | 'danger' = 'success') {
    const toast: Toast = {
      id: this.nextId++,
      message,
      type
    };

    this.toastsSignal.update(toasts => [...toasts, toast]);

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      this.remove(toast.id);
    }, 3000);
  }

  remove(id: number) {
    this.toastsSignal.update(toasts => toasts.filter(t => t.id !== id));
  }
}