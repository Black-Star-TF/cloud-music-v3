<template>
  <ul class="user-tab">
    <user-item
      v-for="user in data"
      :key="user.id"
      :user="user"
      :keywords="keywords"
    />
  </ul>
</template>

<script setup>
import UserItem from './UserItem.vue'
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
