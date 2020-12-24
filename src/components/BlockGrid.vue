<template>
  <div class="block-grid" @click="debug = !debug">
    <div class="block-row" v-for="(row, rIdx) in block.cells" :key="`${id}-block-row-${rIdx}`">
      <div 
        class="cell"
        v-for="(cell, cIdx) in row"
        :key="`${id}-block-cell-${rIdx}-${cIdx}`"
        :style="{'background-color': cell.filled ? cell.filledColor : cell.emptyColor }">
          <span 
            :style="{'background-color': cell.filledColor || blue}" v-if="debug">
              {{cell}}
          </span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {
    Component,
    Prop,
    Vue
  } from "vue-property-decorator";
  import {
    Block,
    BlockFactory,
    GuidFactory
  } from "../Types";

  @Component
  export default class BlockGrid extends Vue {
    debug = false;
    // private block: Block;
    id = "";
    mounted() {
      this.id = GuidFactory();
      // this.block = BlockFactory()
    }
    // @Prop() private 
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
    width: 75px;
    height: 75px;
    margin: 2px;
  }
</style>