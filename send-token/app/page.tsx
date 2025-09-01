'use client';
import { useState } from 'react';
import { transferToken } from '../utils/transfer';

export default function Home() {
  const [token, setToken] = useState('');
  const [amount, setAmount] = useState('');
  const [network, setNetwork] = useState('sepolia');
  const [status, setStatus] = useState('');

  const networkRpc: Record<string, string> = {
    sepolia: process.env.RPC_SEPOLIA!,
    ethereum: process.env.RPC_ETHEREUM!,
    polygon: process.env.RPC_POLYGON!
  };

  async function handleTransfer() {
    setStatus('⏳ Processing...');
    try {
      const tx = await transferToken({
        tokenAddress: token,
        amount,
        rpcUrl: networkRpc[network]
      });
      setStatus(`✅ Tx sent: ${tx.hash}`);
    } catch (err: any) {
      setStatus(`❌ Error: ${err.message}`);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0f0f2f',
      color: '#f0f0f0',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <h1 style={{ marginBottom: '20px' }}>ERC-20 Token Transfer</h1>

      <input
        placeholder="Token Address"
        value={token}
        onChange={e => setToken(e.target.value)}
        style={{
          padding: '12px',
          marginBottom: '12px',
          width: '300px',
          borderRadius: '8px',
          border: '1px solid #555',
          background: '#1c1c3a',
          color: '#fff'
        }}
      />

      <input
        placeholder="Amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        style={{
          padding: '12px',
          marginBottom: '12px',
          width: '300px',
          borderRadius: '8px',
          border: '1px solid #555',
          background: '#1c1c3a',
          color: '#fff'
        }}
      />

      <select
        value={network}
        onChange={e => setNetwork(e.target.value)}
        style={{
          padding: '12px',
          marginBottom: '20px',
          width: '320px',
          borderRadius: '8px',
          border: '1px solid #555',
          background: '#1c1c3a',
          color: '#fff'
        }}
      >
        <option value="sepolia">Sepolia</option>
        <option value="ethereum">Ethereum</option>
        <option value="polygon">Polygon</option>
      </select>

      <button
        onClick={handleTransfer}
        style={{
          padding: '14px 40px',
          borderRadius: '10px',
          border: 'none',
          background: '#4caf50',
          color: '#fff',
          fontSize: '16px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        Transfer
      </button>

      <div style={{
        padding: '12px 20px',
        borderRadius: '8px',
        background: '#1c1c3a',
        minHeight: '40px',
        width: '320px',
        textAlign: 'center'
      }}>
        {status}
      </div>
    </div> 
  );
}