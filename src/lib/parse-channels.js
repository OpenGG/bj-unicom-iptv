const parseChannel = (str) => {
  const reg = /(\w+)="([^"]+)"/g;

  const ret = {};

  for (;;) {
    const matches = reg.exec(str);

    if (!matches) {
      break;
    }

    ret[matches[1]] = matches[2];
  }

  return ret;
};

const parseChannels = (str) => {
  const ret = [];

  const reg = /CU_CTC_Auther\('Channel',([^)]+)\)/g;

  for (;;) {
    const matches = reg.exec(str);

    if (!matches) {
      break;
    }

    const info = parseChannel(matches[1]);

    ret.push(info);
  }

  return ret;
};

export default parseChannels;
