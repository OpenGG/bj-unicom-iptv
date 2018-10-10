import Vue from 'vue';
import Message from 'iview/src/components/message';

import 'iview/dist/styles/iview.css';

import App from './App';

Vue.prototype.$Message = Message;

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
