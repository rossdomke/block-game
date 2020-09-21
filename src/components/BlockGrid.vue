<template>
  <div class="block-grid" draggable>
    <div
      class="block-row"
      v-for="(row, rIdx) in block.cells"
      :key="`block-row-${rIdx}`"
    >
      <div
        class="cell"
        v-for="(cell, cIdx) in row"
        :key="`block-cell-${rIdx}-${cIdx}`"
        :style="{
          'background-color': cell.filled ? cell.color : cell.backgroundColor
        }"
      ></div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Block } from "../Types";

@Component
export default class BlockGrid extends Vue {
  @Prop() private block!: Block;
}
</script>

<style scoped lang="scss">
.block-grid {
  display: inline-block;
}
.block-row {
  display: flex;
  margin: 0px;
  padding: 0px;
}
.cell {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin: 2px;
}
</style>
