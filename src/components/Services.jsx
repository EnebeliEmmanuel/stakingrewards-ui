import React, { useContext } from "react";
import { BsShieldFillCheck } from "react-icons/bs";
import { BiSearchAlt } from "react-icons/bi";
import { RiHeart2Fill } from "react-icons/ri";
import { TransactionContext } from "../context/TransactionContext";

const style = {
  ava: `text-xs font-bold text-gray-100`,
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
  const { buytoken, staketoken, unstaketoken, claimtoken } =
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
        html: "<p>Claim your rewards and check your balance</p>",
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
        onClick={() => pop("claim")}
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
        <ServiceCard
          color="bg-[#2952E3]"
          title="Security gurantee"
          icon={<BsShieldFillCheck fontSize={18} className="text-white" />}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
        />
        <ServiceCard
          color="bg-[#8945F8]"
          title="Best exchange rates"
          icon={<BiSearchAlt fontSize={18} className="text-white" />}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
        />
        <ServiceCard
          color="bg-[#F84550]"
          title="Fastest transactions"
          icon={<RiHeart2Fill fontSize={18} className="text-white" />}
          subtitle="Security is guranteed. We always maintain privacy and maintain the quality of our products"
        />
        <ServiceCard
          color="bg-[#2952E3]"
          title="Transaction History"
          icon={<BsShieldFillCheck fontSize={18} className="text-white" />}
          subtitle="View logs and recieve a printout of all your transactions in your inbox at the click of a button"
        />
  
      </div>
    </div>
  </div>
);

export default Services;
