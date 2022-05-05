export default function loadTheme() {
  const theme = {};
  let r = require.context('@/assets/theme',false, /\.json$/);
  r.keys().forEach(key => {
    let reg = /^\.\/(\w+)\.json$/;
    let name = key.match(reg)[1];
    theme[name] = r(key);
  });
  return theme;
}