<template>
  <div class="radio-tab">
    <radio-item
      v-for="radio in data"
      :key="radio.id"
      :radio="radio"
      :keywords="keywords"
    />
  </div>
</template>

<script setup>
import RadioItem from './RadioItem.vue'
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  keywords: {
    type: String,
    default: ''
  }
})
</script>

<style lang="less" scoped>

</style>
