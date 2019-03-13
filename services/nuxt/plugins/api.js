import Vue from "vue";
import DirectusSDK from "@directus/sdk-js";

Vue.prototype.$api = new DirectusSDK({
  url: "https://directus.benfleming.io/",
  project: "_",
});
