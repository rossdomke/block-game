<template>
  <div id="app">
    <block-grid :block="GameBoard"></block-grid>
    <div class="game-pieces">
      <block-grid
        v-for="(piece, index) in PlayablePieces"
        :block="piece"
        :key="`playable-piece-${index}`"
        @click.shift.native="piece.rotate()"
        @click.ctrl.native="piece.mirror()"
        @click.alt.native="$set(piece, 'fillColor', randomColor())"
      ></block-grid>
      <button @click="GeneratePieces">Gen</button>
    </div>
  </div>
</template>

<script lang="ts">
import colorGen from "color-generator";
import { Component, Vue } from "vue-property-decorator";
import { Block, BlockCell, BlockFactory } from "./Block";
import BlockGrid from "./components/BlockGrid.vue";
function GridGenerator(
  width: number,
  height: number,
  color: string = colorGen().hexString(),
): Block {
  const blockData: BlockCell[][] = [];
  for (let h = 0; h < height; h += 1) {
    blockData[h] = [];
    for (let w = 0; w < width; w += 1) {
      blockData[h][w] = { emptyColor: color, filled: false };
    }
  }
  const block = new Block(blockData);
  return block;
}

@Component({
  components: {
    BlockGrid
  }
})
export default class App extends Vue {
  GameBoard: Block = GridGenerator(8, 8);
  MaxPieces = 3;
  PlayablePieces?: Block[] = [];
  created() {
    this.GeneratePieces();
  }
  randomColor() {
    return colorGen().hexString();
  }
  GeneratePieces() {
    this.PlayablePieces = [];
    for (let p = 0; p < this.MaxPieces; p += 1) {
      Vue.set(this.PlayablePieces, p, BlockFactory());
      Vue.set(this.PlayablePieces[p], 'fillColor', this.randomColor());
      // this.PlayablePieces[p] = BlockFactory();
      // this.PlayablePieces[p].fillColor = this.randomColor();
      this.PlayablePieces[p].emptyColor = '';
    }
  }
}
</script>

<style lang="scss">
@import "./theme.scss";
</style>
