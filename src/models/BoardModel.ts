import { CellModel } from './CellModel';
import { Labels } from './Labels';
import { FigureModel } from 'models/FigureModel';

class BoardModel {
    cells: CellModel[][] = [];
    cellsInRow = 8;

    createCells() {
        for (let i = 0; i < this.cellsInRow; i += 1) {
            const row: CellModel[] = [];

            for (let j = 0; j < this.cellsInRow; j += 1) {
                if ((i + j) % 2 !== 0) {
                    row.push(new CellModel(i, j, Labels.Dark, this)); // black
                } else {
                    row.push(new CellModel(i, j, Labels.Light, this)); // white
                }
            }
            this.cells.push(row);
        }
    }

    getCell(x: number, y: number): CellModel {
        return this.cells[y][x];
    }

    addFigures() {
        this.cells.forEach((row, rowIndex) => {
            row.forEach((cell, cellIndex) => {
                if (rowIndex <= 2 && cell.label === Labels.Dark) {
                    new FigureModel(Labels.Dark, this.getCell(cellIndex, rowIndex)); // add dark pieces to first 3 rows
                } else if (rowIndex >= this.cells.length - 3 && cell.label === Labels.Dark) {
                    new FigureModel(Labels.Light, this.getCell(cellIndex, rowIndex)); // add light pieces to last 3 rows
                }
            });
        });
    }
}

export { BoardModel };
