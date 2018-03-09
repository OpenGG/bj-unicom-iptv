const generateM3u = (title, arr) =>
  `#EXTM3U name="${title}"\n${
    arr.map(({
      name,
      url,
    }) => `#EXTINF:-1,${name}\n${url}`)
      .join('\n')
  }`;

export default generateM3u;
