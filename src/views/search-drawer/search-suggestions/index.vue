<template>
  <div class="search-suggestions">
    <span class="search-title">搜“<span class="keywords">{{ keywords }}</span>”相关的结果</span>
    <template
      v-for="item in searchSuggestions.order"
      :key="item"
    >
      <component
        :is="getSuggestedType(item)"
        :data="searchSuggestions[item]"
        :keywords="keywords"
        @click="handleClick($event, item)"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, watch, defineAsyncComponent } from "vue";
import { searchApi } from "@/api";
import _ from "lodash";
import { toPlaylistDetail } from "@/util/methods";
const SuggestedSongs = defineAsyncComponent(() =>
  import("../components/SuggestedSongs.vue")
);
const SuggestedArtists = defineAsyncComponent(() =>
  import("../components/SuggestedArtists.vue")
);
const SuggestedAlbums = defineAsyncComponent(() =>
  import("../components/SuggestedAlbums.vue")
);
const SuggestedPlaylists = defineAsyncComponent(() =>
  import("../components/SuggestedPlaylists.vue")
);

const props = defineProps({
  keywords: {
    type: String,
    required: true,
  },
});

const getSuggestedType = type => {
  if (type == "songs") {
    return SuggestedSongs;
  } else if (type == "artists") {
    return SuggestedArtists;
  } else if (type == "playlists") {
    return SuggestedPlaylists;
  } else if (type == "albums") {
    return SuggestedAlbums;
  }
};

let searchSuggestions = ref({
  order: [],
});
const getSuggestionData = _.debounce(async () => {
  const { result } = await searchApi.suggestion({ keywords: props.keywords });
  searchSuggestions.value = { ...result };
}, 600);

getSuggestionData();
watch(
  () => props.keywords,
  val => {
    if (val) {
      getSuggestionData();
    }
  }
);

const emits = defineEmits(["close"]);
const handleClick = (id, type) => {
  if (type == "songs") {
  } else if (type == "artists") {
  } else if (type == "playlists") {
    toPlaylistDetail(id);
    emits("close");
  } else if (type == "albums") {
  }
  // emits("close");
};
</script>

<style lang="less" scoped>
.search-suggestions {
  width: 100%;
  .search-title {
    font-size: 13px;
    display: inline-block;
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    margin-left: 10px;
    color: #666;
    cursor: pointer;
    &:hover {
      color: #333;
    }
  }
}
</style>
