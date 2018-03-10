<template>
  <div id="app">
    <div
      class="form"
    >
      <label>
        udpxy address:
        <i-input
          class="input-udpxy"
          v-model="udpxy"
          placeholder="Your udpxy address, e.g. http://192.168.1.4:8012"
        />
      </label>

      <Button
        html-type="button"
        @click="download"
      >
        Download playlist
      </Button>

      <Button
        html-type="button"
        @click="custom"
      >
        Custom channels HTML
      </Button>

      <ModalCustom
        @submit="channelsHTML = arguments[0]"
        ref="modalCustom"
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

import download from './lib/download';

import getOrigin from './lib/get-origin';

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
    ModalCustom,
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
      ],
      channelsHTML: '',
    };
  },
  watch: {
    udpxy(current) {
      localStorage.udpxy = current;
    },
  },
  computed: {
    channelsFormatted() {
      const channels = parseChannels(this.channelsHTML).sort(
        (a, b) => parseInt(a.UserChannelID, 10) - parseInt(b.UserChannelID, 10)
      );

      return channels.map(channel =>
        Object.assign(channel, {
          udpxy: this.formatWithProxy(channel.ChannelURL),
        })
      );
    },
  },
  methods: {
    formatWithProxy(url) {
      const prefix = getOrigin(this.udpxy) || udpxyDefault;

      const path = url.replace(/^\w+:\/\//, '/rtp/');

      return `${prefix}${path}`;
    },
    download() {
      const content = generateM3u(filename, this.channelsFormatted
        .map(({
          ChannelName,
          udpxy,
        }) => ({
          name: ChannelName,
          url: udpxy,
        }))
      );

      download(
        `${filename}.m3u`,
        content
      );
    },
    custom() {
      this.$refs.modalCustom.show(this.channelsHTML);
    },
  },
  async mounted() {
    try {
      const response = await axios.get('static/iptv.txt');

      this.channelsHTML = response.data;
    } catch (e) {
      this.$Message.error(e.message);
    } finally {
      this.loading = false;
    }
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
