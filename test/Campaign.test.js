import assert from "assert";
import ganache from "ganache";
import { beforeEach, it } from "mocha";
import { Web3 } from "web3";
import compiledFactory from "../ethereum/build/CrowdfundingFactory.json" assert { type: "json" };
import compiledCrowdfunding from "../ethereum/build/Crowdfunding.json" assert { type: "json" };
import { parse } from "path";

const web3 = new Web3(
  ganache.provider({
    allowUnlimitedContractSize: false,
  })
);

let accounts;
let factory;
let crowdfundingAddress;
let crowdfunding;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  try {
    factory = await new web3.eth.Contract(compiledFactory.abi)
      .deploy({
        data: compiledFactory.evm.bytecode.object,
      })
      .send({ from: accounts[0], gas: 1500000 });
  } catch (error) {
    console.error(error);
  }

  try {
    await factory.methods.createCrowdfunding("100").send({
      from: accounts[0],
      gas: "10000000",
    });
  } catch (error) {
    console.error(error);
  }

  [crowdfundingAddress] = await factory.methods
    .getDeployedCrowdfundings()
    .call(); //destructurisation - take first element of array and assaign it for variable crowdfundingAdress

  crowdfunding = await new web3.eth.Contract(
    compiledCrowdfunding.abi,
    crowdfundingAddress
  );
});

describe("Crowdfundings", () => {
  it("deploys a factory and a crowdfunding", () => {
    assert.ok(factory.options.address);
    assert.ok(crowdfunding.options.address);
  });

  it("marks caller as the crowdfunding manager", async () => {
    const manager = await crowdfunding.methods.manager().call();
    assert.equal(accounts[0], manager);
  });

  it("allows people to contribute money and marks them as approvers", async () => {
    await crowdfunding.methods.contribute().send({
      value: "200",
      from: accounts[1],
    });
    const isContributor = await crowdfunding.methods
      .approvers(accounts[1])
      .call();
    assert(isContributor);
  });

  it("requires a minimum contribution", async () => {
    try {
      await crowdfunding.methods.contribute().send({
        value: "5",
        from: accounts[1],
      });
      assert(false);
    } catch (error) {
      assert(error);
    }
  });

  it("allows a manager to make a payment request", async () => {
    crowdfunding.methods
      .createRequest("Buy batteries", "100", accounts[2])
      .send({ from: accounts[0], gas: "1000000" })
      .on("transactionHash", function (hash) {
        // console.log("transactionHash", hash);
      })
      .on("receipt", function (receipt) {
        // console.log("receipt", receipt);
      })
      .on("confirmation", async function (confirmationNumber, receipt) {
        // console.log("confirmation", confirmationNumber);
        const request = await crowdfunding.methods.requests(0).call();
        // console.log("request", request);
        assert.equal("Buy batteries", request.description);
      })
      .on("error", console.error);
  });

  it("processes requests", async () => {
    await crowdfunding.methods
      .contribute()
      .send({ from: accounts[0], value: web3.utils.toWei("10", "ether") });

    await crowdfunding.methods
      .createRequest("A", web3.utils.toWei("5", "ether"), accounts[1])
      .send({ from: accounts[0], gas: "1000000" });

    await crowdfunding.methods.approveRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    await crowdfunding.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: "1000000",
    });

    let balance = await web3.eth.getBalance(accounts[1]);
    balance = web3.utils.fromWei(balance, "ether");
    balance = parseFloat(balance);
    console.log("balance", balance);

    assert(balance > 104);
  });
});
