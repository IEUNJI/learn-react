import { pathToRegexp } from 'path-to-regexp';

// 精确匹配 exact
let reg = pathToRegexp('/user', [], { end: false });

let path = '/user';
path = '/user/';
path = '/user/12';
path = '/users'; // 不匹配

// end: true 时，只能匹配 /user 和 /user/
// end: false 时，还可以匹配 /user/12

console.log(reg, reg.test(path));

// 路径参数
let params = [];

reg = pathToRegexp('/user/:id/:name', params, { end: false });

path = '/user/12/ieunji/abc';

const [url, ...values] = path.match(reg);

params = params.reduce((acc, item, index) => {
  acc[params[index]['name']] = values[index];
  return acc;
}, {});

console.log(reg, reg.test(path), params);
