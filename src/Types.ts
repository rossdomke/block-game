interface BlockCell {
  filledColor?: string;
  emptyColor?: string;
  highlightColor?: string;
  filled: boolean;
  foreignBlock?: boolean;
}

class Block {
  get width() {
    if (this.height > 0) return this.cells[0].length;
    return 0;
  }
  get height() {
    return (this.cells && this.cells.length) || 0;
  }
  
  private _filledColor?:string;
  get filledColor() {
    return this._filledColor || '';
  }
  set filledColor(color: string) {
    
    this._filledColor = color;
    this.ApplyToCells(cell => {
      cell.filledColor = color;
      return cell;
    });
  }

  private _emptyColor?:string;
  get emptyColor() {
    return this._emptyColor || '';
  }
  set emptyColor(color: string) {
    this._emptyColor = color;
    this.ApplyToCells(cell => {
      cell.emptyColor = color;
      return cell;
    });
  }

  private _highlightColor?:string;
  get highlightColor() {
    return this._highlightColor || '';
  }
  set highlightColor(color: string) {
    this._highlightColor = color;
    this.ApplyToCells(cell => {
      cell.highlightColor = color;
      return cell;
    });
  }

  constructor(cellData: boolean[][] = []) {
    this.cells = [];
    for (let h = 0; h < cellData.length; h += 1) {
      this.cells.push([]);
      for (let w = 0; w < cellData[h].length; w += 1){
        const cell:BlockCell = {filled: cellData[h][w]};
        this.cells[h].push(cell)
      }
    }
   
  }
  SetBackgroundColor(color?: string) {
    this.ApplyToCells(cell => {
      cell.emptyColor = color;
      return cell;
    });
  }
  SetHighlightColor(color?: string) {
    this.ApplyToCells(cell => {
      cell.highlightColor = color;
      return cell;
    });
  }

  ApplyToCells(apply: (cell: BlockCell) => BlockCell) {
    const newCells = this.cells;
    for (let h = 0; h < this.height; h += 1) {
      for (let w = 0; w < this.width; w += 1) {
        newCells[h][w] = apply(this.cells[h][w]);
      }
    }
    this.cells = newCells;
  }
  cells: BlockCell[][];
}

const shortL: boolean[][] = [
  [ true , false ],
  [true ,true ]
];

const shortBackwardsL: boolean[][] = [
  [false ,true ],
  [true ,true ]
];

const tallL: boolean[][] = [
  [true ,false ],
  [true ,false ],
  [true ,true ]
];

const tallBackwardsL: boolean[][] = [
  [false ,true ],
  [false ,true ],
  [true ,true ]
];

const BlockPrefabs = { shortL, shortBackwardsL, tallL, tallBackwardsL };

const BlockFactory = () => {
  const keys = Object.keys(BlockPrefabs);
  const idx = Math.floor(Math.random() * keys.length);
  const key = keys[idx];
  const prefab = BlockPrefabs[key as keyof typeof BlockPrefabs];
  return new Block(prefab);
};


const GuidFactory = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export { Block, BlockCell, BlockPrefabs, GuidFactory, BlockFactory };
