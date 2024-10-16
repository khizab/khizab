import {
  createConnector,
  type PluginProvider,
  type AptosWalletErrorResult,
} from '@khizab/core'
import type {
  AccountInfo,
  NetworkInfo,
  SignMessagePayload,
  SignMessageResponse,
  WalletName,
} from '@aptos-labs/wallet-adapter-core'
import { BCS, TxnBuilderTypes, Types } from 'aptos'

interface PetraProvider extends PluginProvider {
  signTransaction(
    transaction: any,
    options?: any,
  ): Promise<Uint8Array | AptosWalletErrorResult>
  signAndSubmitBCSTransaction: (
    transaction: string,
    options?: any,
  ) => Promise<Types.HexEncodedBytes | AptosWalletErrorResult>
  changeNetwork: (nodeUrl: string) => Promise<string>
  addNetwork: (nodeUrl: string) => Promise<string>
  getChainId: () => Promise<number>
}

interface PetraWindow extends Window {
  petra?: PetraProvider
}

declare const window: PetraWindow

export const PetraWalletName = 'Petra' as WalletName<'Petra'>

petraWallet.type = 'petraWallet' as const
export function petraWallet() {
  type Provider = PetraProvider
  type Properties = {}

  return createConnector<Provider, Properties>((_config) => ({
    id: 'petra-wallet',
    name: PetraWalletName,
    type: petraWallet.type,
    icon: 'data:image/png;base64,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',
    async connect() {
      try {
        const provider = this.getProvider()

        const account = await provider.connect()
        if (!account) throw `${PetraWalletName} Account Error`
        return account
      } catch (error) {
        console.log('Error', error)
        throw error
      }
    },
    async disconnect() {
      try {
        const provider = this.getProvider()
        await provider?.disconnect()
      } catch (error: any) {
        console.log('Error', error)
        throw error
      }
    },
    async getAccount() {
      try {
        const provider = this.getProvider()
        const account = await provider?.account()
        if (!account) throw `${PetraWalletName} Account Error`
        return account
      } catch (error) {
        console.log('Error', error)
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
      const petra = typeof window !== 'undefined' ? window.petra : undefined
      if (!petra) {
        throw new Error('Petra Wallet not found')
      }
      return petra
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
        if (!response) throw `${PetraWalletName} Network Error`
        return response
      } catch (error: any) {
        console.log('Error', error)
        throw error
      }
    },

    async signAndSubmitTransaction({ payload, options }) {
      try {
        const provider = this.getProvider()

        const tx = {
          arguments: payload.functionArguments,
          function: payload.function,
          type: 'entry_function_payload',
          type_arguments: payload.typeArguments,
        }

        const response = await provider?.signAndSubmitTransaction(tx, options)

        if (!response) {
          throw new Error('No response') as AptosWalletErrorResult
        }
        return response
      } catch (error: any) {
        console.log('error in signAndSubmitTransaction ', error)
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
    async signMessage(
      message: SignMessagePayload,
    ): Promise<SignMessageResponse> {
      try {
        const provider = this.getProvider()
        if (typeof message !== 'object' || !message.nonce) {
          ;`${PetraWalletName} Invalid signMessage Payload`
        }
        const response = await provider?.signMessage(message)
        if (response) {
          return response
        } else {
          throw `${PetraWalletName} Sign Message failed`
        }
      } catch (error: any) {
        const errMsg = error.message
        throw errMsg
      }
    },
  }))
}
