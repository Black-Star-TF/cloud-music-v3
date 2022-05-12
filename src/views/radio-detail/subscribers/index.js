
import { computed, reactive, toRefs, ref} from 'vue';
import { radioApi } from '@/api';
import { useColumn, useFetchMore } from "@/hooks";
export default function(id) {
  const column = useColumn(1360, 3, 2);
  const pageSize = 30;
  const list = ref([]);
  const lastTime = ref(-1);
  const loading = ref(false);
  const more = ref(true);
  const getData = async () => {
    loading.value = true;
    const { subscribers, time, hasMore } = await radioApi.subscriber({
      id,
      time: lastTime.value,
      limit: pageSize,
    });
    list.value.push(...subscribers);
    lastTime.value = time;
    more.value = hasMore;
    loading.value = false;
  };

  const wrapper = ref(document.getElementById('radio-detail-wrapper'));
  useFetchMore(wrapper, getData, loading, more);

  getData();

  return {
    list,
    loading,
    column
  };
}