import request from "@/util/request";

export const getTopLists = () => request.get('/toplist')