import { Component, inject } from '@angular/core';
import { ToastService } from './toast.service';

@Component({
  selector: 'app-toast',
  template: `
    <div class="toast-container">
      
        <div *ngFor="let toast of toasts()" class="toast" [ngClass]="toast.type">
         <span class="toast-icon">
            <ng-container *ngIf="toast.type === 'success'"> ✅ </ng-container>
            <ng-container *ngIf="toast.type === 'warning'"> ⚠️ </ng-container>
            <ng-container *ngIf="toast.type === 'danger'"> ❌ </ng-container>
        </span>

          <span class="toast-message">{{ toast.message }}</span>
          <button class="toast-close" (click)="remove(toast.id)">✕</button>
        </div>
      
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
      align-items: center;
    }
    .toast {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 20px;
      border-radius: 12px;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      min-width: 300px;
      max-width: 400px;
      font-weight: 500;
      animation: slideDown 0.3s ease;
    }
    .toast.success { background: #4caf50; color: white; }
    .toast.warning { background: #ff9800; color: white; }
    .toast.danger  { background: #f44336; color: white; }
    .toast-icon { font-size: 1.4rem; }
    .toast-message { flex: 1; }
    .toast-close {
      background: none;
      border: none;
      color: white;
      font-size: 1.2rem;
      cursor: pointer;
      opacity: 0.8;
    }
    .toast-close:hover { opacity: 1; }

    @keyframes slideDown {
      from { transform: translateY(-30px); opacity: 0; }
      to   { transform: translateY(0); opacity: 1; }
    }
  `]
})
export class ToastComponent {
  private toastService = inject(ToastService);
  toasts = this.toastService.toasts;

  remove(id: number) {
    this.toastService.remove(id);
  }
}