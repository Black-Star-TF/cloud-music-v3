/*
 * @Author: BlackStar
 * @Date: 2022-03-31 19:25:58
 * @LastEditTime: 2022-04-01 13:09:46
 * @FilePath: /cloud-music-v3/src/views/playlist-detail/song-tab/index.js
 * @Description: 
 */

export const useTable = () => {
  const tableColumns = [
    {
      id: 'index',
      title: '',
      prop: '',
      className: 'index-column'
    },
    {
      id: 'name',
      title: '音乐标题',
      prop: 'name',
      className: 'name-column'
    },
    {
      id: 'artist',
      title: '歌手',
      prop: 'ar',
      className: 'artist-column'
    },
    {
      id: 'album',
      title: '专辑',
      prop: 'al',
      className: 'album-column'
    },
    {
      id: 'duration',
      title: '时长',
      prop: 'dt',
      className: 'duration-column'
    },
  ];

  const formatSong = song => {
    const { id, name, ar, alia, fee, al, dt, mv, privilege } = song;
    return {
      id,
      name,
      artists: ar.map(item => ({ id: item.id, name: item.name})),
      alias: [...alia],
      fee,
      album: {
        id: al.id,
        name: al.name,
      },
      duration: dt,
      mv,
      privilege
    };
  };
  return {
    tableColumns,
    formatSong
  };
};