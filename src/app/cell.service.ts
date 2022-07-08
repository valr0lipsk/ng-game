import { Injectable, QueryList } from '@angular/core';
import { CellComponent } from './cell/cell.component';

@Injectable({
  providedIn: 'root',
})
export class CellService {
  constructor() {}

  checkAviable(
    targerCell: CellComponent,
    currentCell: CellComponent | null
  ): void {
    if (targerCell.isMatched) return;
    if (currentCell === null || !currentCell) {
      return;
    } else {
      const absX = Math.abs(currentCell.x - targerCell.x);
      const absY = Math.abs(currentCell.y - targerCell.y);
      if ((absX === 1 && absY === 2) || (absX === 2 && absY === 1)) {
        targerCell.isAviable = true;
      } else {
        targerCell.isAviable = false;
      }
    }
  }

  resetCell(currentCell: CellComponent): void {
    currentCell.isMatched = false;
    currentCell.isAviable = false;
    currentCell.value = 0;
  }

  resetCells(cells: QueryList<CellComponent>): void {
    cells.forEach((cell) => {
      cell.isAviable = false;
      cell.isMatched = false;
    });
  }

  checkFail(matchedCells: number, cells: QueryList<CellComponent>): void {
    if (matchedCells < 100 && !cells.find((cell) => cell.isAviable === true)) {
      alert('You lost!');
    } else if (matchedCells === 100) alert('You win!!');
  }
}
