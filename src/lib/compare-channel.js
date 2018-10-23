const compareChannel = (a, b) =>
  parseInt(a.UserChannelID, 10) - parseInt(b.UserChannelID, 10);

export default compareChannel;
