<template>
  <div
    v-show="visible"
    class="panel"
    @click.stop
  >
    <div class="panel-header">
      <span
        :class="{ active: getActive(categories.all) }"
        @click="changeCategory(categories.all)"
      >
        {{ categories.all.name }}
      </span>
    </div>
    <div class="panel-main">
      <div
        v-for="(value, key) in categories.types"
        :key="key"
        class="type"
      >
        <div class="type-name">
          {{ value }}
        </div>
        <ul class="type-list">
          <li
            v-for="item in getTags(key)"
            :key="item.name"
            class="tag"
          >
            <span
              :class="{ active: getActive(item) }"
              @click="changeCategory(item)"
            >{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { watch, ref, reactive } from "vue";
const props = defineProps({
  categories: {
    type: Object,
    required: true,
  },
  visible: {
    type: Boolean,
    required: true,
  },
  currentCategory: {
    type: Object,
    required: true,
  },
});

const flag = ref(false);
const emits = defineEmits([
  "update:current-category",
  "category-change",
  "update:visible",
]);

const close = () => {
  if (flag.value) {
    flag.value = false;
    return;
  }
  emits("update:visible", false);
};

watch(
  () => props.visible,
  val => {
    if (val) {
      flag.value = true;
      window.addEventListener("click", close);
    } else {
      window.removeEventListener("click", close);
    }
  }
);

const getActive = category => {
  return category.name == props.currentCategory.name;
};

const changeCategory = category => {
  if (!getActive(category)) {
    emits("update:current-category", category);
    emits("category-change", category);
  }
  close();
};

// 获取分类下的歌单类型列表
const getTags = type => {
  return props.categories.sub.filter(item => item.category == type);
};
</script>

<style lang="less" scoped>
.panel {
  width: 750px;
  background-color: #fff;
  box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 500;
  &-header {
    height: 55px;
    line-height: 55px;
    padding-left: 20px;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
    span {
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 15px;
      padding: 0 15px;
      &:hover {
        color: #c3473a;
      }
      &.active {
        color: #c3473a;
        background-color: #fcf6f5;
      }
    }
  }
  &-main {
    padding-top: 15px;
    .type {
      line-height: 30px;
      display: flex;
      font-size: 13px;
      margin-bottom: 10px;
      &-name {
        width: 100px;
        padding-left: 20px;
        color: #bbb;
      }
      &-list {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        color: #333;
        margin-bottom: 10px;
        .tag {
          width: 105px;
          span {
            display: inline-block;
            height: 30px;
            border-radius: 15px;
            padding: 0 15px;
            margin-bottom: 10px;
            cursor: pointer;
            &:hover {
              color: #c3473a;
            }
            &.active {
              color: #c3473a;
              background-color: #fcf6f5;
            }
          }
        }
      }
    }
  }
}
</style>
