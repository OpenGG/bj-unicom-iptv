import Vue from 'vue';

import iView from 'iview';
import 'iview/dist/styles/iview.css';

import App from './App';

Vue.use(iView);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
});
