<template>
  <ul class="type-selector">
    <template
      v-for="(type, index) in typeList"
      :key="type[options.id]"
    >
      <li
        :class="{ active: getTypeActive(type) }"
        @click="changeType(type)"
      >
        {{ type[options.name] }}
      </li>
      <span
        v-if="index < typeList.length - 1"
        class="sp"
      />
    </template>
  </ul>
</template>

<script setup>
const props = defineProps({
  typeList: {
    type: Array,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({
      name: "name",
      id: "id",
    }),
  },
  currentType: {
    type: Object,
    required: true,
  },
});

const getTypeActive = type => {
  return type[props.options.id] === props.currentType[props.options.id];
};

const emits = defineEmits(["type-change", "update:current-type"]);

const changeType = type => {
  if (!getTypeActive(type)) {
    emits("update:current-type", type);
    emits("type-change", type);
  }
};
</script>

<style lang="less" scoped>
.type-selector {
  height: 30px;
  display: flex;
  align-items: center;
  font-size: 12.5px;
  li {
    height: 22px;
    line-height: 22px;
    border-radius: 11px;
    padding: 0 10px;
    color: #666666;
    &:hover {
      color: #333333;
    }
    &.active {
      background-color: #fcf6f5;
      color: #ac3c29;
    }
  }
  .sp {
    display: inline-block;
    width: 1px;
    height: 10px;
    background-color: #f2f2f2;
    margin: 5px;
  }
}
</style>
