interface BlockCell {
  color?: string;
  backgroundColor?: string;
  highlightColor?: string;
  filled: boolean;
}


class Block { 
  get width() {
    if(this.height > 0)
      return this.cells[0].length;
    return 0;
  }
  get height() {
    return (this.cells && this.cells.length) || 0;
  }

  constructor(cellData: BlockCell[][] = []){
    this.cells = cellData;
  }
  SetColor(color?: string) {
    this.ApplyToCells((cell, x, y) => {
      cell.color = color;
      return cell;
    });
  }
  SetBackgroundColor(color?: string) {
    this.ApplyToCells((cell, x, y) => {
      cell.backgroundColor = color;
      return cell;
    });
  }
  SetHighlightColor(color?: string) {
    this.ApplyToCells((cell, x, y) => {
      cell.backgroundColor = color;
      return cell;
    });
  }

  ApplyToCells(apply: (cell:BlockCell, x: number, y: number) => BlockCell){
    for (let h = 0; h < this.height; h += 1) {
      for (let w = 0; w < this.width; w += 1) {
        this.cells[h][w] = apply(this.cells[h][w], w, h);
      }
    }
  }
  cells:BlockCell[][];
}

  const shortL:BlockCell[][] = [
    [{filled: true},  {filled: false}],
    [{filled: true},  {filled: true}]
  ];
export { Block, BlockCell, shortL } 