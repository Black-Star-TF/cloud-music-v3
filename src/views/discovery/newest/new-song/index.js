const areaList = [
  {
    id: "0",
    name: "全部",
  },
  {
    id: "7",
    name: "华语",
  },
  {
    id: "96",
    name: "欧美",
  },
  {
    id: "16",
    name: "韩国",
  },
  {
    id: "8",
    name: "日本",
  },
];

import { reactive, toRefs } from "vue";
import { songApi } from "@/api";

export default function(){
  const state = reactive({
    loading: true,
    currentArea: "0",
    list: []
  });
  
  const getList = async () => {
    
    const { data } = await songApi.newest({ type: state.currentArea });
    state.list = data;
    state.loading = false;
  };
  
  const handleAreaChange = () => {
    state.loading = true;
    state.list = [];
    getList();
  };

  getList();

  return {
    areaList,
    ...toRefs(state),
    handleAreaChange,
  };
}

