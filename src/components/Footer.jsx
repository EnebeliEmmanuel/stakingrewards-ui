import React from "react";
import { SocialIcon } from "react-social-icons";
import logo from "../../images/logo.png";

const Footer = () => (
  <div className="w-full flex md:justify-center justify-between items-center flex-col p-4 gradient-bg-footer">
    <div className="w-full flex sm:flex-row flex-col justify-between items-center my-4">
      <div className="flex flex-[0.5] justify-center items-center">
        <img src={logo} alt="logo" className="w-32" />
      </div>
      <div className="flex flex-1 justify-evenly items-center flex-wrap sm:mt-0 mt-5 w-full">
        <p className="text-white text-base text-center mx-2 cursor-pointer">
          Market
        </p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">
          Exchange
        </p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">
          Staking
        </p>
        <p className="text-white text-base text-center mx-2 cursor-pointer">
          Wallets
        </p>
      </div>
    </div>

    <span>
      <a
        className="text-white  text-xl"
     
        href="mailto:iemmaenebeli@gmail.com"
        target="_blank"
        class="hire-me-content"
      >
        Get intouch <i class="fas fa-arrow-right"></i>
      </a>
    </span>

    <span className="flex space-x-4  my-5">
      <SocialIcon url="https://www.linkedin.com/in/emmanuel-enebeli-07893b1a2/" />
      <SocialIcon url="https://github.com/EnebeliEmmanuel" />
      <SocialIcon url="https://twitter.com/kokocodes_" />
    </span>

    <div className="sm:w-[90%] w-full h-[0.25px] bg-gray-400 mt-5 " />

    <div className="sm:w-[90%] w-full flex justify-between items-center mt-3">
      <p className="text-white text-left text-xs">@koko-codes2022</p>
      <p className="text-white text-right text-xs">All rights reserved</p>
    </div>
  </div>
);

export default Footer;
