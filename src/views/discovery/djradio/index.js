import { toRefs, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { radioApi } from '@/api';
import { useColumn } from '@/hooks';

export default function useData() {
  let state = reactive({
    banners: [],
    paidRadios: [],
    rcmdRadios: [],
    rcmdCategory: [],
    list: [],
    loading: true,
  });

  // 轮播图
  const getBanners = async () => {
    const { data } = await radioApi.banner();
    state.banners = data;
  };

  // 付费精品
  const getPaid = async () => {
    const { data } = await radioApi.paid({ limit: 4, offset: 0 });
    state.paidRadios = data.list;
  };

  // 电台个性推荐
  const getRecommend = async () => {
    const { data } = await radioApi.recommend({ limit: 6 });
    state.rcmdRadios = data;
  };

  // 推荐电台分类
  const getRcmdCategory = async () => {
    const { data } = await radioApi.rcmdCategory();
    state.rcmdCategory = data.slice(0, 6).map((item) => {
      return {
        id: item.categoryId,
        name: item.categoryName,
      };
    });
  };

  // 电台列表
  const getList = async () => {
    await getRcmdCategory();
    const result = await Promise.all(state.rcmdCategory.map((item) => radioApi.list({ type: item.id }))
    );
    state.rcmdCategory.forEach((item, index) => {
      const options = result[index].djRadios.filter((radio) => radio.rcmdText || radio.rcmdtext);
      state.list.push({
        id: item.id,
        name: item.name,
        options,
      });
    });
  };

  const router = useRouter();
  const toPaid = () => {
    router.push("/radio/pay");
  };
  const toCategory = id => {
    console.log(id);
  };

  const column = useColumn(1060, 6, 5);

  Promise.all([
    getBanners(),
    getPaid(),
    getRecommend(),
    getList(),
  ]).then(() => {
    state.loading = false;
  });

  return {
    ...toRefs(state),
    column,
    toPaid,
    toCategory,
  };
}
