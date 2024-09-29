import Theme from "vitepress/theme";

import "uno.css";
import "vitepress-plugin-shiki-twoslash/styles.css";

import AsideSponsors from "./components/AsideSponsors.vue";
import HomeBanner from "./components/HomeBanner.vue";
import HomePage from "./components/HomePage.vue";
import CoomingSoon from "./components/CoomingSoon.vue";
import HeroImage from "./components/HeroImage.vue";

import "./style.css";

// https://vitepress.dev/guide/custom-theme
import { h } from "vue";

console.log("Faezeh :)");
export default {
  ...Theme,
  Layout: () => {
    return h(Theme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // "aside-ads-before": () => h(AsideSponsors),
      "not-found": () => h(CoomingSoon),
      "home-features-after": () => h(HomePage),
      "home-hero-before": () => h(HomeBanner),
      "home-hero-image": () => h(HeroImage),
    });
  },
};
