import ts from 'typescript'
import { presetAttributify, presetIcons, presetUno } from 'unocss'
import Unocss from 'unocss/vite'
import { defineConfig } from 'vitepress'
import { withTwoslash } from 'vitepress-plugin-shiki-twoslash'

import { getSidebar } from './sidebar'

// https://vitepress.dev/reference/site-config
export default withTwoslash(
  defineConfig({
    cleanUrls: true,
    description: 'Reactivity for Aptos apps',
    head: [
      [
        'meta',
        {
          name: 'keywords',
          content: 'react, aptos, typescript, react, react hooks, open source',
        },
      ],
      ['link', { rel: 'icon', href: '/favicon.svg' }],
      ['meta', { name: 'theme-color', content: '#FF463F' }],
      // Open Graph
      ['meta', { property: 'og:type', content: 'website' }],
      ['meta', { property: 'og:image', content: 'https://khizab.dev/og.png' }],
      ['meta', { property: 'og:url', content: 'https://khizab.dev' }],
      // Twitter
      ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
      ['meta', { name: 'twitter:creator', content: '@rendinjast' }],
      ['meta', { name: 'twitter:image', content: 'https://khizab.dev/og.png' }],
      ['meta', { name: 'twitter:site', content: 'khizab.dev' }],
    ],
    ignoreDeadLinks: true,
    lang: 'en-US',
    lastUpdated: true,
    markdown: {
      theme: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    },
    themeConfig: {
      editLink: {
        pattern: 'https://github.com/khizab/khizab/edit/main/docs/:path',
        text: 'Suggest changes to this page',
      },
      footer: {
        message:
          'Released under the <a href="https://github.com/khizab/khizab/blob/main/LICENSE">MIT License</a>.',
        copyright: 'Copyright © 2024-present Erfan Khadivar',
      },
      logo: {
        light: '/logo-light.svg',
        dark: '/logo-dark.svg',
        alt: 'khizab logo',
      },
      nav: [
        { text: 'React', link: '/react/getting-started' },
        { text: 'Core', link: '/core/getting-started' },
        { text: 'CLI', link: '/cli/getting-started' },
        {
          text: 'More',
          items: [
            {
              text: 'Discussions ',
              link: 'https://github.com/khizab/khizab/discussions',
            },
            {
              text: 'Release Notes ',
              link: 'https://github.com/khizab/khizab/releases',
            },
            {
              text: 'Contributing ',
              link: '/dev/contributing',
            },
          ],
        },
      ],
      outline: [2, 3],
      search: {
        provider: 'local',
        options: {
          _render(src, env, md) {
            const html = md.render(src, env)
            if (env.frontmatter?.search === false) return ''
            if (env.relativePath.startsWith('shared')) return ''
            return html
          },
        },
      },
      sidebar: getSidebar(),
      siteTitle: false,
      socialLinks: [
        {
          icon: 'github',
          link: 'https://github.com/khizab/khizab',
        },
      ],
    },
    title: 'Khizab',
    twoslash: {
      defaultCompilerOptions: {
        paths: {
          // Deps - twoslash sometimes has difficulty resolving deps so adding these here
          '@tanstack/query-core': ['../node_modules/@tanstack/query-core'],
          '@tanstack/react-query': ['../node_modules/@tanstack/react-query'],
          abitype: ['../node_modules/abitype'],
          'abitype/*': ['../node_modules/abitype/*'],
          react: ['../node_modules/@types/react'],
          Khizab: ['../node_modules/Khizab/_types'],
          'Khizab/*': ['../node_modules/Khizab/_types/*'],

          // Source - reference source files so we don't need to build packages to get types (speeds things up)
          '@khizab/connectors': ['../../packages/connectors/src/exports'],
          '@khizab/core': ['../../packages/core/src/exports'],
          '@khizab/core/*': ['../../packages/core/src/exports/*'],
          khizab: ['../../packages/react/src/exports'],
          'khizab/*': ['../../packages/react/src/exports/*'],
        },
        strict: true,
        target: ts.ScriptTarget.ESNext,
      },
    },
    vite: {
      plugins: [
        Unocss({
          shortcuts: [
            [
              'btn',
              'px-4 py-1 rounded inline-flex justify-center gap-2 text-white leading-30px children:mya !no-underline cursor-pointer disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
            ],
          ],
          presets: [
            presetUno({
              dark: 'media',
            }),
            presetAttributify(),
            presetIcons({
              scale: 1.2,
            }),
          ],
        }) as unknown as Plugin,
      ],
    },
    vue: {
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.includes('-'),
        },
      },
    },
  }),
)
