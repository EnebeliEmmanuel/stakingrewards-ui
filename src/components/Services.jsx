import React, { useContext } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { TransactionContext } from "../context/TransactionContext";

const style = {
  ava: `text-xs font-bold text-gray-100`,
};

{
  /*class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}
*/
}
const Reservation = () => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <div>
        <form className="m-4" onSubmit={"handleSubmit"}>
          <div className="credit-card w-full lg:w-4/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
            <main className="mt-4 p-4">
              {/* {introMessage === "" && (
                <h1 className="text-xl font-semibold text-gray-700 text-center">
                  Read From Smart Contract
                </h1>
              )} */}
              <p className="text-xl font-semibold text-gray-700 text-center">
                {"introMessage"}
              </p>
              {/* <div className="">
                <div className="my-3">
                  <input
                    type="text"
                    name="addr"
                    className="input input-bordered block w-full focus:ring focus:outline-none"
                    placeholder="ERC20 contract address"
                  />
                </div>
              </div> */}
            </main>
            <footer className="p-4">
              <button
                type="submit"
                className="btn btn-success submit-button focus:ring focus:outline-none w-full"
              >
                Get token info
              </button>
            </footer>
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
                      <th>{"contractInfo.tokenName"}</th>
                      <td>{"contractInfo.tokenSymbol"}</td>
                      <td>{"String(contractInfo.totalSupply)"}</td>
                      <td>{"contractInfo.deployedAt"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4">
              <button
                onClick={"getMyBalance"}
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
                      <th>{"balanceInfo.address"}</th>
                      <td>{"balanceInfo.balance"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="p-4">
              <button
                onClick={"getMyStakeBalance"}
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
                      <th>{"userStakeInfo.address"}</th>
                      <td>{"userStakeInfo.balance"}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>

        {/* <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <div className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Recent transactions
            </h1>
            <p>
              <TxList txs={txs} />
            </p>
          </div>
        </div> */}
      </div>
      <div>
        <div className="m-4 credit-card w-full lg:w-3/4 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
          <div className="mt-4 p-4">
            <h1 className="text-xl font-semibold text-gray-700 text-center">
              Write to Smart Contract
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};
const Staking = () => {
  return (
    <div className="blue-glassmorphism  h-[34rem] ">
      <div className="   px-1">
        <Header />
        <Main />
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className={style.ava}>
      <p>1 KTk = 4000$ </p>
    </div>
  );
};

const Main = () => {
  return (
    <div className="  ">
      <Circle />
      <AvailableStaked />
      <Payment />
    </div>
  );
};

const Circle = () => {
  return (
    <div className="flex space-x-6 justify-center items-center">
      <div className=" rounded-full w-52 h-52 bg-white flex justify-center  items-center ">
        <div className="w-44 h-44 rounded-full bg-blue-500 flex justify-center items-center">
          <button className="w-36 h-36 rounded-full bg-blue-900 flex flex-col space-y-1 justify-center items-center hover:bg-[#017701]">
            <span className="text-sm text-gray-300  ">Total Balance</span>

            <p className="text-bold text-white text-sm uppercase self-center font-bold">
              KTK
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

const AvailableStaked = () => {
  return (
    <div className="flex flex-row  justify-center items-center">
      <div className="space-x-8 m-[0.5rem] flex flex-row ">
        <div className="  px-2  py-[0.5rem] p-8   bg-blue-500 rounded-lg text-gray-100    font-semibold cursor-pointer hover:bg-[#1a37a1]">
          Available
        </div>
        <div className="px-2  py-[0.5rem] p-8   bg-blue-500 rounded-lg text-gray-100  hover:bg-[#1a37a1]  font-semibold cursor-pointer">
          Staked
        </div>
      </div>
    </div>
  );
};

const Payment = () => {
  const { buytoken, staketoken, unstaketoken, claimtoken, checkClaimReward } =
    useContext(TransactionContext);
  const pop = async (type) => {
    if (type === "buy") {
      const { value: formValues } = await Swal.fire({
        title: "Buy KTK",
        html:
          '<input type="text" id="address" class="" placeholder="Enter Address">' +
          '<input type="text" id="amount" class="" placeholder="Enter Amount">',
        focusConfirm: false,
        preConfirm: () => {
          return [
            document.getElementById("address").value,
            document.getElementById("amount").value,
          ];
        },
      });
      if (formValues) {
        buytoken(formValues[0], formValues[1]);
      }
    } else if (type === "stake") {
      const { value: formValues } = await Swal.fire({
        title: "Stake KTK",
        html: '<input type="text" id="amount" class="" placeholder="Enter Amount">',
        focusConfirm: false,
        preConfirm: () => {
          return [document.getElementById("amount").value];
        },
      });
      if (formValues) {
        staketoken(parseInt(formValues[0]));
      }
    } else if (type === "unstake") {
      const { value: formValues } = await Swal.fire({
        title: "Unstake KTK",
        html: '<input type="text" id="amount" class="" placeholder="Enter Amount">',
        focusConfirm: false,
        preConfirm: () => {
          return [document.getElementById("amount").value];
        },
      });
      if (formValues) {
        unstaketoken(formValues[0]);
      }
    } else if (type === "claim") {
      await Swal.fire({
        title: "Claim Your Stake Rewards",
        html: "<p>Claim your rewards and check your balance</p> ",
      });
      claimtoken();
    }
  };

  return (
    <div className=" flex   flex-col space-py-3 justify-center items-center  ">
      <div
        onClick={() => pop("buy")}
        className="  w-[18rem] px-[6.5rem] m-3 py-[0.5rem]  bg-blue-500 rounded-lg text-gray-100  hover:bg-[#1a37a1]  font-semibold cursor-pointer"
      >
        Buy Token
      </div>

      <div
        onClick={() => pop("stake")}
        className=" w-[18rem] px-[7.7rem] m-4 cursor-pointer py-[0.4rem] p-14 ring-1  rounded-lg text-gray-100  font-semibold"
      >
        Stake
      </div>
      <div
        onClick={() => checkClaimReward}
        className=" w-[18rem] px-[7.7rem] m-4 cursor-pointer py-[0.4rem] p-14  bg-yellow-600 rounded-lg text-gray-100 hover:bg-[#017701] font-semibold"
      >
        claim
      </div>
      <div
        onClick={() => pop("unstake")}
        className=" w-[18rem] px-[7.3rem] m-3 cursor-pointer py-[0.4rem]   bg-red-600 rounded-lg text-gray-100 hover:bg-[#dd0202] font-semibold"
      >
        unstake
      </div>
    </div>
  );
};

const ServiceCard = ({ color, title, icon, subtitle }) => (
  <div className="flex flex-row justify-start items-start white-glassmorphism p-3 m-2 cursor-pointer hover:shadow-xl">
    <div
      className={`w-10 h-10 rounded-full flex justify-center items-center ${color}`}
    >
      {icon}
    </div>
    <div className="ml-5 flex flex-col flex-1">
      <h3 className="mt-2 text-white text-lg">{title}</h3>
      <p className="mt-1 text-white text-sm md:w-9/12">{subtitle}</p>
    </div>
  </div>
);

const Services = () => (
  <div className="flex w-full justify-center items-center gradient-bg-services">
    <div className="flex mf:flex-row flex-col items-center justify-between md:p-20 py-12 px-4">
      <div className="flex-1 flex flex-col justify-start items-start">
        <Staking />
      </div>

      <div className="flex-1 flex flex-col justify-start items-center">
        <Reservation />
      </div>
    </div>
  </div>
);

export default Services;
