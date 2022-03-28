import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;



const createEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionsContract = new ethers.Contract(
    contractAddress,
    contractABI,
    signer
  );

  return transactionsContract;
};

const buytoken = async (address, tokens) => {
  const contract = createEthereumContract();
  const options = { value: ethers.utils.parseEther(tokens) };
  await contract.buyToken(address, options);
};

const staketoken = async (tokens) => {
  const contract = createEthereumContract();
  await contract.createStake(tokens);
};

const unstaketoken = async (tokens) => {
  const contract = createEthereumContract();
  await contract.removeStake(tokens);
};

const claimtoken = async () => {
  const contract = createEthereumContract();
  try {
    if (await contract.claimReward()) {
      setBalance(balance.add(reward));
      setReward(ethers.BigNumber.from(0));

      success("Reward has been added to Balance");
    }
  } catch (e) {
    error(e.error.message);
  }
};

const checkClaimReward = async ()=> {
   const contract = createEthereumContract();

  try{
   if (await contract.checkRewardDueDate()) {
      // setBalance(balance.add(reward));
      // setReward(ethers.BigNumber.from(0));
      success("Reward has been added to Balance");
    }else{
      alert("Not yet")
    }
  }catch(e){
    console.error(e)
  }
}




export const TransactionsProvider = ({ children }) => {
  const [formData, setformData] = useState({
    addressTo: "",
    amount: "",
    
  });
  const [currentAccount, setCurrentAccount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [transactionCount, setTransactionCount] = useState(
    localStorage.getItem("transactionCount")
  );
  const [transactions, setTransactions] = useState([]);

  const handleChange = (e, name) => {
    setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
  };

  const getAllTransactions = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        console.log("Ethereum is not present");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfWalletIsConnect = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({ method: "eth_accounts" });

      if (accounts.length) {
        setCurrentAccount(accounts[0]);

        getAllTransactions();
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkIfTransactionsExists = async () => {
    try {
      if (ethereum) {
        const transactionsContract = createEthereumContract();
        const currentTransactionCount =
          await transactionsContract.getTransactionCount();

        window.localStorage.setItem(
          "transactionCount",
          currentTransactionCount
        );
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Please install MetaMask.");

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const sendTransaction = async () => {
    try {
      if (ethereum) {
        const { addressTo, amount, keyword, message } = formData;
        const transactionsContract = createEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount);

        await ethereum.request({
          method: "eth_sendTransaction",
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: "0x5208",
              value: parsedAmount._hex,
            },
          ],
        });

        const transactionHash = await transactionsContract.addToBlockchain(
          addressTo,
          parsedAmount,
         
        );

        setIsLoading(true);
        console.log(`Loading - ${transactionHash.hash}`);
        await transactionHash.wait();
        console.log(`Success - ${transactionHash.hash}`);
        setIsLoading(false);

        const transactionsCount =
          await transactionsContract.getTransactionCount();

        setTransactionCount(transactionsCount.toNumber());
        window.location.reload();
      } else {
        console.log("No ethereum object");
      }
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  useEffect(() => {
    checkIfWalletIsConnect();
    checkIfTransactionsExists();
  }, [transactionCount]);

 const [contractInfo, setContractInfo] = useState({
   address: "-",
   tokenName: "-",
   tokenSymbol: "-",
   totalSupply: "-",
 });
 const [balanceInfo, setBalanceInfo] = useState({
   address: "-",
   balance: "-",
 });
 const [userStakeInfo, setuserStakeInfo] = useState({
   address: "-",
   balance: "-",
 });

  useEffect(() => {
    if (contractInfo.address !== "-") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const kokoToken = new ethers.Contract(
        contractInfo.contractAddress,
        contractABI,
        provider
      );

      kokoToken.on("Transfer", (from, to, amount, event) => {
        console.log({ from, to, amount, event });

        setTxs((currentTxs) => [
          ...currentTxs,
          {
            txHash: event.transactionHash,
            from,
            to,
            amount: String(amount),
          },
        ]);
      });
      setContractListened(kokoToken);

      return () => {
        contractListened.removeAllListeners();
      };
    }
  }, [contractInfo.contractAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const kokoToken = new ethers.Contract(
      "0xCEf919F936357cf177BC4B23Bc7b6C58cE82c616",
      kokoToken,
      provider
    );

    const tokenName = await kokoToken.name();
    const tokenSymbol = await kokoToken.symbol();
    const totalSupply = await kokoToken.totalSupply();

    setContractInfo({
      address: "0xCEf919F936357cf177BC4B23Bc7b6C58cE82c616",
      tokenName,
      tokenSymbol,
      totalSupply,
    });
    setintroMessage("");
  };

   const  getMyBalance = async () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    await provider.send("eth_requestAccounts", []);
    const kokoToken = new ethers.Contract(contractInfo.address, contractAbi, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const balance = await kokoToken.balanceOf(signerAddress);

    setBalanceInfo({
      address: signerAddress,
      balance: String(balance),
    });
  };
const getMyStakeBalance = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const kokoToken = new ethers.Contract(contractInfo.contractAddress, contractABI, provider);
  const signer = await provider.getSigner();
  const signerAddress = await signer.getAddress();
  const balance = await kokoToken.stakeOf(signerAddress);

  setuserStakeInfo({
    address: signerAddress,
    balance: String(balance),
  });
};




  return (
    <TransactionContext.Provider
      value={{
        transactionCount,
        connectWallet,
        transactions,
        currentAccount,
        isLoading,
        sendTransaction,
        handleChange,
        formData,
        buytoken,
        staketoken,
        unstaketoken,
        claimtoken,
      checkClaimReward,
        getMyStakeBalance,
        getMyBalance,
        handleSubmit,
        contractInfo,
  
        userStakeInfo,
        contractAddress,
       
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
