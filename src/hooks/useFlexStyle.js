/*
 * @Author: BlackStar
 * @Date: 2022-03-19 23:06:54
 * @LastEditTime: 2022-03-19 23:22:33
 * @FilePath: /cloud-music-v3/src/hooks/useFlexStyle.js
 * @Description:
 */

import { reactive } from "vue";
export default function (props, endMargin = 0) {
  return reactive({
    width: `calc((100% - ${
      props.marginRight * (props.column - 1) + endMargin
    }px) / ${props.column})`,
    marginRight:
      props.index % props.column === 0
        ? `${endMargin}px`
        : `${props.marginRight}px`,
  });
}
