import path from "path";
import fs from "fs-extra";
import solc from "solc";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.resolve(__dirname, "build");
const CrowdfundingPath = path.resolve(
  __dirname,
  "contracts",
  "Crowdfunding.sol"
);
const source = fs.readFileSync(CrowdfundingPath, "utf8");

const input = {
  language: "Solidity",
  sources: {
    "Crowdfunding.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["*"],
      },
    },
  },
};

const compiledContracts = JSON.parse(
  solc.compile(JSON.stringify(input))
).contracts;

fs.ensureDirSync(buildPath);
fs.emptyDirSync(buildPath);

const file = "Crowdfunding.sol";
for (let contractName in compiledContracts[file]) {
  fs.outputJSONSync(
    path.resolve(buildPath, contractName + ".json"),
    compiledContracts[file][contractName]
  );
}

// export const { abi, evm } = compiledContracts["Crowdfunding.sol"].Crowdfunding;
