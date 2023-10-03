import { makeAutoObservable } from 'mobx';
import { ListItemType } from '../pages/Store'

class ItemsStore {
  items: ListItemType[] = [];

  constructor() {
    makeAutoObservable(this)
  }

  setItems = (newItems: ListItemType[]) => {
    this.items = newItems.slice();
  }

  addItem = (data: ListItemType) => {
    this.items.push({...data })
  }
  
  deleteItem = (id: number) => {
    this.items = this.items.filter(item => item.id !== id);
  }

}

export default  new ItemsStore();