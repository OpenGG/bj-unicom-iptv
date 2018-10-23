import getOrigin from "./get-origin";

const formatWithProxy = (url, proxy, proxyDefault) => {
  const prefix = getOrigin(proxy) || proxyDefault;

  if (!prefix) {
    return url;
  }

  const path = url.replace(/^\w+:\/\//, "/rtp/");

  return `${prefix}${path}`;
};

export default formatWithProxy;
