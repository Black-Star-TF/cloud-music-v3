<template>
  <div class="category-selector">
    <div
      v-for="category in data"
      :key="category[options.key]"
      class="category-item"
    >
      <div class="category-name">
        {{ category[options.label] }}
      </div>
      <ul class="category-tags">
        <template
          v-for="(item,index) in category[options.children]"
          :key="item[options.itemId]"
        >
          <span
            class="tag"
            :style="{width: `${tagWidth}px`}"
            :class="{active: currentCategory[category[options.key]] === item[options.itemId]}"
            @click="changeCategory({[category[options.key]]: item[options.itemId]})"
          >{{ item[options.itemName] }}</span>
          <i
            v-if="index < category[options.children].length - 1"
            class="sp"
          />
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {toRefs} from 'vue';
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  options: {
    type: Object,
    default: () => ({
      key: 'key',
      label: 'label',
      children: 'children',
      itemId: 'id',
      itemName: 'name'
    })
  },
  currentCategory: {
    type: Object,
    required: true,
  },
  tagWidth: {
    type: String,
    default: '50'
  }
});

const emits = defineEmits(['category-change', 'update:current-category']);

const changeCategory = (params) => {
  emits('update:current-category', {...props.currentCategory, ...params});
  emits('category-change', {...props.currentCategory, ...params});
};
</script>

<style lang="less" scoped>
.category-selector{
  font-size: 12.5px;
  // overflow: hidden;
    .category-item{
      display: flex;
      .category-name{
        height: 20px;
        line-height: 20px;
        color: #333;
        margin-right: 5px;
      }
      .category-tags{
        flex: 1;
        line-height: 20px;
        display: flex;
        flex-wrap: wrap;
        .tag{
          height: 20px;
          color: #666;
          line-height: 20px;
          text-align: center;
          border-radius: 10px;
          cursor: pointer;
          margin: 0 5px;
          margin-bottom: 10px;
          &:hover{
            color: #333;
          }
          &.active{
            background-color: #fcf6f5;
            color: #c3473a;
          }
        }
        .sp{
          float: left;
          width: 1px;
          height: 12px;
          background-color: #f2f2f2;
          margin-top: 4px;
        }
      }
    }
}
</style>
