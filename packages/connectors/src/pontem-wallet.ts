import {
  type AptosWalletErrorResult,
  type PluginProvider,
} from '@aptos-labs/wallet-adapter-core'

import { createConnector } from '@khizab/core'
import type {
  AccountInfo,
  NetworkInfo,
  SignMessagePayload,
  SignMessageResponse,
  WalletName,
} from '@aptos-labs/wallet-adapter-core'
import { BCS, type MaybeHexString, TxnBuilderTypes, Types } from 'aptos'

interface PontemProvider
  extends Omit<PluginProvider, 'signAndSubmitTransaction'> {
  signTransaction(
    transaction: any,
    options?: any,
  ): Promise<Uint8Array | AptosWalletErrorResult>
  generateTransaction(
    sender: MaybeHexString,
    payload: any,
    options?: any,
  ): Promise<any>
  signAndSubmitTransaction: (
    transaction: Types.TransactionPayload,
    options?: any,
  ) => Promise<Types.HexEncodedBytes | AptosWalletErrorResult>
  signAndSubmitBCSTransaction: (
    transaction: string,
    options?: any,
  ) => Promise<Types.HexEncodedBytes | AptosWalletErrorResult>
  changeNetwork: (nodeUrl: string) => Promise<string>
  addNetwork: (nodeUrl: string) => Promise<string>
  getChainId: () => Promise<number>
}

interface PontemWindow extends Window {
  pontem?: PontemProvider
}

declare const window: PontemWindow

export const PontemWalletName = 'Pontem' as WalletName<'Pontem'>

