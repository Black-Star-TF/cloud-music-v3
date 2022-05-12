<template>
  <div class="subscriber-tab">
    <ul class="list-wrapper">
      <subscriber-item
        v-for="(subscriber, index) in list"
        :key="subscriber.id"
        :index="index+1"
        :subscriber="subscriber"
        :column="column"
      ></subscriber-item>
    </ul>
    <common-loading v-if="loading" />
  </div>
</template>

<script setup>
import SubscriberItem from '@/views/playlist-detail/components/SubscriberItem.vue';
import useData from './index';
const props = defineProps({
  id: {
    type: [Number, String],
    required: true,
  }
});
const {
  loading,
  list,
  column,
} = useData(props.id);
</script>

<style lang="less" scoped>
.subscriber-tab {
  padding: 0 30px;
  .list-wrapper {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
