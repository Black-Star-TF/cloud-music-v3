<template>
  <div class="app-header">
    <div class="left" />
    <header-nav
      v-if="hasChildren"
      :sub-nav-list="subNavList"
    />
    <header-title v-else-if="title">
      {{ title }}
    </header-title>
    <div class="right">
      <!-- 搜索框 -->
      <search-box
        v-model:value="keywords"
        @search="handleSearch"
        @focus="handleFocus"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex"
import SearchBox from "@/components/SearchBox.vue";
import HeaderTitle from "@/components/nav/HeaderTitle.vue";
import HeaderNav from "@/components/nav/HeaderNav.vue";
import subNavDisc from "@/common/config/sub-nav-disc";
const route = useRoute();
const router = useRouter()
const store = useStore()

const hasChildren = computed(() => !!route.meta.hasChildren);
const title = computed(() => route.meta.title ?? "");
const subNavList = computed(() => {
  if (hasChildren.value) {
    return subNavDisc[route.matched[1].path];
  } else {
    return [];
  }
});

let keywords = computed({
  get: () => store.state.app.keywords,
  set: val => store.commit('app/setKeywords', val)
});

const handleSearch = () => {
  // 搜索
  router.push({
    path: '/search',
    query: {
      keywords: keywords.value
    }
  })
  store.commit('app/closeSearchDrawer')
};

const handleFocus = () => {
  store.commit('app/openSearchDrawer')
}
</script>

<style lang="less" scoped>
.app-header {
  height: 50px;
  display: flex;
  background-color: var(--app-header-bg);
  .left {
    height: 100%;
    width: var(--app-aside-width);
    background-color: var(--app-header-left-bg);
  }
  .right {
    margin-left: auto;
    width: 300px;
    height: 100%;
    display: flex;
    align-items: center;
  }
}
</style>
