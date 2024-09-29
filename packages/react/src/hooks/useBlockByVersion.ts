"use client";

import { type Config, type ResolvedRegister } from "@khizab/core";
import { type Evaluate } from "@khizab/core/internal";
import {
  type GetBlockByVersionData,
  type GetBlockByVersionOptions,
  type GetBlockByVersionQueryFnData,
  type GetBlockByVersionQueryKey,
  getBlockByVersionQueryOptions,
} from "@khizab/core/query";

import type { ConfigParameter, QueryParameter } from "../types/properties.js";
import { type UseQueryReturnType, useQuery } from "../utils/query.js";
import { useConfig } from "./useConfig.js";

export type UseBlockByVersionParameters<
  config extends Config = Config,
  selectData = GetBlockByVersionData,
> = Evaluate<
  GetBlockByVersionOptions &
    ConfigParameter<config> &
    QueryParameter<
      GetBlockByVersionQueryFnData,
      null,
      selectData,
      GetBlockByVersionQueryKey
    >
>;

export type UseBlockByVersionReturnType<selectData = GetBlockByVersionData> =
  UseQueryReturnType<selectData, null>;

/** https://khizab.sh/react/api/hooks/useBlockNumber */
export function useBlockByVersion<
  config extends Config = ResolvedRegister["config"],
  selectData = GetBlockByVersionData,
>(
  parameters: UseBlockByVersionParameters<config, selectData> = {},
): UseBlockByVersionReturnType<selectData> {
  const { query = {} } = parameters;

  const config = useConfig(parameters);

  const options = getBlockByVersionQueryOptions(config, parameters);

  return useQuery({ ...query, ...options });
}
