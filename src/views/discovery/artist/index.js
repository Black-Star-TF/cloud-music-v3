const category = [
  {
    key: "area",
    label: "语种：",
    children: [
      { id: "-1", name: "全部" },
      { id: "7", name: "华语" },
      { id: "96", name: "欧美" },
      { id: "8", name: "日本" },
      { id: "16", name: "韩国" },
      { id: "0", name: "其他" },
    ],
  },
  {
    key: "type",
    label: "分类：",
    children: [
      { id: "-1", name: "全部" },
      { id: "1", name: "男歌手" },
      { id: "2", name: "女歌手" },
      { id: "3", name: "乐队" },
    ],
  },
  {
    key: "initial",
    label: "筛选：",
    children: [
      { id: "-1", name: "热门" },
      { id: "a", name: "A" },
      { id: "b", name: "B" },
      { id: "c", name: "C" },
      { id: "d", name: "D" },
      { id: "e", name: "E" },
      { id: "f", name: "F" },
      { id: "g", name: "G" },
      { id: "h", name: "H" },
      { id: "i", name: "I" },
      { id: "j", name: "G" },
      { id: "k", name: "K" },
      { id: "l", name: "L" },
      { id: "m", name: "M" },
      { id: "n", name: "N" },
      { id: "o", name: "O" },
      { id: "p", name: "P" },
      { id: "q", name: "Q" },
      { id: "r", name: "R" },
      { id: "s", name: "S" },
      { id: "t", name: "T" },
      { id: "u", name: "U" },
      { id: "v", name: "V" },
      { id: "w", name: "W" },
      { id: "x", name: "X" },
      { id: "y", name: "Y" },
      { id: "z", name: "Z" },
      { id: "0", name: "#" },
    ],
  },
];

import { ref, toRefs, reactive } from 'vue';
import { artistApi } from '@/api';
import { useColumn, useFetchMore } from "@/hooks/index";

export default function useData() {
  const state = reactive({
    loading: true,
    list: [],
    currentCategory: {
      area: "-1",
      type: "-1",
      initial: "-1",
    }
  });

  const limit = 30;
  const offset = ref(0);
  const hasMore = ref(true);

  const getList = async () => {
    state.loading = true;
    const { artists, more } = await artistApi.list({
      limit,
      offset: offset.value,
      ...state.currentCategory,
    });
    state.list.push(...artists);
    hasMore.value = more;
    state.loading = false;
  };

  const handleCategoryChange = () => {
    hasMore.value = true;
    offset.value = 0;
    state.list = [];
    getList();
  };

  const column = useColumn(1060, 6, 5);

  const wrapper = ref();
  useFetchMore(wrapper, getList, state.loading, hasMore, () => offset.value+=limit);

  getList();
  
  return {
    ...toRefs(state),
    column,
    wrapper,
    category,
    handleCategoryChange,
  };
}