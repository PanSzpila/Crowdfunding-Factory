import web3 from "./web3";
import { Contract } from "web3-eth-contract";
import compiledFactory from "./build/CrowdfundingFactory.json" assert { type: "json" };

let instance: Contract<any> | null = null;

if (web3) {
  instance = new web3.eth.Contract(
    compiledFactory.abi,
    "0xDDF1C55441acEf0a062BB3eF660674c12AcA4cfD"
  );
}

export default instance;
