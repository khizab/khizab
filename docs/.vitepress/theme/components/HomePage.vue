<script setup lang="ts">
import {
  DefaultTheme,
  VPButton,
  VPSponsors,
  VPTeamMembers,
} from "vitepress/theme";
import { useSponsors } from "../composables/useSponsors";

const { data: sponsors } = useSponsors();

const teamMembers = [
  {
    avatar: "https://www.github.com/rendinjast.png",
    name: "Erfan",
    links: [
      { icon: "github", link: "https://github.com/rendinjast" },
      { icon: "twitter", link: "https://twitter.com/rendinjast" },
    ],
  },
] satisfies DefaultTheme.TeamMember[];
</script>

<template>
  <div class="content">
    <div class="content-container">
      <main class="main">
        <div class="vp-doc" flex flex-col items-center mt-10>
          <h2 id="meet-the-team" op50 font-normal p="t-10 b-2">
            Meet The Team
          </h2>
          <div w-full p-10 flex justify-center items-center >
            <VPTeamMembers size="small" :members="teamMembers" />
          </div>

          <!-- <h2 id="sponsored-by" op50 font-normal pt-5 pb-2>Sponsored by</h2> -->

          <div w-full p-10 class="container">
            <!-- <VPSponsors v-if="sponsors" :data="sponsors" /> -->

            <div pt-10 text-center>
              <VPButton
                theme="sponsor"
                text="Become a sponsor"
                href="https://github.com/sponsors/khizab"
              />
            </div>
          </div>

          <p text-gray text-center opacity-75 pt-10>
              <span>Powered by</span>
            <a
              class="VercelBadge"
              target="_blank"
              rel="noopener noreferrer"
              title="pages.cloudflare.com homepage"
              href="https://pages.cloudflare.com/"
            >
               <span>Cloudflare Pages</span>
            </a>
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
.vp-doc .VPTeamMembers.small.count-2 .container {
  max-width: calc(276px * 2 + 24px) !important;
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

h3.vp-sponsor-tier {
  margin: 0;
  margin-bottom: 4px;
}

.VercelBadge {
  align-items: center;
  color: var(--vp-c-text-2) !important;
  display: flex;
  font-size: 0.85rem;
  font-weight: 500;
  gap: 0.35rem;
  justify-content: center;
}

.VercelBadge:hover {
  text-decoration: none !important;
}

.VercelBadge svg {
  color: var(--vp-c-text-2);
  height: 0.85rem;
}
</style>
