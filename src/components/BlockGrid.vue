<template>
  <div class="block-grid">
    <div class="block-row" v-for="(row, rIdx) in block.cells" :key="`${id}-block-row-${rIdx}`">
      <div 
        class="cell"
        v-for="(cell, cIdx) in row"
        :key="`${id}-block-cell-${rIdx}-${cIdx}`"
        :style="{'background-color': cell.filled ? cell.fillColor : cell.emptyColor }">
          <span 
            v-if="debug">
              {{cell}}
          </span>
      </div>
    </div>
    <div v-if="debug">
      <pre>
      {{block}}
      </pre>
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

    GuidFactory
  } from "../Block";

  @Component
  export default class BlockGrid extends Vue {
    debug = false;
    id = "";
    mounted() {
      this.id = GuidFactory();
    }
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