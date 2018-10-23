import PATH from "path";
import fs from "fs-extra";
import parseChannels from "../src/lib/parse-channels";
import generateM3u from "../src/lib/generate-m3u";
import formatWithProxy from "../src/lib/format-with-proxy";
import compareChannel from "../src/lib/compare-channel";

const defaultProxy = "http://192.168.1.4:8012";

const main = async () => {
  const input = PATH.resolve(process.argv[2]);

  const output = PATH.resolve(process.argv[3]);

  const html = await fs.readFile(input, {
    encoding: "utf8"
  });

  const channels = parseChannels(html).sort(compareChannel);

  const content = generateM3u(
    "bj-unicom-iptv",
    channels.map(({ ChannelName, ChannelURL }) => ({
      name: ChannelName,
      url: formatWithProxy(ChannelURL, defaultProxy, "")
    }))
  );

  await fs.outputFile(output, content);
};

main().catch(err => {
  global.console.error(err.stack);
  process.exitCode = -1;
});
