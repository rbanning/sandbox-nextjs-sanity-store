export type StorageType = 'local' | 'session';

export class StorageService {
  private _storage: Storage;

  constructor(type: StorageType = 'local') {
    //need to do some checking...
    //StorageService is only for client

    if (!StorageService.isStorageAvailable(type)) {
      throw new Error('Unable to initialize StorageService.  Service is only for the client - not server (NodeJs)');
    }

    const key = StorageService.buildStorageName(type);
    this._storage = (window as any)[key];
  }


  getItem<T>(key: string): T | null {
    const data = this._storage.getItem(key);
    if (data) {
      return this.decode<T>(data);
    }
    //else
    return null;
  }

  setItem(key: string, value: any) {
    const data = this.encode(value);
    this._storage.setItem(key, data);
  }

  removeItem(key: string) {
    this._storage.removeItem(key);
  }

  clear() {
    this._storage.clear();
  }



  private encode(value: any): string {
    try {
      return this.toBase64(JSON.stringify(value));
    } catch (error) {
      console.warn("Error StorageService.encode()", error);
      throw new Error("Error in StorageService - unable to encode value");
    }
  }

  private decode<T>(value: string): T {
    try {
      return JSON.parse(this.fromBase64(value)) as T;
    } catch (error) {
      console.warn("Error StorageService.decode()", error);
      throw new Error("Error in StorageService - unable to decode value");
    }
  }

  private toBase64(value: string): string {
    return btoa(value);
  }
  private fromBase64(value: string): string {
    return atob(value);
  }

  private static buildStorageName(type: StorageType) {
    return `${type}Storage`;
  }
  static isStorageAvailable(type: StorageType = 'local') {
    const key = StorageService.buildStorageName(type);

    const safeWindow = typeof(window) === undefined ? {} : globalThis;

    return (('btoa' in safeWindow) && (key in safeWindow)) ;
  }
}