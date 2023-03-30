// import required modules
// the essential modules to interact with frontend are below imported.
// ethers is the core module that makes RPC calls using any wallet provider like Metamask which is esssential to interact with Smart Contract
import { ethers } from "ethers";

import { ConnectButton } from '@rainbow-me/rainbowkit';
// react hooks for setting and changing states of variables
import { useEffect, useState } from 'react';
import { useProvider, useAccount, useContractRead } from 'wagmi'
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi'

export default function Home() {
  // env variables are initalised
  // contractAddress is deployed smart contract addressed 
  const contractAddress = "0xe006385f1aE0CC5D163Ff349C2aEce5143b8b92e";
  // const contractAddress = process.env.CONTRACT_ADDRESS;
  // application binary interface is something that defines structure of smart contract deployed.
  const abi = [
    {
    "inputs": [],
    "name": "readNum",
    "outputs": [
        {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
    },
    {
    "inputs": [
        {
        "internalType": "uint256",
        "name": "_num",
        "type": "uint256"
        }
    ],
    "name": "writeNum",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
    }
];


  // response from read operation is stored in the below variable
  const [storedNumber, setStoredNumber] = useState();

  // the value entered in the input field is stored in the below variable
  const [enteredNumber, setEnteredNumber] = useState(0);
  const provider = useProvider();
  const signer = useAccount();


  const { data, isError, isLoading } = useContractRead({
    address: contractAddress,
    abi: abi,
    functionName: 'readNum',
    watch: true,
  })

  function handleForm(e) {
    setEnteredNumber(e.target.value)
  }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  async function readNumber() {
    if(isError){
      console.log(isError)
    }
    else{
    setStoredNumber(parseInt(data))
    console.log(parseInt(data))
    }
  }




  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: 'writeNum',
    args: [enteredNumber]
  })
  const { data: writeNumFunc, isLoading: writeNumLoading, isSuccess, write } = useContractWrite({
    ...config,

    onSuccess(data) {
      console.log('Success', data)
    },
  })
  const waitForTransaction = useWaitForTransaction({
    hash: writeNumFunc?.hash,
  })

  async function writeNumber() {
    await write();
  }

  useEffect(() => {
    readNumber()
    console.log("Wait for transaction " + JSON.stringify(waitForTransaction))
  }, [readNumber, waitForTransaction])


  return (
    <div className='m-6 space-y-4 h-full'>
      <div className="flex p-7 ">
        <h1 className="text-gray-700 text-3xl font-bold">
          Storage Frontend Demo
        </h1>
        <div className="ml-auto">
          <ConnectButton />
        </div>
      </div>
      <div className="flex align-middle p-10 m-10 bg-white rounded-xl shadow-lg ">
        <h3 className="text-xl py-2 px-4">The Current Stored Number is <span className="font-bold ml-6">{storedNumber}</span></h3>
        <button className="ml-auto mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded " onClick={readNumber}>Reload</button>
      </div>

      {signer.address ?

        (<div className="p-10 m-10 bg-white rounded-xl shadow-lg ">
          <h3 className="mb-10 text-lg py-2 px-4">Store your Favourite Number</h3>
          <div className="flex align-middle ">
            <input type="text" placeholder="Enter a Number" value={enteredNumber == 0 ? "" : enteredNumber} onChange={handleForm} className="placeholder:italic placeholder:text-slate-400 block bg-white w-5/6 border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm" />
            <button className=" ml-auto mr-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" disabled={!write || waitForTransaction.isLoading || writeNumLoading} onClick={writeNumber}>
              {waitForTransaction.isLoading ? <div>Transacting..... </div> : (writeNumLoading ? <div>Check Wallet</div> : "Store")}
            </button>

          </div>
        </div>)
        :
        (
          <div className="flex justify-center">
            <div className="bg-white p-10 m-10 rounded-lg shadow-lg">
              <ConnectButton  label="CONNECT TO INTERACT"/>
            </div>
          </div>
        )
      }

    </div >
  )
}