import Vue from "vue";
import ReverseOrder from "./modules/reverse-order";
import Granim from "./modules/granim";
import Angle from "./modules/angle";

Vue.directive(...ReverseOrder);
Vue.directive(...Granim);
Vue.directive(...Angle);