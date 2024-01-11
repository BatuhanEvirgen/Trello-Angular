import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { iData } from '../../interfaces/data';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrl: './model.component.scss'
})

export class ModelComponent {
  @Input() data!: iData[];
  @Input() type!: 'todo' | 'inprogress' | 'done';
  @Output() onAdd: EventEmitter<iData> = new EventEmitter()
  @Output() onDelete: EventEmitter<string> = new EventEmitter()
  @Output() onUpdate: EventEmitter<iData> = new EventEmitter()

  selectedItem: number = -1;
  showInput: boolean = false;
  title = {
    todo: "Yapılacak",
    inprogress: "Yapılıyor",
    done: "Bitti"
  }

  getItems() {
    return this.data.filter(el => el.type == this.type)
  }

  enableEditing(i: number) {
    this.selectedItem = i
  }

  addItem(value: string) {
    if (value) {
      this.onAdd.emit({
        id: Date.now().toString(),
        description: value,
        type: this.type
      })
    }
  }

  updateItem(value: string, id: string) {
    if (value) {
      this.onUpdate.emit({
        id: id,
        description: value,
        type: this.type
      })
    }
    setTimeout(() => { this.selectedItem = -1 }, 10)
  }

  removeItem(id: string) {
    this.onDelete.emit(id);
  }

}
