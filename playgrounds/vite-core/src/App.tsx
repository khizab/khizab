import {
  GetBalanceReturnType,
  connect,
  disconnect,
  getBalance,
  readContract,
  readContracts,
  reconnect,
} from '@khizab/core'
import * as React from 'react'

import { getAccount } from '@khizab/core'
import { watchAccount } from '@khizab/core'
import { config } from './khizab'
import { abi } from './abi'

function App() {
  React.useEffect(() => {
    reconnect(config)
  }, [])

  return (
    <>
      <Account />
      <Connect />
      <Balance />
      <DApp />
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
        account: {account.address?.publicKey}
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
      if (!account.address) return
      try {
        const balance = await getBalance(config, {
          accountAddress: account.address.address as `0x${string}`,
        })
        const usdt = await getBalance(config, {
          accountAddress: account.address.address as `0x${string}`,
          coinType:
            '0x43417434fd869edee76cca2a4d2301e528a1551b1d719b75c350c3c97d15b8b9::coins::USDT',
        })
        setBalance(balance)
        setUsdt(usdt)
        console.log({ balance })
      } catch (error) {
        console.error('Error fetching balance', error)
      }
    }

    get()
  }, [account.address, setBalance, setUsdt])

  return (
    <div>
      <h2>Balance</h2>
      <div>APT: {balance?.formatted}</div>
      <div>USDT: {usdt?.formatted}</div>
    </div>
  )
}

function DApp() {
  const [, rerender] = React.useReducer((count) => count + 1, 0)
  const [account, setAccount] = React.useState(getAccount(config))

  const [todoListCount, setTodoListCount] = React.useState<bigint>()
  const [currentList, setCurrentList] = React.useState<bigint>()
  const [todosCount, setTodosCount] = React.useState<bigint>()
  const [todos, setTodos] =
    React.useState<{ todo: string; isCompleted: boolean }[]>()

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
      if (!account.address) return

      const [count] = await readContract(config, {
        abi: abi,
        functionName: 'get_todo_list_counter',
        args: [account.address.address as `0x${string}`],
      })
      setTodoListCount(count)
    }
    get()
  }, [account.address])

  // biome-ignore lint/nursery/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    console.log({ currentList })

    const get = async () => {
      if (!account.address || currentList === undefined) return

      const [_, count] = await readContract(config, {
        abi: abi,
        functionName: 'get_todo_list',
        args: [account.address.address as `0x${string}`, currentList],
      })
      setTodosCount(count)
    }
    get()
  }, [currentList])

  // biome-ignore lint/nursery/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    const get = async () => {
      console.log({ currentListTodosCount: todosCount })

      if (!account.address || currentList === undefined || !todosCount) return

      const todosPayload: any = Array.from({
        length: Number(todosCount),
      }).map((_, i) => ({
        abi: abi,
        name: 'get_todo',
        args: [account.address?.address as `0x${string}`, currentList, i],
      }))

      const res = await readContracts(config, { payloads: todosPayload })
      if (!res.length) return
      const _todos = res.map((todo) => ({
        todo: String(todo[0]),
        isCompleted: Boolean(todo[1]),
      }))
      setTodos(_todos)
    }
    get()
  }, [todosCount])

  return (
    <div className="dapp-container">
      <div>
        <h2>Todo DApp</h2>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {account.status === 'connected' ? (
          <>
            <div>Select a List or create a new one:</div>
            <div style={{ display: 'flex', gap: 10 }}>
              {Array.from({ length: Number(todoListCount) }).map((_, index) => (
                <button
                  type="button"
                  onClick={() => setCurrentList(BigInt(index))}
                  key={index}
                >
                  List #{index + 1} {index === Number(currentList) && '✅'}
                </button>
              ))}
              <button
                type="button"
                style={{
                  backgroundColor: 'blue',
                }}
              >
                generate new list
              </button>
            </div>
            {!!todos?.length && (
              <ul>
                <h3> List #{Number(currentList) + 1} Todos</h3>
                {todos.map((todo) => (
                  <li key={todo.todo}>
                    <div>NAME: {todo.todo}</div>
                    <div>
                      <span>COMPLETED:</span>
                      {todo.isCompleted ? (
                        '✅'
                      ) : (
                        <input
                          type="checkbox"
                          value={Number(todo.isCompleted)}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </>
        ) : (
          <h2 style={{ textAlign: 'center' }}>Connect your wallet first</h2>
        )}
      </div>
    </div>
  )
}

export default App
