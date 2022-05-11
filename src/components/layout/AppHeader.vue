<template>
  <div class="app-header">
    <div class="left">
      <div class="navigator-box">
        <div
          class="back nav"
          title="后退"
          :class="{'disabled': buttonDisabled.back}"
          @click="routeTo('back')"
        >
          <i class="iconfont icon-back" />
        </div>
        <div
          class="forward nav"
          title="前进"
          :class="{'disabled': buttonDisabled.forward}"
          @click="routeTo('forward')"
        >
          <i class="iconfont icon-back" />
        </div>
      </div>
    </div>
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
import { computed, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import SearchBox from "@/components/SearchBox.vue";
import HeaderTitle from "@/components/nav/HeaderTitle.vue";
import HeaderNav from "@/components/nav/HeaderNav.vue";
import subNavDisc from "@/common/config/sub-nav-disc";
const route = useRoute();
const router = useRouter();
const store = useStore();
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
  });
  store.commit('app/closeSearchDrawer');
};

const handleFocus = () => {
  store.commit('app/openSearchDrawer');
};

const buttonDisabled = reactive({
  back: true,
  forward: true,
});

const routeTo = tag => {
  router[tag]();
};

watch(route, () => {
  const { back, forward } = window.history.state;
  buttonDisabled.back = !back;
  buttonDisabled.forward = !forward;
});
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
    position: relative;
    display: flex;
    align-items: center;
    .navigator-box {
      width: 60px;
      position: absolute;
      display: flex;
      justify-content: space-between;
      right: 0;

      .nav {
        width: 22px;
        height: 22px;
        line-height: 22px;
        border-radius: 50%;
        color: #333;
        .iconfont {
          font-size: 20px;
          margin-left: 3px;
          font-weight: 500;
        }
        &.forward {
          transform: rotate(180deg);
        }
        &:hover:not(.disabled){
          background: rgba(0, 0, 0, .05);
        }
        &.disabled{
          color: #d2d2d2;
        }
      }
    }
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
