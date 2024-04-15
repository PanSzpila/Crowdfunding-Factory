import assert from "assert";
import ganache from "ganache";
import { beforeEach, it } from "mocha";
import { Web3 } from "web3";
import compiledFactory from "../ethereum/build/CrowdfundingFactory.json" assert { type: "json" };
import compiledCrowdfunding from "../ethereum/build/Crowdfunding.json" assert { type: "json" };

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

  // console.log("factory", factory);
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
  // it ('allows a manager to make a payment request', async () => {

  // })
});

// describe("Lottery contract", () => {
//   it("deploys a contract", () => {
//     assert.ok(lottery.options.address);
//   });

//   it("allows one account to enter", async () => {
//     await lottery.methods.enter().send({
//       from: accounts[0],
//       value: web3.utils.toWei("1", "finney"),
//     });

//     const players = await lottery.methods.getPlayers().call({
//       from: accounts[0],
//     });

//     assert.equal(accounts[0], players[0]);
//     assert.equal(1, players.length);
//   });

//   it("allows multiple accounts to enter", async () => {
//     await lottery.methods.enter().send({
//       from: accounts[0],
//       value: "1000000000000000",
//     });
//     await lottery.methods.enter().send({
//       from: accounts[1],
//       value: "1000000000000000",
//     });
//     await lottery.methods.enter().send({
//       from: accounts[2],
//       value: "1000000000000000",
//     });

//     const players = await lottery.methods.getPlayers().call({
//       from: accounts[0],
//     });

//     assert.equal(accounts[0], players[0]);
//     assert.equal(accounts[1], players[1]);
//     assert.equal(accounts[2], players[2]);
//     assert.equal(3, players.length);
//   });

//   it("requires a minimum amount of ether to enter", async () => {
//     try {
//       await lottery.methods.enter.send({
//         from: accounts[0],
//         value: "100000000000009",
//       });
//       assert(false);
//     } catch (err) {
//       assert(err);
//     }
//   });

//   it("only manager can call pickWinner", async () => {
//     try {
//       await lottery.methods.pickwinner().send({
//         from: accounts[1],
//       });
//       assert(false);
//     } catch (err) {
//       assert(err);
//     }
//   });

//   it("sends money to the winner and resets the players array", async () => {
//     await lottery.methods.enter().send({
//       from: accounts[0],
//       value: web3.utils.toWei("1", "finney"),
//     });
//     const initialBalance = await web3.eth.getBalance(accounts[0]);
//     await lottery.methods.pickWinner().send({ from: accounts[0] });
//     const finalBalance = await web3.eth.getBalance(accounts[0]);
//     const difference = finalBalance - initialBalance;

//     assert(difference > web3.utils.toWei("0.9", "finney"));
//   });

//   it("clears array of players after win", async () => {
//     await lottery.methods.enter().send({
//       from: accounts[0],
//       value: "1000000000000000",
//     });
//     await lottery.methods.enter().send({
//       from: accounts[1],
//       value: "1000000000000000",
//     });
//     await lottery.methods.enter().send({
//       from: accounts[2],
//       value: "1000000000000000",
//     });

//     await lottery.methods.pickWinner().send({ from: accounts[0] });

//     const players = await lottery.methods.getPlayers().call({
//       from: accounts[0],
//     });

//     assert.equal(0, players.length);
//   });
// });
