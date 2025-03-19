import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class StorageService {
  public get<T>(storageName: string): T | null {
    const value = localStorage.getItem(storageName);
    if(!value) {
      return null;
    }
    return value as unknown as T;
  }

  public set(storageName: string, value: string): void {
    localStorage.setItem(storageName, value);
  }

  public remove(storageName: string) {
    localStorage.removeItem(storageName);
  }

  public clearAll() {
    localStorage.clear();
  }
}