// run the file: node --env-file=.env deploy.js

import HDWalletProvider from "@truffle/hdwallet-provider";
import { Web3 } from "web3";
import compiledFactory from "../ethereum/build/CrowdfundingFactory.json" assert { type: "json" };
//import compiledCrowdfunding from "../ethereum/build/Crowdfunding.json" assert { type: "json" };

const provider = new HDWalletProvider(
  process.env.ACCOUNT_SRP,
  process.env.NETWORK_URL + process.env.NETWORK_API_KEY
);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log("Attempting to deploy from account", accounts[0]);

  const result = await new web3.eth.Contract(compiledFactory.abi)
    .deploy({ data: compiledFactory.evm.bytecode.object })
    .send({ gas: "1500000", from: accounts[0] });

  console.log("Contract deployed to", result.options.address);
  provider.engine.stop();
};
deploy();
