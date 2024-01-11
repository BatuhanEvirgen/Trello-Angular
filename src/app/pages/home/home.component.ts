import { Component } from '@angular/core';
import { iData } from '../../interfaces/data';
import { LocalStorageService } from '../../local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent {
  
  constructor(private localstorage: LocalStorageService) {
    const _data = localstorage.getItem("exampleKey")
    if (_data) {
      this.data = JSON.parse(_data)
    }
  }

  data: iData[] = []

  addNewItem(item: iData) {
    this.data.push(item)
    this.setToLocalstorage()
  }

  deleteItem(item: string) {
    this.data = this.data.filter(el => el.id !== item)
    this.setToLocalstorage()
  }

  setToLocalstorage() {
    this.localstorage.setItem('exampleKey', JSON.stringify(this.data))
  }

  newUpdateItem(value: string, id: string) {
    const indeX = this.data.findIndex(item => item.id == id)
    if (this.data[indeX]) {
      this.data[indeX].description = value;
    }
  }

  removeFromLocalStorage(): void {
    this.localstorage.removeItem('exampleKey');
  }

  saveToLocaStorage(): void {
    this.localstorage.setItem('exampleKey', this.data)
  }
}
