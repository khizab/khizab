import {
  useAccount,
  useAccountEffect,
  useBalance,
  useConnect,
  useDisconnect,
} from 'khizab'

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
    </>
  )
}

function Account() {
  const { address, network, status } = useAccount()
  const { disconnect } = useDisconnect()

  return (
    <div>
      <h2>Account</h2>

      <div>
        account: {address?.address}
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
  const { address } = useAccount()

  const { data } = useBalance({ accountAddress: address?.address })

  return (
    <div>
      <h2>Balance</h2>

      <div>APT: {data?.formatted}</div>
    </div>
  )
}

export default App
