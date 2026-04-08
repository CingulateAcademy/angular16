import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly platformId = inject(PLATFORM_ID);

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  setItem<T>(key: string, value: T): void {
    if (!this.isBrowser()) return;
    try {
      const jsonValue = JSON.stringify(value);
      localStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(`Error saving to localStorage key "${key}":`, error);
    }
  }

  getItem<T>(key: string, defaultValue: T): T {
    if (!this.isBrowser()) return defaultValue;
    try {
      const item = localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error);
      return defaultValue;
    }
  }

  removeItem(key: string): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  }

  clear(): void {
    if (!this.isBrowser()) return;
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}