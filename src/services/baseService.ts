export class LocalStorageService<T extends { id: string }> {
  private key: string;
  constructor(key: string) { this.key = key; }
  getAll(): T[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.key);
    return data ? JSON.parse(data) : [];
  }
  getById(id: string): T | undefined {
    return this.getAll().find(item => item.id === id);
  }
  create(item: T): T {
    const items = this.getAll();
    items.push(item);
    localStorage.setItem(this.key, JSON.stringify(items));
    return item;
  }
  update(id: string, updates: Partial<T>): T | undefined {
    let items = this.getAll();
    let updatedItem: T | undefined;
    items = items.map(item => {
      if (item.id === id) {
        updatedItem = { ...item, ...updates };
        return updatedItem;
      }
      return item;
    });
    if (updatedItem) {
      localStorage.setItem(this.key, JSON.stringify(items));
    }
    return updatedItem;
  }
  delete(id: string): boolean {
    const items = this.getAll();
    const newItems = items.filter(item => item.id !== id);
    if (items.length !== newItems.length) {
      localStorage.setItem(this.key, JSON.stringify(newItems));
      return true;
    }
    return false;
  }
  seed(items: T[]) {
    if (typeof window === 'undefined') return;
    if (!localStorage.getItem(this.key)) {
      localStorage.setItem(this.key, JSON.stringify(items));
    }
  }
}
