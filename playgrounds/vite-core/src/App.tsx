import {
  GetBalanceReturnType,
  connect,
  disconnect,
  getBalance,
  readContract,
  readContracts,
  reconnect,
  writeContract,
} from '@khizab/core'
import * as React from 'react'

import { getAccount } from '@khizab/core'
import { watchAccount } from '@khizab/core'
import { config } from './khizab'
import { abi } from './abi'
import { CommittedTransactionResponse } from '@aptos-labs/ts-sdk'

function App() {
  React.useEffect(() => {
    reconnect(config)
  }, [])

  return (
    <>
      <Account />
      <Connect />
      <Balance />
      <ReactContract />
      <ReactContracts />
      <WriteContract />
    </>
  )
}

// <Balance />
function Account() {
  const [account, setAccount] = React.useState(getAccount(config))

  React.useEffect(() => {
    return watchAccount(config, {
      onChange(data) {
        setAccount(data)
      },
    })
  }, [setAccount])

  return (
    <div>
      <h2>Account</h2>
      <div>
        account: {account.account?.publicKey}
        <br />
        Network: {account.network?.id} ({account.network?.name})
        <br />
        status: {account.status}
      </div>

      {account.status === 'connected' && (
        <button
          type="button"
          onClick={() => {
            disconnect(config)
          }}
        >
          Disconnect
        </button>
      )}
    </div>
  )
}

function Connect() {
  const [, rerender] = React.useReducer((count) => count + 1, 0)

  React.useEffect(() => {
    return config.subscribe(({ connections }) => connections, rerender)
  }, [rerender])

  return (
    <div>
      {config.connectors.map((connector) => (
        <button
          disabled={config.state.connections.has(connector.uid)}
          id={connector.uid}
          key={connector.uid}
          onClick={async () => await connect(config, { connector })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
    </div>
  )
}

function Balance() {
  const [account, setAccount] = React.useState(getAccount(config))

  React.useEffect(() => {
    return watchAccount(config, {
      onChange(data) {
        setAccount(data)
      },
    })
  }, [setAccount])

  /////////////////////////////////////////////////////////

  const [balance, setBalance] = React.useState<
    GetBalanceReturnType | undefined
  >()
  const [usdt, setUsdt] = React.useState<GetBalanceReturnType | undefined>()

  React.useEffect(() => {
    const get = async () => {
      if (!account.account) return
      try {
        const balance = await getBalance(config, {
          accountAddress: account.account.address as `0x${string}`,
        })
        const usdt = await getBalance(config, {
          accountAddress: account.account.address as `0x${string}`,
          coinType:
            '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::coins::USDT',
        })
        setBalance(balance)
        setUsdt(usdt)
      } catch (error) {
        console.error('Error fetching balance', error)
      }
    }

    get()
  }, [account.account, setBalance, setUsdt])

  return (
    <div>
      <h2>Balance</h2>
      <div>APT: {balance?.formatted}</div>
      <div>USDT: {usdt?.formatted}</div>
    </div>
  )
}

function ReactContract() {
  const [, rerender] = React.useReducer((count) => count + 1, 0)
  const [account, setAccount] = React.useState(getAccount(config))

  const [todoListCount, setTodoListCount] = React.useState<bigint>()

  React.useEffect(() => {
    return watchAccount(config, {
      onChange(data) {
        setAccount(data)
      },
    })
  }, [setAccount])

  React.useEffect(() => {
    return config.subscribe(
      ({ connections, current }) => ({ connections, current }),
      rerender,
    )
  }, [rerender])

  // biome-ignore lint/nursery/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    const get = async () => {
      if (!account.account) return

      const [count] = await readContract(config, {
        abi: abi,
        functionName: 'get_todo_list_counter',
        args: [account.account.address],
      })
      setTodoListCount(count)
    }
    get()
  }, [account.account])

  return (
    <div>
      <h2>ReadContract</h2>
      <div>
        {account.status === 'connected' ? (
          <div>{todoListCount?.toString()}</div>
        ) : (
          <h4>Connect your wallet first</h4>
        )}
      </div>
    </div>
  )
}

function ReactContracts() {
  const [, rerender] = React.useReducer((count) => count + 1, 0)
  const [account, setAccount] = React.useState(getAccount(config))

  const [todos, setTodos] = React.useState<number[]>()

  React.useEffect(() => {
    return watchAccount(config, {
      onChange(data) {
        setAccount(data)
      },
    })
  }, [setAccount])

  React.useEffect(() => {
    return config.subscribe(
      ({ connections, current }) => ({ connections, current }),
      rerender,
    )
  }, [rerender])

  // biome-ignore lint/nursery/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    const get = async () => {
      if (!account.account) return
      const res = await readContracts(config, {
        abi,
        payloads: [
          {
            functionName: 'get_todo_list_counter',
            args: [account.account.address as `0x${string}`],
          },
          {
            functionName: 'get_todo_list_counter',
            args: [account.account.address as `0x${string}`],
          },
          {
            functionName: 'get_todo_list_counter',
            args: [account.account.address as `0x${string}`],
          },
        ],
      })
      if (!res.length) return
      const _todos = res.map((todo) => Number(todo[0]))
      setTodos(_todos)
    }
    get()
  }, [account.account])

  return (
    <div>
      <div>
        <h2>ReactContracts</h2>
      </div>
      <div>
        {account.status === 'connected' ? (
          <>
            {todos?.map((todo, index) => (
              <div key={index}>{todo}</div>
            ))}
          </>
        ) : (
          <h2 style={{ textAlign: 'center' }}>Connect your wallet first</h2>
        )}
      </div>
    </div>
  )
}

function WriteContract() {
  const [, rerender] = React.useReducer((count) => count + 1, 0)
  const [account, setAccount] = React.useState(getAccount(config))

  const [createTodoResult, setCreateTodoResult] =
    React.useState<CommittedTransactionResponse>()

  React.useEffect(() => {
    return watchAccount(config, {
      onChange(data) {
        setAccount(data)
      },
    })
  }, [setAccount])

  React.useEffect(() => {
    return config.subscribe(
      ({ connections, current }) => ({ connections, current }),
      rerender,
    )
  }, [rerender])

  const createTodo = async () => {
    if (!account.account?.address) return

    const res = await writeContract(config, {
      abi: abi,
      functionName: 'create_todo_list',
      args: [],
    })
    setCreateTodoResult(res)
    console.log({ res })
  }

  return (
    <div>
      <h2>WriteContract</h2>
      <div>
        {account.status === 'connected' ? (
          <div>
            <button type="button" onClick={() => createTodo()}>
              Create Todo List
            </button>
            {createTodoResult && <span>{createTodoResult.hash}</span>}
          </div>
        ) : (
          <h2 style={{ textAlign: 'center' }}>Connect your wallet first</h2>
        )}
      </div>
    </div>
  )
}

export default App
