import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { CellService } from '../cell.service';
import { CellComponent } from '../cell/cell.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  @ViewChildren(CellComponent) cells: QueryList<CellComponent> | any;
  count = new Array(10);
  currentCell: CellComponent | null = null;
  steps: CellComponent[] = [];
  matchedCells = 0;

  constructor(public cellService: CellService) {}

  ngOnInit(): void {}

  matchCurrent(cell: CellComponent): void {
    cell.isAviable = false;
    cell.isMatched = true;
    if (this.currentCell) this.steps.push(this.currentCell);
    this.currentCell = cell;
    this.cells.map((c: CellComponent) => {
      this.cellService.checkAviable(c, this.currentCell);
    });
    this.matchedCells++;
    if (this.matchedCells > 0)
      this.cellService.checkFail(this.matchedCells, this.cells);
  }

  resetBoard(): void {
    this.cellService.resetCells(this.cells);
    this.currentCell = null;
    this.matchedCells = 0;
    this.steps = [];
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
