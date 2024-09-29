import { petraWallet } from "@khizab/connectors";
import { createConfig, createStorage } from "@khizab/core";
import { testnet } from "khizab/networks";

export const config = createConfig({
  network: testnet,
  connectors: [petraWallet()],
  storage: createStorage({ storage: localStorage, key: "vite-core-app" }),
});
