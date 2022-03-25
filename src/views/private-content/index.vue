<template>
  <div
    ref="wrapper"
    class="private-content-wrapper"
  >
    <ul class="page-box">
      <private-content-item
        v-for="(privateContent, index) in privateContentList"
        :key="privateContent.id"
        :private-content="privateContent"
        :column="column"
        :index="index + 1"
      />
    </ul>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { getPrivateContentList } from "@/api/video";
import { useFetchMore, useColumn } from "@/hooks";
import PrivateContentItem from './components/PrivateContentItem.vue'

let column = useColumn(1060, 4, 2)
let privateContentList = reactive([]);
let loading = ref(true);
let limit = 40;
let offset = ref(0);
let hasMore = ref(true);
const getPrivateContentData = async () => {
  loading.value = true;
  const { result, more } = await getPrivateContentList({
    limit,
    offset: offset.value,
  });
  privateContentList.push(...result);
  loading.value = false;
  hasMore.value = more;
};

const wrapper = useFetchMore(
  getPrivateContentData,
  loading,
  hasMore,
  () => (offset.value += limit)
);
getPrivateContentData()
</script>

<style lang="less" scoped>
.private-content-wrapper {
  height: 100%;
  overflow: overlay;
  box-sizing: border-box;
  padding: 15px 0;
  .page-box {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
