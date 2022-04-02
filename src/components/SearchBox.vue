<template>
  <div class="search-box">
    <span class="prefix" />
    <input
      data-name="search-box"
      type="text"
      :value="value"
      placeholder="搜索"
      @click="handleFocus"
      @input="handleInput"
      @keydown.enter="handleSearch"
    >
    <span class="suffix" />
  </div>
</template>

<script setup>
const props = defineProps({
  value: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["update:value", "search", "focus"]);

const handleInput = e => {
  emits("update:value", e.target.value);
};

const handleSearch = () => {
  if(props.value == '') return
  emits("search");
};

const handleFocus = () => {
  emits("focus");
};

</script>

<style lang="less" scoped>
.search-box {
  width: 150px;
  height: 26px;
  border-radius: 13px;
  background-color: #eee;
  padding: 0 25px;
  box-sizing: border-box;
  cursor: text;
  input {
    width: 100px;
    height: 20px;
    line-height: 20px;
    color: #444;
    border: none;
    outline: none;
    background: none;
    &::-webkit-input-placeholder {
      font-size: 12px;
      color: #bbb;
      position: relative;
      top: 1px;
    }
    &:-moz-placeholder {
      font-size: 12px;
      color: #bbb;
      position: relative;
    }
    &::-moz-placeholder {
      font-size: 12px;
      color: #bbb;
      position: relative;
    }
    &:-ms-input-placeholder {
      font-size: 12px;
      color: #bbb;
      position: relative;
    }
    &:focus {
      &::-webkit-input-placeholder {
        color: transparent;
      }
      &:-moz-placeholder {
        color: transparent;
      }
      &::-moz-placeholder {
        color: transparent;
      }
      &:-ms-input-placeholder {
        color: transparent;
      }
    }
  }
}
</style>
