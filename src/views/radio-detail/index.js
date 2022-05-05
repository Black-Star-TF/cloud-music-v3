/*
 * @Author: BlackStar
 * @Date: 2022-04-12 17:05:16
 * @LastEditTime: 2022-04-12 18:13:01
 * @FilePath: /cloud-music-v3/src/views/radio-detail/index.js
 * @Description: 
 */
const tabList = [
  {
    id: 'program',
    label: '节目'
  },
  {
    id: 'subscriber',
    label: '订阅者'
  },
];

import { reactive, toRefs, defineAsyncComponent } from "vue";
import { radioApi } from "@/api";
import { useRoute } from "vue-router";

const ProgramTab = defineAsyncComponent(() => import('./programs/index.vue'));
const SubscriberTab = defineAsyncComponent(() => import('./subscribers/index.vue'));

export default function useData() {
  const state = reactive({
    loading: true,
    data: null,
    currentTab: tabList[0]
  });

  const route = useRoute();
  const rid = route.query.rid;

  const getDetail = async () => {
    const { data } = await radioApi.detail({ rid });
    state.data = data;
    state.loading = false;
  };

  const getTab = () => {
    switch(state.currentTab.id){
      case 'program':
        return ProgramTab;
      case 'subscriber': 
        return SubscriberTab;
    }
  };

  getDetail();

  return {
    ...toRefs(state),
    tabList,
    getTab,
  };
};