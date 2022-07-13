import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CellComponent {
  @Input() x = 0;
  @Input() y = 0;
  @Input() matchedCells!: number;
  value = 0;
  isMatched = false;
  isAviable = false;
  isCurrent = false;
  @Output() setCurrent = new EventEmitter<CellComponent>();

  constructor() {}

  matchCell(cell: CellComponent): void {
    if (
      (!this.isMatched && this.isAviable) ||
      (!this.isMatched && this.matchedCells === 0)
    ) {
      this.value = this.matchedCells + 1;
      this.setCurrent.emit(cell);
    }
  }

  ngOnDestroy() {}
}
