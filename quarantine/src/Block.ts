import Vue from 'vue'
import * as BlockPrefabs from './BlockPrefabs';

interface BlockCell {
  fillColor?: string;
  emptyColor?: string;
  highlightColor?: string;
  filled: boolean;
  highlighted?: boolean;
  foreignBlock?: boolean;
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
    
    const cells:BlockCell[][] = []
    for(let r = 0; r < cellData.length; r += 1){
      cells.push([]);
      for(let c = 0; c < cellData[r].length; c += 1){
        cells[r].push({...cellData[r][c]})
      }
      
    }
    this.cells = cells;
    
  }
  private _fillColor?:string;
  get fillColor() {
    return this._fillColor || '';
  }
  set fillColor(color: string) {
    this._fillColor = color;
    this.applyToCells(cell => {
      cell.fillColor = color;
      return cell;
    });
  }
 
  private _emptyColor?:string;
  get emptyColor() {
    return this._emptyColor || '';
  }
  set emptyColor(color: string) {
    console.log(color, 'why');
    this._emptyColor = color;
    this.applyToCells(cell => {
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
    this.applyToCells(cell => {
      cell.highlightColor = color;
      return cell;
    });
  }

  public rotate() {
    const w = this.width;
    const h = this.height;
    const newCellData:BlockCell[][] = [];    
    for (let c = 0; c < w; c += 1) {
      newCellData.push([]);
      for(let r = h - 1; r >= 0; r -= 1) {
        newCellData[c].push(this.cells[r][c])
      };
    };
    Vue.set(this, 'cells', newCellData);
  }

  public mirror() {
    const w = this.width;
    const h = this.height;
    const newCellData:BlockCell[][] = [];    
    for(let r = 0; r < h; r += 1) {
      newCellData.push([]);
      for (let c = w - 1; c >= 0; c -= 1) {
        newCellData[r].push(this.cells[r][c])
      };
    };
    Vue.set(this, 'cells', newCellData);
  }


  applyToCells(apply: (cell:BlockCell) => BlockCell){
    const tempCells = this.cells;
    for (let h = 0; h < this.height; h += 1) {
      for (let w = 0; w < this.width; w += 1) {
        tempCells[h][w] = apply(tempCells[h][w]);
      }
    }
    Vue.set(this, 'cells', tempCells);
  }
  cells:BlockCell[][];
}



const BlockFactory = () => {
  const keys = Object.keys(BlockPrefabs);
  const idx = Math.floor(Math.random() * keys.length);
  const key = keys[idx];
  const prefab = BlockPrefabs[key as keyof typeof BlockPrefabs];
  const block = new Block(prefab);
  const rotateTimes = Math.floor(Math.random() * 4)
  for(let x = 0; x < rotateTimes; x += 1) {
    block.rotate();
  }
  if(Math.floor(Math.random() * 2) === 1){
    block.mirror();
  }
  return block;
};


const GuidFactory = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export { Block, BlockCell, GuidFactory, BlockFactory } 