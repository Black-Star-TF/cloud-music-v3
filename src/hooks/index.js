/*
 * @Author: BlackStar
 * @Date: 2022-03-21 18:40:11
 * @LastEditTime: 2022-03-23 02:16:43
 * @FilePath: /cloud-music-v3/src/hooks/index.js
 * @Description: 
 */
import { onBeforeRouteLeave } from 'vue-router'
import { ref, computed, reactive, onMounted } from 'vue'

export const useColumn = (criticalWidth, max, min) => {
  let column = ref(min);
  if (document.body.clientWidth > criticalWidth) {
    column.value = max;
  } else {
    column.value = min;
  }
  let observer = new ResizeObserver(entries => {
    let width = entries[0].target.clientWidth;
    if (width > criticalWidth) {
      column.value = max;
    } else {
      column.value = min;
    }
  });
  observer.observe(document.body);
  // 路由离开前销毁观察器
  onBeforeRouteLeave(() => {
    if (!observer) return
    observer.disconnect()
    observer = null
  })
  return computed(() => column.value)
}

export const useFlexStyle = (props, endMargin = 0) => {
  return computed(() => {
    return {
      width: `calc((100% - ${props.marginRight * (props.column - 1) + endMargin
        }px) / ${props.column})`,
      marginRight:
        props.index % props.column === 0
          ? `${endMargin}px`
          : `${props.marginRight}px`,
    }
  })
}

export const useFetchMore = (getData, loading, hasMore, setPageParams) => {
  const wrapper = ref(null)
  onMounted(() => {
    wrapper.value.addEventListener("scroll", e => {
      let { scrollTop, offsetHeight, scrollHeight } = e.target;
      if (scrollHeight - (offsetHeight + scrollTop) > 5 || loading.value || !hasMore.value) return
      setPageParams && setPageParams()
      getData()
    });
  });
  return wrapper
}