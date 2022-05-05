
<template>
  <ul class="area-selector">
    <li
      v-for="area in areaList"
      :key="area.id"
      :class="{ active: isActive(area.id) }"
      class="area-item"
      @click="changeArea(area.id)"
    >
      {{ area.name }}
    </li>
  </ul>
</template>

<script setup>
const props = defineProps({
  areaList: {
    type: Array,
    required: true,
  },
  currentArea: {
    type: String,
    required: true,
  },
});

const isActive =  area => {
  return area === props.currentArea;
};
const emits = defineEmits(['area-change', 'update:current-area']);

const changeArea = area => {
  if(isActive(area)) return;
  emits('update:current-area', area);
  emits('area-change', area);
};
</script>

<style lang="less" scoped>
.area-selector {
    height: 30px;
    display: flex;
    align-items: center;
    font-size: 14px;
    .area-item {
      margin-right: 30px;
      height: 20px;
      line-height: 20px;
      color: #666;
      cursor: pointer;
      &:hover {
        color: #000;
      }
      &.active {
        color: #000;
        font-weight: 500;
      }
    }
  }
</style>
