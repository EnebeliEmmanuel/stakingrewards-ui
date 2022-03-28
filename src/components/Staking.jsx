import React from "react";
import { useState, useEffect } from "react";
import { ethers } from "ethers";



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
      const erc20 = new ethers.Contract(
        contractInfo.address,
        erc20abi,
        provider
      );

      erc20.on("Transfer", (from, to, amount, event) => {
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
      setContractListened(erc20);

      return () => {
        contractListened.removeAllListeners();
      };
    }
  }, [contractInfo.address]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const erc20 = new ethers.Contract(
      "0xF38AbbDE9ffC9e6178CedC38be273ee531abAf4a",
      erc20abi,
      provider
    );

    const tokenName = await erc20.name();
    const tokenSymbol = await erc20.symbol();
    const totalSupply = await erc20.totalSupply();

    setContractInfo({
      address: "0xF38AbbDE9ffC9e6178CedC38be273ee531abAf4a",
      tokenName,
      tokenSymbol,
      totalSupply,
    });
    setintroMessage("");
  };

  const getMyBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const erc20 = new ethers.Contract(contractInfo.address, erc20abi, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const balance = await erc20.balanceOf(signerAddress);

    setBalanceInfo({
      address: signerAddress,
      balance: String(balance),
    });
  };

  const handleTransfer = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(contractInfo.address, erc20abi, signer);
    await erc20.transfer(data.get("recipient"), data.get("amount"));
  };

  const stakeToken = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const erc20 = new ethers.Contract(contractInfo.address, erc20abi, signer);
    await erc20.stakeToken(data.get("amount"));
  };

  const buyToken = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const erc20 = new ethers.Contract(contractInfo.address, erc20abi, signer);
    const options = { value: ethers.utils.parseEther(data.get("amount")) };
    await erc20.buyToken(options);
  };

  const claimReward = async (e) => {
    e.preventDefault();
    // const data = new FormData(e.target);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const erc20 = new ethers.Contract(contractInfo.address, erc20abi, signer);
    const status = await erc20.claimReward();
  };

  const getMyStakeBalance = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const erc20 = new ethers.Contract(contractInfo.address, erc20abi, provider);
    const signer = await provider.getSigner();
    const signerAddress = await signer.getAddress();
    const balance = await erc20.stakeBalance(signerAddress);

    setuserStakeInfo({
      address: signerAddress,
      balance: String(balance),
    });
  };
const style = {
  ava: `text-xs font-bold text-gray-100`,
};

const Staking = () => {
  return (
    <div className="blue-glassmorphism  h-[45rem] ">
      <div className=" w-55 h-86   space-y-3 px-14">
        <Header />
        <Main />
        <Footer />
      </div>
    </div>
  );
};

const Footer = () => {
  return (
  <footer className="p-4">
              <button
                type="submit"
                className="btn btn-success submit-button focus:ring focus:outline-none w-full"
              >
                Get token info
              </button>
            
            <div className="px-4">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Symbol</th>
                      <th>Total supply</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{contractInfo.tokenName}</th>
                      <td>{contractInfo.tokenSymbol}</td>
                      <td>{String(contractInfo.totalSupply)}</td>
                      <td>{contractInfo.deployedAt}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4">
              <button
                onClick={getMyBalance}
                type="submit"
                className="btn btn-success submit-button focus:ring focus:outline-none w-full"
              >
                Get my balance
              </button>
            </div>
            <div className="px-4">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{balanceInfo.address}</th>
                      <td>{balanceInfo.balance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4">
              <button
                onClick={getMyStakeBalance}
                type="submit"
                className="btn btn-success submit-button focus:ring focus:outline-none w-full"
              >
                Get Stake balance
              </button>
            </div>
            <div className="px-4">
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th>Address</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th>{userStakeInfo.address}</th>
                      <td>{userStakeInfo.balance}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            </footer>
  );
};

const Header = () => {
  return (
    <div className={style.ava} >
      <p>1 KTk = 4000$ </p>
    </div>
  );
};

const Main = () => {
  return (
    <div className=" blue-glassmorphism space-y-3">
      <Circle />
      <AvailableStaked />
      <Payment />
    </div>
  );
};


const Circle =()=> {
  return (
    <div className="flex space-x-6 justify-center items-center">
      <div className=" rounded-full w-52 h-52 bg-white flex justify-center m-16 items-center ">
        <div className="w-44 h-44 rounded-full bg-blue-500 flex justify-center items-center">
          <div className="w-36 h-36 rounded-full bg-blue-900 flex flex-col space-y-1 justify-center items-center">
            <span className="text-sm text-gray-300  ">Total Balance</span>
            <p className="text-bold text-white font-bold text-2xl">89.004</p>
            <p className="text-bold text-white text-sm uppercase self-center font-bold">
              KTK
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


const AvailableStaked =()=>{
  return (
    <div className="flex space-x-6 justify-center items-center">
      <div className="space-y-1">
        <p className={style.ava}>Available</p>
        <p className={style.ava}>Staked</p>
      </div>
      <div className="space-y-1">
        <p className={style.ava}>18.1010(18%)</p>
        <p className={style.ava}>73.4910(1%)</p>
      </div>
    </div>
  );
}

const Payment = () => {
  const pop = () => {
 Swal.fire({
   title: "Buy Token",
   html: `<input type="text" id=" class="" placeholder="Enter Address">
  <input type="text" id="password" class="" placeholder="Enter Amount" >`,
  
   confirmButtonText: "Send",
 })
};
  return (
    <div className="  flex-col flex space-y-4 justify-center items-center  ">
      <div
        onClick={() => pop()}
        className="  w-[18rem] px-[6.5rem] m-4 py-[0.5rem]  bg-blue-500 rounded-lg text-gray-100    font-semibold cursor-pointer"
      >
        Buy Token
      </div>

      <div
        onClick={() => pop()}
        className=" w-[18rem] px-[7.7rem] m-4 cursor-pointer py-[0.4rem] p-14 ring-1  rounded-lg text-gray-100  font-semibold"
      >
        Stake
      </div>
      <div
        onClick={() => pop()}
        className=" w-[18rem] px-[7.7rem] m-4 cursor-pointer py-[0.4rem] p-14  bg-yellow-600 rounded-lg text-gray-100  font-semibold"
      >
        claim
      </div>
      <div
        onClick={() => pop()}
        className=" w-[18rem] px-[7.3rem] m-3 cursor-pointer py-[0.4rem]   bg-red-600 rounded-lg text-gray-100  font-semibold"
      >
        unstake
      </div>
    </div>
  );
};

export default Staking;
