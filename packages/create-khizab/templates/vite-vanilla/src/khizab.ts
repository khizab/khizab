import { createConfig, createStorage } from "khizab";
import { testnet } from "khizab/network";
import { petraWallet } from "khizab/connectors";

export const config = createConfig({
  network: testnet,
  connectors: [petraWallet()],
  storage: createStorage({ storage: localStorage, key: "vite-core-app" }),
});
