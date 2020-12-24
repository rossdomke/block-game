<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" /> -->
    <block-grid :block="GameBoard"></block-grid>
    <div class="game-pieces">
      <block-grid
        v-for="(piece, index) in PlayablePieces"
        :block="piece"
        :key="`playable-piece-${index}`"
      ></block-grid>
      <button @click="GeneratePieces">Gen</button>
    </div>
  </div>
</template>

<script lang="ts">
import colorGen from 'color-generator';
import { Component, Vue } from "vue-property-decorator";
import { Block, BlockCell, BlockFactory } from "./Types";
import BlockGrid from "./components/BlockGrid.vue";
function randColor() {
  return colorGen().hexString();
}

function GridGenerator(
  width: number,
  height: number,
  color: string = randColor()
): Block {
  const blockData: boolean[][] = [];
  for (let h = 0; h < height; h += 1) {
    blockData[h] = [];
    for (let w = 0; w < width; w += 1) {
      blockData[h][w] =  false;
    }
  }

  const block = new Block(blockData);
  block.emptyColor = color;
  return block;
}

@Component({
  components: {
    BlockGrid
  }
})
export default class App extends Vue {
  GameBoard: Block = GridGenerator(8, 8);
  MaxPieces = 10;
  PlayablePieces?: Block[] = [];
  created() {
    this.GeneratePieces();
  }
  GeneratePieces() {
    this.PlayablePieces = [];
    for (let p = 0; p < this.MaxPieces; p += 1) {
      const block = BlockFactory();
      block.filledColor = randColor();
      this.PlayablePieces.push(block);
    }
  }
}
</script>

<style lang="scss">
@import "./theme.scss";
</style>
