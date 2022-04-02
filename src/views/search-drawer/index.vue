<template>
  <div
    v-if="visible"
    class="search-drawer"
    @click.stop
  >
    <search-suggestions
      v-if="showSuggestions"
      :keywords="keywords"
      @close="emits('close')"
    />
    <search-hot-content
      v-else
      @search="handleSearch"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router'
import SearchHotContent from "./components/SearchHotContent.vue";
import SearchSuggestions from "./components/SearchSuggestions.vue";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const store = useStore();
let keywords = computed(() => {
  return store.state.app.keywords;
});

let showSuggestions = computed(() => {
  return keywords.value !== "";
});

const emits = defineEmits(["open", "close"]);
const handleOpen = () => {
  emits("open");
};

const handleClose = e => {
  let target = e.target ?? e.srcElement;
  if (target.getAttribute("data-name") === "search-box") return;
  emits("close");
};

const router = useRouter()
const handleSearch = keywords => {
  store.commit("app/setKeywords", keywords);
  router.push({
    path: '/search',
    query: {
      keywords
    }
  })
  emits("close");
};

watch(
  () => props.visible,
  val => {
    if (val) {
      document.body.addEventListener("click", handleClose);
    } else {
      document.body.removeEventListener("click", handleClose);
    }
  }
);
</script>

<style lang="less" scoped>
.search-drawer {
  width: 355px;
  position: absolute;
  right: 0;
  top: 50px;
  bottom: 60px;
  overflow: overlay;
  z-index: 999;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: -5px 0 10px -5px rgba(0, 0, 0, 0.2); // 单边阴影
}
</style>
