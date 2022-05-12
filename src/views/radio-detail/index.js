/*
 * @Author: BlackStar
 * @Date: 2022-04-12 17:05:16
 * @LastEditTime: 2022-05-12 14:24:52
 * @FilePath: /cloud-music-v3/src/views/radio-detail/index.js
 * @Description: 
 */
const allTab = [
  {
    id: 'program',
    label: '节目'
  },
  {
    id: 'subscriber',
    label: '订阅者'
  },
  {
    id: 'info',
    label: '详情'
  },
];

import { reactive, toRefs, defineAsyncComponent, computed } from "vue";
import { radioApi } from "@/api";
import { useRoute } from "vue-router";

const ProgramTab = defineAsyncComponent(() => import('./programs/index.vue'));
const SubscriberTab = defineAsyncComponent(() => import('./subscribers/index.vue'));
const InfoTab = defineAsyncComponent(() => import('./info/index.vue'));

export default function useData(id) {
  const state = reactive({
    loading: true,
    data: null,
    tabList: [],
    currentTab: {},
  });

  const route = useRoute();

  const getDetail = async () => {
    const { data } = await radioApi.detail({ rid: id });
    state.data = data;
    setTabList();
    state.loading = false;
  };

  const getTab = () => {
    switch(state.currentTab.id){
      case 'program':
        return ProgramTab;
      case 'subscriber':
        return SubscriberTab;
      case 'info':
        return InfoTab;
    }
  };

  const setTabList = () => {
    if(state.data.radioFeeType === 0){
      state.tabList = [allTab[0], allTab[1]];
    }else {
      state.tabList = [allTab[2], allTab[0]];
    }
    state.currentTab = state.tabList[0];
  };


  getDetail();

  return {
    ...toRefs(state),
    getTab,
  };
};