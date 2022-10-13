import "./main.scss";
import Vue from 'vue';
import App from "./components/App";

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faDoorOpen, faPlay, faVectorSquare, faImage } from '@fortawesome/free-solid-svg-icons';

library.add(faDoorOpen, faPlay, faVectorSquare, faImage);

Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    el: '#root',
    render: h => h(App),
});