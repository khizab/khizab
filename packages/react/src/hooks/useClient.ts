"use client";

import { type GetClientReturnType, getClient } from "@khizab/core";

import { useConfig } from "./useConfig.js";

export type UseClientReturnType = GetClientReturnType;

/** https://khizab.sh/react/api/hooks/useClient */
export function useClient(): UseClientReturnType {
  const config = useConfig();

  return getClient(config);
}
