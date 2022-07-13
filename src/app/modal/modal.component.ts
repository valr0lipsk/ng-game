import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() isWin!: boolean;
  @Input() isShowing = false;

  constructor(private board: BoardComponent) {}

  ngOnInit(): void {}

  onClick() {
    this.isShowing = false;
  }

  onReset() {
    this.board.resetBoard();
  }
}
