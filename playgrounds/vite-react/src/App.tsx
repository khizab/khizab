import {
  useAccount,
  useAccountEffect,
  useBalance,
  useConnect,
  useDisconnect,
  useWriteContract,
} from 'khizab'

import {
  increaseAbi,
  useReadIncreaseViewCount,
  useWriteIncrease,
  useWriteIncreaseRaiseC,
} from './generated'

function App() {
  useAccountEffect({
    onConnect(data) {
      console.log('onConnect', data)
    },
    onDisconnect() {
      console.log('onDisconnect')
    },
  })

  return (
    <>
      <Account />
      <Connect />
      <Balance />
      <WriteContract />
      <Increase />
    </>
  )
}

function Account() {
  const { account, network, status } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {account?.address}
        <br />
        chainId: {network?.name}
        <br />
        status: {status}
      </div>

      {status !== 'disconnected' && (
        <button type="button" onClick={() => disconnect()}>
          Disconnect
        </button>
      )}
    </div>
  )
}

function Connect() {
  const { connectors, connect, status, error } = useConnect()

  return (
    <div>
      <h2>Connect</h2>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          type="button"
        >
          {connector.name}
        </button>
      ))}
      <div>{status}</div>
      <div>{error?.message}</div>
    </div>
  )
}

function Balance() {
  const { account } = useAccount()

  const { data } = useBalance({ accountAddress: account?.address })

  return (
    <div>
      <h2>Balance</h2>

      <div>APT: {data?.formatted}</div>
    </div>
  )
}

function WriteContract() {
  const { writeContract } = useWriteContract()

  return (
    <div>
      <h2>Write Contract</h2>

      <button
        type="button"
        onClick={() => {
          writeContract({
            abi: increaseAbi,
            functionName: 'raise_c',
            args: [],
          })
        }}
      >
        Increase
      </button>
    </div>
  )
}

function Increase() {
  const { account } = useAccount()

  const { data: count, status } = useReadIncreaseViewCount({
    args: [account?.address!],
  })
  const { writeContractAsync } = useWriteIncreaseRaiseC()
  const { writeContract } = useWriteIncrease()

  return (
    <div>
      <h2>Incraese Contract</h2>

      <div>Count: {count ? Number(count[0]) : status}</div>
      <button
        type="button"
        onClick={async () => {
          writeContract({
            functionName: 'create_counter',
          })

          await writeContractAsync({})
        }}
      >
        Increase
      </button>
    </div>
  )
}

export default App
