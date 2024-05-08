import web3 from "./web3";
import Crowdfunding from "./build/Crowdfunding.json" assert { type: "json" };

export default (address: string | string[] | undefined) => {
  if (web3) {
    if (typeof address === "string") {
      return new web3.eth.Contract(Crowdfunding.abi, address);
    } else {
      throw new Error("Address must be a string");
    }
  } else {
    throw new Error("Web3 is not initialized");
  }
};
