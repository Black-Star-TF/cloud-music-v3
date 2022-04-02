<template>
  <div class="tab-selector">
    <div
      v-for="tab in tabs"
      :key="tab[options.id]"
      class="tab-item"
      :class="{ active: tab[options.id] == currentTab[options.id] }"
      @click="changeTab(tab)"
    >
      {{ tab[options.label] }}
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  tabs: {
    type: Array,
    required: true
  },
  currentTab: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({
      id: 'id',
      label: 'label'
    })
  }
})
const emits = defineEmits(['tab-change', 'update:current-tab'])
const changeTab = tab => {
  emits('update:current-tab', tab)
  emits('tab-change', tab)
}
</script>

<style lang="less" scoped>
.tab-selector{
  height: 30px;
  width: 100%;
  border-bottom: 1px solid #f2f2f2;
  .tab-item{
    display: inline-block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin-right: 30px;
    color: #333;
    position: relative;
    &:hover{
      color: #000;
    }
    &.active{
      color: #c3473a;
      font-weight: 500;
      &::after{
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 2px;
        bottom: -1px;
        left: 0;
        background-color: #c3473a;
      }
    }
  }
}
</style>
