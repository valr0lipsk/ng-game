import {
  Component,
  QueryList,
  ChangeDetectionStrategy,
  ViewChildren,
} from '@angular/core';
import { CellService } from '../cell.service';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent {
  @ViewChildren(CellComponent) cells!: QueryList<CellComponent>;
  count = new Array(10);
  currentCell: CellComponent | null = null;
  steps: CellComponent[] = [];
  matchedCells = 0;
  modal = { isShowing: false, isWin: false };

  constructor(public cellService: CellService) {}

  matchCurrent(cell: CellComponent): void {
    cell.isAviable = false;
    if (this.currentCell) this.currentCell.isMatched = true;
    const current = this.cells.find((cell) => cell.isCurrent === true);
    if (current) current.isCurrent = false;
    if (this.currentCell) this.steps.push(this.currentCell);
    {
      cell.isCurrent = true;
      this.currentCell = cell;
    }
    this.cells.map((c: CellComponent) => {
      this.cellService.checkAviable(c, this.currentCell);
    });
    this.matchedCells++;
    if (this.matchedCells > 0) {
      if (this.cellService.checkWin(this.matchedCells, this.cells) === true) {
        this.modal.isShowing = true;
        this.modal.isWin = true;
      } else if (
        this.cellService.checkWin(this.matchedCells, this.cells) === false
      ) {
        this.modal.isShowing = true;
        this.modal.isWin = false;
      }
    }
  }

  resetBoard(): void {
    this.cellService.resetCells(this.cells);
    this.currentCell = null;
    this.matchedCells = 0;
    this.steps = [];
    this.modal.isShowing = false;
  }

  stepBack(): void {
    if (this.currentCell && this.matchedCells >= 0) {
      this.cellService.resetCell(this.currentCell);
      this.currentCell = this.steps[this.steps.length - 1];
      this.steps.pop();
      this.cells.map((c: CellComponent) => {
        this.cellService.checkAviable(c, this.currentCell);
      });
      this.matchedCells--;
      if (this.matchedCells === 0) {
        this.cellService.resetCells(this.cells);
      }
    }
  }
}
