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
import { Component, Vue } from "vue-property-decorator";
import { Block, BlockCell, shortL } from "./Types";
import BlockGrid from "./components/BlockGrid.vue";
function randColor() {
  return "#" + ((Math.random() * 0xffffff) << 0).toString(16);
}
function GridGenerator(
  width: number,
  height: number,
  color: string = randColor()
): Block {
  const blockData: BlockCell[][] = [];
  for (let h = 0; h < height; h += 1) {
    blockData[h] = [];
    for (let w = 0; w < width; w += 1) {
      blockData[h][w] = { backgroundColor: color, filled: false };
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
  GeneratePieces() {
    this.PlayablePieces = [];
    for (let p = 0; p < this.MaxPieces; p += 1) {
      this.PlayablePieces[p] = new Block(shortL);
      this.PlayablePieces[p].SetColor(randColor());
      this.PlayablePieces[p].SetBackgroundColor();
    }
  }
}
</script>

<style lang="scss">
@import "./theme.scss";
</style>
