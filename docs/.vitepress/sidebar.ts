import { DefaultTheme } from 'vitepress'

export function getSidebar() {
  return {
    '/react': [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Khizab', link: '/react/why' },
          { text: 'Installation', link: '/react/installation' },
          { text: 'Getting Started', link: '/react/getting-started' },
          { text: 'TypeScript', link: '/react/typescript' },
        ],
      },
      {
        text: 'Guides',
        items: [
          {
            text: 'TanStack Query',
            link: '/react/guides/tanstack-query',
          },
          {
            text: 'Aptos Sdk',
            link: '/react/guides/aptos-sdk',
          },
          {
            text: 'Error Handling',
            link: '/react/guides/error-handling',
          },
          {
            text: 'SSR',
            link: '/react/guides/ssr',
          },
          {
            text: 'Connect Wallet',
            link: '/react/guides/connect-wallet',
          },
          {
            text: 'Send Transaction',
            link: '/react/guides/send-transaction',
          },
          {
            text: 'Read from Contract',
            link: '/react/guides/read-from-contract',
          },
          {
            text: 'Write to Contract',
            link: '/react/guides/write-to-contract',
          },
          {
            text: 'FAQ / Troubleshooting',
            link: '/react/guides/faq',
          },
        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'createConfig', link: '/react/api/createConfig' },
          { text: 'createStorage', link: '/react/api/createStorage' },
          { text: 'networks', link: '/react/api/networks' },
          {
            text: 'Connectors',
            collapsed: true,
            link: '/react/api/connectors',
            items: [
              {
                text: 'Petra',
                link: '/react/api/connectors/petra',
              },
              { text: 'Pontem', link: '/react/api/connectors/pontem' },
              { text: 'Martian', link: '/react/api/connectors/martian' },
            ],
          },
          { text: 'KhizabProvider', link: '/react/api/KhizabProvider' },
        ],
      },
      {
        text: 'Hooks',
        link: '/react/api/hooks',
        items: [
          { text: 'useAccount', link: '/react/api/hooks/useAccount' },
          {
            text: 'useAccountEffect',
            link: '/react/api/hooks/useAccountEffect',
          },
          {
            text: 'useAccountInfo',
            link: '/react/api/hooks/useAccountInfo',
          },
          {
            text: 'useAccountModule',
            link: '/react/api/hooks/useAccountModule',
          },
          {
            text: 'useAccountModules',
            link: '/react/api/hooks/useAccountModules',
          },
          {
            text: 'useAccountResource',
            link: '/react/api/hooks/useAccountResource',
          },
          {
            text: 'useAccountResources',
            link: '/react/api/hooks/useAccountResources',
          },
          {
            text: 'useAccountTransactions',
            link: '/react/api/hooks/useAccountTransactions',
          },
          { text: 'useBalance', link: '/react/api/hooks/useBalance' },
          {
            text: 'useBlockByHeight',
            link: '/react/api/hooks/useBlockByHeight',
          },
          {
            text: 'useBlockByVersion',
            link: '/react/api/hooks/useBlockByVersion',
          },
          { text: 'useClient', link: '/react/api/hooks/useClient' },
          { text: 'useConfig', link: '/react/api/hooks/useConfig' },
          { text: 'useConnect', link: '/react/api/hooks/useConnect' },
          { text: 'useConnections', link: '/react/api/hooks/useConnections' },
          { text: 'useConnectors', link: '/react/api/hooks/useConnectors' },
          { text: 'useDisconnect', link: '/react/api/hooks/useDisconnect' },
          { text: 'useConnector', link: '/react/api/hooks/useConnector' },
          {
            text: 'useLedgerInfo',
            link: '/react/api/hooks/useLedgerInfo',
          },
          { text: 'useTableItem', link: '/react/api/hooks/useTableItem' },
          {
            text: 'useTransaction',
            link: '/react/api/hooks/useTransaction',
          },
          {
            text: 'useTransactions',
            link: '/react/api/hooks/useTransactions',
          },
          { text: 'useReadContract', link: '/react/api/hooks/useReadContract' },
          {
            text: 'useReadContracts',
            link: '/react/api/hooks/useReadContracts',
          },
          { text: 'useReconnect', link: '/react/api/hooks/useReconnect' },
          {
            text: 'useSyncExternalStoreWithTracked',
            link: '/react/api/hooks/useSyncExternalStoreWithTracked',
          },
          { text: 'useToken', link: '/react/api/hooks/useToken' },
          {
            text: 'useWriteContract',
            link: '/react/api/hooks/useWriteContract',
          },
        ],
      },
      {
        text: 'Miscellaneous',
        items: [
          { text: 'Actions', link: '/react/api/actions' },
          { text: 'Errors', link: '/react/api/errors' },
          {
            text: 'Utilities',
            collapsed: true,
            items: [
              {
                text: 'cookieToInitialState',
                link: '/react/api/utilities/cookieToInitialState',
              },
              { text: 'deserialize', link: '/react/api/utilities/deserialize' },
              { text: 'serialize', link: '/react/api/utilities/serialize' },
            ],
          },
        ],
      },
    ],
    '/core': [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Khizab', link: '/core/why' },
          { text: 'Installation', link: '/core/installation' },
          { text: 'Getting Started', link: '/core/getting-started' },
          { text: 'TypeScript', link: '/core/typescript' },
        ],
      },
      {
        text: 'Guides',
        items: [
          {
            text: 'Aptos Sdk',
            link: '/core/guides/aptos-sdk',
          },
          {
            text: 'Error Handling',
            link: '/core/guides/error-handling',
          },
          {
            text: 'FAQ / Troubleshooting',
            link: '/core/guides/faq',
          },
        ],
      },
      {
        text: 'Configuration',
        items: [
          { text: 'createConfig', link: '/core/api/createConfig' },
          { text: 'createConnector', link: '/core/api/createConnector' },
          { text: 'createStorage', link: '/core/api/createStorage' },
          { text: 'Networks', link: '/core/api/networks' },
          {
            text: 'Connectors',
            collapsed: true,
            link: '/core/api/connectors',
            items: [
              {
                text: 'Petra',
                link: '/core/api/connectors/petra',
              },
              { text: 'Pontem', link: '/core/api/connectors/pontem' },
              { text: 'Martian', link: '/core/api/connectors/martian' },
            ],
          },
        ],
      },
      {
        text: 'Actions',
        link: '/core/api/actions',
        items: [
          { text: 'connect', link: '/core/api/actions/connect' },
          { text: 'disconnect', link: '/core/api/actions/disconnect' },
          { text: 'getAccount', link: '/core/api/actions/getAccount' },
          { text: 'getAccountInfo', link: '/core/api/actions/getAccountInfo' },
          {
            text: 'getAccountModule',
            link: '/core/api/actions/getAccountModule',
          },
          {
            text: 'getAccountModules',
            link: '/core/api/actions/getAccountModules',
          },
          {
            text: 'getAccountResource',
            link: '/core/api/actions/getAccountResource',
          },
          {
            text: 'getAccountResources',
            link: '/core/api/actions/getAccountResources',
          },
          {
            text: 'getAccountTransactions',
            link: '/core/api/actions/getAccountTransactions',
          },
          { text: 'getBalance', link: '/core/api/actions/getBalance' },
          {
            text: 'getBlockByHeight',
            link: '/core/api/actions/getBlockByHeight',
          },
          {
            text: 'getBlockByVersion',
            link: '/core/api/actions/getBlockByVersion',
          },
          { text: 'getClient', link: '/core/api/actions/getClient' },
          { text: 'getConnections', link: '/core/api/actions/getConnections' },
          { text: 'getConnector', link: '/core/api/actions/getConnector' },
          { text: 'getConnectors', link: '/core/api/actions/getConnectors' },
          { text: 'getLedgerInfo', link: '/core/api/actions/getLedgerInfo' },
          { text: 'getTableItem', link: '/core/api/actions/getTableItem' },
          { text: 'getToken', link: '/core/api/actions/getToken' },
          { text: 'getTransaction', link: '/core/api/actions/getTransaction' },
          {
            text: 'getTransactions',
            link: '/core/api/actions/getTransactions',
          },
          { text: 'readContract', link: '/core/api/actions/readContract' },
          { text: 'readContracts', link: '/core/api/actions/readContracts' },
          { text: 'reconnect', link: '/core/api/actions/reconnect' },
          { text: 'watchAccount', link: '/core/api/actions/watchAccount' },
          {
            text: 'watchConnections',
            link: '/core/api/actions/watchConnections',
          },
          {
            text: 'watchConnectors',
            link: '/core/api/actions/watchConnectors',
          },
          { text: 'writeContract', link: '/core/api/actions/writeContract' },
        ],
      },
      {
        text: 'Miscellaneous',
        items: [
          { text: 'Errors', link: '/core/api/errors' },
          {
            text: 'Utilities',
            collapsed: true,
            items: [
              {
                text: 'cookieToInitialState',
                link: '/core/api/utilities/cookieToInitialState',
              },
              { text: 'deserialize', link: '/core/api/utilities/deserialize' },
              {
                text: 'normalizeChainId',
                link: '/core/api/utilities/normalizeChainId',
              },
              { text: 'serialize', link: '/core/api/utilities/serialize' },
            ],
          },
        ],
      },
    ],
    '/cli': [
      {
        text: 'Introduction',
        items: [
          { text: 'Why Khizab CLI', link: '/cli/why' },
          { text: 'Installation', link: '/cli/installation' },
          { text: 'Getting Started', link: '/cli/getting-started' },
        ],
      },
      {
        text: 'Config File',
        items: [
          {
            text: 'Configuring CLI',
            link: '/cli/config/configuring-cli',
          },
          { text: 'Config Options', link: '/cli/config/options' },
        ],
      },
      {
        text: 'Commands',
        link: '/cli/api/commands',
        items: [
          {
            text: 'generate',
            link: '/cli/api/commands/generate',
          },
          {
            text: 'init',
            link: '/cli/api/commands/init',
          },
        ],
      },
      {
        text: 'Plugins',
        link: '/cli/api/plugins',
        items: [
          { text: 'get', link: '/cli/api/plugins/get' },
          { text: 'react', link: '/cli/api/plugins/react' },
          { text: 'actions', link: '/cli/api/plugins/actions' },
        ],
      },
      {
        text: 'create-khizab',
        link: '/cli/create-khizab',
      },
    ],
    '/dev': [
      {
        text: 'Dev',
        items: [
          { text: 'Contributing', link: '/dev/contributing' },
          { text: 'Creating Connectors', link: '/dev/creating-connectors' },
        ],
      },
    ],
  } satisfies DefaultTheme.Sidebar
}
