export function addQueryparams(url, params) {
  const queryString = Object.entries(params)
    .map(([k, v]) => `${k}=${v}`)
    .join("&");
  return `${url}?${queryString}`;
}
