import { Web3 } from "web3";

declare global {
  interface Window {
    ethereum: any;
  }
}

let web3: Web3 | null = null;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  // We are in the browser and metamask is running.
  window.ethereum.request({ method: "eth_requestAccounts" });
  web3 = new Web3(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
  const networkUrl = process.env.NETWORK_URL;
  const networkApiKey = process.env.NETWORK_API_KEY;
  if (networkUrl && networkApiKey) {
    const provider = new Web3.providers.HttpProvider(
      networkUrl + networkApiKey
    );
    web3 = new Web3(provider);
  } else {
    console.error(
      "no required envireonmental variales to connect witch network"
    );
  }
}

export default web3;