pontemWallet.type = 'pontemWallet' as const
export function pontemWallet() {
  type Provider = PontemProvider
  type Properties = {}

  return createConnector<Provider, Properties>((_config) => ({
    id: 'pontem-wallet',
    name: PontemWalletName,
    type: pontemWallet.type,
    icon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzYiIGhlaWdodD0iMzYiIHZpZXdCb3g9IjAgMCAzNiAzNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTE4IDBDOC4wNzMwNCAwIDAgOC4wNzEzOSAwIDE3Ljk5NjNDMCAyNS4xMjk4IDQuMTczMTYgMzEuMzEwOCAxMC4yMDc2IDM0LjIyMDNWMzQuMjM1MUgxMC4yMzcyQzEyLjU4NiAzNS4zNjQ5IDE1LjIyMjggMzYgMTggMzZDMjcuOTI3IDM2IDM2IDI3LjkyODYgMzYgMTguMDAzN0MzNiA4LjA3MTM4IDI3LjkyNyAwIDE4IDBaTTE4IDEuNDc2OTJDMjcuMTA3MSAxLjQ3NjkyIDM0LjUyMjggOC44OTEwOCAzNC41MjI4IDE3Ljk5NjNDMzQuNTIyOCAyMC42MTA1IDMzLjkwOTcgMjMuMDkxNyAzMi44MjQgMjUuMjkyM0MzMC40NDU2IDI0LjE0MDMgMjguMDMwNCAyMy4yODM3IDI1LjU5MjkgMjIuNzAwM1Y4LjkyMDYyQzI1LjU5MjkgOC40NDA2MiAyNS4yMTYyIDguMDU2NjIgMjQuNzQzNSA4LjA1NjYySDIxLjcxNTJIMTQuMDg1NEgxMS4wNTdDMTAuNTkxNyA4LjA1NjYyIDEwLjIwNzYgOC40NDA2MiAxMC4yMDc2IDguOTIwNjJWMjIuNzY2OEM3Ljg0NDA3IDIzLjM1MDIgNS40OTUyOCAyNC4xOTIgMy4xODM0MiAyNS4yOTk3QzIuMDkwMjcgMjMuMDkxNyAxLjQ3NzIzIDIwLjYxNzggMS40NzcyMyAxNy45OTYzQzEuNDc3MjMgOC44OTEwOCA4Ljg5MjkgMS40NzY5MiAxOCAxLjQ3NjkyWk00LjEzNjIzIDI2Ljk2MTJDNi4wOTM1NiAyNS45OTM4IDguMTI0NzQgMjUuMjQ4IDEwLjIxNSAyNC43MzExVjMyLjU1ODhDNy43NDA2NiAzMS4yMzY5IDUuNjUwMzkgMjkuMzAyMiA0LjEzNjIzIDI2Ljk2MTJaTTE0LjA4NTQgMzQuMDQzMVYxNS42MDM3QzE0LjA4NTQgMTMuNDY5NSAxNS44MzU5IDExLjcwNDYgMTcuOTI2MSAxMS43MDQ2QzIwLjAxNjQgMTEuNzA0NiAyMS43MTUyIDEzLjQzMjYgMjEuNzE1MiAxNS41NTk0QzIxLjcxNTIgMTUuNTc0MiAyMS43MDc4IDE1LjU4ODkgMjEuNzA3OCAxNS42MDM3SDIxLjcxNTJWMjIuMDIwOUMxOS45MzUyIDIxLjgxNDIgMTguMTQ3NyAyMS43NDc3IDE2LjM2MDMgMjEuODQzN0wxNC44OTA0IDIzLjk3NzhDMTcuMTgwMSAyMy43ODU4IDE5LjQxMDcgMjMuODAwNiAyMS42MTE4IDI0LjA1MTdDMjEuNjM0IDI0LjA1MTcgMjEuNjQ4NyAyNC4wNTE3IDIxLjY3MDkgMjQuMDU5MUMyMS42ODU3IDI0LjA1OTEgMjEuNzAwNSAyNC4wNTkxIDIxLjcyMjYgMjQuMDY2NUMyMi4xMDY3IDI0LjExMDggMjMuNTAyNyAyNC4yODggMjQuNzgwNSAyNC42MDU1TDIxLjcyMjYgMjUuNjQ2OFYzNC4xMDIyQzIwLjUyNjEgMzQuMzc1NCAxOS4yODUyIDM0LjUzMDUgMTguMDE0OCAzNC41MzA1QzE2LjY0ODMgMzQuNTE1NyAxNS4zNDEgMzQuMzQ1OCAxNC4wODU0IDM0LjA0MzFaTTI1LjU4NTYgMzIuNjYyMlYyNC43NjhDMjcuNjY4NCAyNS4yOTIzIDI5LjcyOTIgMjYuMDYwMyAzMS43OTczIDI3LjA2NDZDMzAuMjQ2MiAyOS40MjAzIDI4LjEwNDIgMzEuMzU1MSAyNS41ODU2IDMyLjY2MjJaIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXJfMjIyXzE2NzApIi8+CjxkZWZzPgo8bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXJfMjIyXzE2NzAiIHgxPSIxNy45OTk3IiB5MT0iMzYuNzc4OSIgeDI9IjE3Ljk5OTciIHkyPSItNS41MTk3OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgo8c3RvcCBvZmZzZXQ9IjAuMDg1OCIgc3RvcC1jb2xvcj0iIzhEMjlDMSIvPgo8c3RvcCBvZmZzZXQ9IjAuMjM4MyIgc3RvcC1jb2xvcj0iIzk0MkJCQiIvPgo8c3RvcCBvZmZzZXQ9IjAuNDY2NyIgc3RvcC1jb2xvcj0iI0E5MkZBQyIvPgo8c3RvcCBvZmZzZXQ9IjAuNzQxMyIgc3RvcC1jb2xvcj0iI0NBMzc5MyIvPgo8c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNGMDNGNzciLz4KPC9saW5lYXJHcmFkaWVudD4KPC9kZWZzPgo8L3N2Zz4K',
    async connect() {
      try {
        const provider = this.getProvider()

        const account = await provider.connect()
        if (!account) throw `${PontemWalletName} Account Error`
        return account
      } catch (error) {
        // if (
        //   /(user closed modal|accounts received is empty|user denied account)/i.test(
        //     (error as Error).message,
        //   )
        // )
        console.log('connect error ', error)
        throw error
      }
    },
    async disconnect() {
      try {
        const provider = this.getProvider()
        await provider?.disconnect()
      } catch (error: any) {
        console.log('disconnect error ', error)
        throw error
      }
    },
    async getAccount() {
      try {
        const provider = this.getProvider()
        const account = await provider?.account()
        if (!account) throw `${PontemWalletName} Account Error`
        return account
      } catch (error) {
        console.log('getAccount error ', error)
        throw error
      }
    },
    async onNetworkChange(callback: any) {
      try {
        const provider = this.getProvider()
        const handleNetworkChange = async (
          networkName: NetworkInfo,
        ): Promise<void> => {
          callback(networkName)
        }
        await provider.onNetworkChange(handleNetworkChange)
      } catch (error: any) {
        const errMsg = error.message
        throw errMsg
      }
    },
    getProvider() {
      const pontem = typeof window !== 'undefined' ? window.pontem : undefined
      if (!pontem) {
        throw new Error('Pontem Wallet not found')
      }
      return pontem
    },
    async onAccountChanged(callback: any): Promise<void> {
      try {
        const provider = this.getProvider()
        const handleAccountChange = async (
          newAccount: AccountInfo,
        ): Promise<void> => {
          if (newAccount?.publicKey) {
            callback({
              ...newAccount,
            })
          } else {
            const response = await this.connect()
            callback({
              ...response,
            })
          }
        }
        await provider?.onAccountChange(handleAccountChange)
      } catch (error: any) {
        console.log(error)
        const errMsg = error.message
        throw errMsg
      }
    },

    async network(): Promise<NetworkInfo> {
      try {
        const provider = this.getProvider()
        const response = await provider?.network()
        if (!response) throw `${PontemWalletName} Network Error`
        return response
      } catch (error: any) {
        console.log('network error ', error)
        throw error
      }
    },

    async signAndSubmitTransaction(
      transaction: Types.TransactionPayload,
      options?: any,
    ): Promise<{ hash: Types.HexEncodedBytes }> {
      try {
        const provider = this.getProvider()
        const signer = await this.getAccount()
        const tx = await provider?.generateTransaction(
          signer.address,
          transaction,
          { ...options, max_gas_amount: options?.max_gas_amount?.toString() },
        )
        if (!tx)
          throw new Error(
            'Cannot generate transaction',
          ) as AptosWalletErrorResult
        const response = await provider?.signAndSubmitTransaction(tx)

        if (!response) {
          throw new Error('No response') as AptosWalletErrorResult
        }
        return { hash: response } as { hash: Types.HexEncodedBytes }
      } catch (error: any) {
        console.log('signAndSubmitTransaction error ', error)
        throw error
      }
    },
    //
    async signAndSubmitBCSTransaction(
      transaction: TxnBuilderTypes.TransactionPayload,
      options?: any,
    ): Promise<{ hash: Types.HexEncodedBytes }> {
      try {
        const provider = this.getProvider()
        const serializer = new BCS.Serializer()
        transaction.serialize(serializer)
        const response = await provider?.signAndSubmitBCSTransaction(
          serializer.getBytes().toString(),
          options,
        )
        if ((response as AptosWalletErrorResult).code) {
          throw new Error((response as AptosWalletErrorResult).message)
        }
        return { hash: response } as { hash: Types.HexEncodedBytes }
      } catch (error: any) {
        const errMsg = error.message
        throw errMsg
      }
    },
    async signTransaction(
      transaction: Types.TransactionPayload,
      options?: any,
    ): Promise<Uint8Array | AptosWalletErrorResult> {
      try {
        const provider = this.getProvider()
        const signer = await this.getAccount()
        const tx = await provider?.generateTransaction(
          signer.address,
          transaction,
          options,
        )
        if (!tx)
          throw new Error(
            'Cannot generate transaction',
          ) as AptosWalletErrorResult
        const response = await provider?.signTransaction(tx)
        if (!response) {
          throw new Error('No response') as AptosWalletErrorResult
        }
        return response
      } catch (error: any) {
        throw error
      }
    },
    async signMessage(
      message: SignMessagePayload,
    ): Promise<SignMessageResponse> {
      try {
        const provider = this.getProvider()
        if (typeof message !== 'object' || !message.nonce) {
          ;`${PontemWalletName} Invalid signMessage Payload`
        }
        const response = await provider?.signMessage(message)
        if (response) {
          return response
        } else {
          throw `${PontemWalletName} Sign Message failed`
        }
      } catch (error: any) {
        const errMsg = error.message
        throw errMsg
      }
    },
  }))
}
