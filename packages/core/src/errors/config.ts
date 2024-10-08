import type { Connector } from '../createConfig.js'
import { BaseError } from './base.js'

export type NetworkNotConfiguredErrorType = NetworkNotConfiguredError & {
  name: 'NetworkNotConfiguredError'
}
export class NetworkNotConfiguredError extends BaseError {
  override name = 'NetworkNotConfiguredError'
  constructor() {
    super('Network not configured.')
  }
}

export type ConnectorAlreadyConnectedErrorType =
  ConnectorAlreadyConnectedError & {
    name: 'ConnectorAlreadyConnectedError'
  }
export class ConnectorAlreadyConnectedError extends BaseError {
  override name = 'ConnectorAlreadyConnectedError'
  constructor() {
    super('Connector already connected.')
  }
}

export type ConnectorNotConnectedErrorType = ConnectorNotConnectedError & {
  name: 'ConnectorNotConnectedError'
}
export class ConnectorNotConnectedError extends BaseError {
  override name = 'ConnectorNotConnectedError'
  constructor() {
    super('Connector not connected.')
  }
}

export type ConnectorNotFoundErrorType = ConnectorNotFoundError & {
  name: 'ConnectorNotFoundError'
}
export class ConnectorNotFoundError extends BaseError {
  override name = 'ConnectorNotFoundError'
  constructor() {
    super('Connector not found.')
  }
}

export type ConnectorAccountNotFoundErrorType =
  ConnectorAccountNotFoundError & {
    name: 'ConnectorAccountNotFoundError'
  }
export class ConnectorAccountNotFoundError extends BaseError {
  override name = 'ConnectorAccountNotFoundError'
  constructor({
    address,
    connector,
  }: {
    address: string
    connector: Connector
  }) {
    super(`Account "${address}" not found for connector "${connector.name}".`)
  }
}
export type ConnectorUnavailableReconnectingErrorType =
  ConnectorUnavailableReconnectingError & {
    name: 'ConnectorUnavailableReconnectingError'
  }
export class ConnectorUnavailableReconnectingError extends BaseError {
  override name = 'ConnectorUnavailableReconnectingError'
  constructor({ connector }: { connector: { name: string } }) {
    super(`Connector "${connector.name}" unavailable while reconnecting.`, {
      details: [
        'During the reconnection step, the only connector methods guaranteed to be available are: `id`, `name`, `type`, `uuid`.',
        'All other methods are not guaranteed to be available until reconnection completes and connectors are fully restored.',
        'This error commonly occurs for connectors that asynchronously inject after reconnection has already started.',
      ].join(' '),
    })
  }
}
