import web3 from "./web3";
import compiledFactory from "../ethereum/build/CrowdfundingFactory.json" assert { type: "json" };

let instance;

if (web3) {
  instance = new web3.eth.Contract(
    compiledFactory.abi,
    "0xDDF1C55441acEf0a062BB3eF660674c12AcA4cfD"
  );
}

export default instance;
