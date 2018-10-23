<template>
  <div id="app">
    <div
      class="form"
    >
      <label>
        udpxy address:
        <i-input
          v-model="udpxy"
          :disabled="loading"
          class="input-udpxy"
          placeholder="Your udpxy address, e.g. http://192.168.1.4:8012"
        />
      </label>

      <Button
        :disabled="loading"
        html-type="button"
        @click="download"
      >
        Download playlist
      </Button>

      <Button
        :disabled="loading"
        html-type="button"
        @click="custom"
      >
        Custom channels HTML
      </Button>

      <ModalCustom
        ref="modalCustom"
        @submit="channelsHTML = arguments[0]"
      />
    </div>

    <Table
      :loading="loading"
      :columns="columns"
      :data="channelsFormatted"
    />
  </div>
</template>

<script>
import axios from 'axios';

import Input from 'iview/src/components/input';
import Button from 'iview/src/components/button';
import Table from 'iview/src/components/table';
import download from './lib/download';

import compareChannel from './lib/compare-channel';

import formatWithProxy from './lib/format-with-proxy';

import generateM3u from './lib/generate-m3u';

import parseChannels from './lib/parse-channels';

import {
  udpxyDefault,
  filename,
} from './constants';

import ModalCustom from './components/modal-custom';

export default {
  name: 'App',
  components: {
    'i-input': Input,
    ModalCustom,
    Button,
    Table,
  },
  data() {
    return {
      loading: true,
      udpxy: localStorage.udpxy || '',
      columns: [
        {
          title: 'channel name',
          key: 'ChannelName',
        },
        {
          title: 'channel url',
          key: 'ChannelURL',
        },
        {
          title: 'udpxy url',
          key: 'udpxy',
        },
        {
          title: 'Play in VLC (iOS)',
          key: 'udpxy',
          width: 140,
          render: (h, params) => {
            const {
              row: {
                udpxy,
              },
            } = params;

            const scheme = `vlc-x-callback://x-callback-url/stream?url=${encodeURIComponent(udpxy)}`;

            return (
              <a
                class="icon-vlc"
                href={scheme}
                title="Play in VLC (iOS)"
              ></a>
            );
          },
        },
      ],
      channelsHTML: '',
    };
  },
  computed: {
    channelsFormatted() {
      const channels = parseChannels(this.channelsHTML).sort(compareChannel);

      return channels.map(channel => Object.assign(channel, {
        udpxy: formatWithProxy(channel.ChannelURL, this.udpxy, udpxyDefault),
      }));
    },
  },
  watch: {
    udpxy(current) {
      localStorage.udpxy = current;
    },
  },
  async mounted() {
    try {
      const response = await axios.get('iptv.txt');

      this.channelsHTML = response.data;
    } catch (e) {
      this.$Message.error(e.message);
    } finally {
      this.loading = false;
    }
  },
  methods: {
    download() {
      const content = generateM3u(filename, this.channelsFormatted
        .map(({
          ChannelName,
          udpxy,
        }) => ({
          name: ChannelName,
          url: udpxy,
        })));

      download(
        `${filename}.m3u`,
        content,
      );
    },
    custom() {
      this.$refs.modalCustom.show(this.channelsHTML);
    },
  },
};
</script>

<style scoped>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  padding: 10px;
}

.form {
  padding: 10px;
  margin: 10px 0 20px;
  border: 1px solid #ccc;
}

.input-udpxy {
  width: 300px;
}

label {
  display: block;
  padding: 20px 0;
}
</style>

<style>
.icon-vlc {
  display: block;
  margin: auto;
  width: 2.5em;
  height: 2.5em;
  background: url('./img/icon-vlc.svg') no-repeat;
  background-size: cover;
}
</style>
