<template>
  <div
    class="block-grid"
    draggable
    @dragstart="dragPiece($event, block)"
    @dragover.prevent
    @dragenter.prevent
  >
    <div
      class="block-row"
      v-for="(row, rIdx) in block.cells"
      :key="`${id}-block-row-${rIdx}`"
    >
      <div
        class="cell"
        v-for="(cell, cIdx) in row"
        :key="`${id}-block-cell-${rIdx}-${cIdx}`"
        :style="{
          'background-color': cell.filled
            ? cell.fillColor
            : cell.highlighted
            ? cell.highlightColor
            : cell.emptyColor
        }"
        @drop="pieceDroped($event, rIdx, cIdx)"
        @dragover="pieceHover($event, rIdx, cIdx)"
        @dragleave.prevent
      >
        <span v-if="debug">
          {{ cell }}
        </span>
      </div>
    </div>
    <div v-if="debug">
      <pre>
      {{ block }}
      </pre>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Block, GuidFactory } from "../Block";

@Component
export default class BlockGrid extends Vue {
  debug = false;
  id = "";
  mounted() {
    this.id = GuidFactory();
  }
  @Prop() private block!: Block;
  dragPiece(event: DragEvent) {
    event.dataTransfer.dropEffect = "move";
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("blockId", this.id);
    event.dataTransfer.setData("block-data", JSON.stringify(this.block));
    console.log("Dragging piece ", event, this.block);
  }
  pieceDroped(event: DragEvent, x: number, y: number) {
    console.log(
      "Pieced dropped",
      event.dataTransfer.getData("blockId"),
      event.dataTransfer.getData("block-data"),
      x,
      y
    );
  }
  pieceHover(event: DragEvent, x: number, y: number) {
    this.block.applyToCells(cell => {
      cell.highlighted = false;
      return cell;
    });
    this.block.cells[x][y].highlighted = true;
    this.block.cells[x][y].highlightColor = "#00FF00";
    //var newPiece = JSON.parse(event.dataTransfer.getData("block-data"));
    console.log(
      "Pieced Hover",
      event.dataTransfer.getData("blockId"),
      event.dataTransfer.getData("block-data"),
      x,
      y
    );
  }
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
  width: 75px;
  height: 75px;
  margin: 2px;
}
</style>
