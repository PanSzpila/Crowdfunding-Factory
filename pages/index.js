import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";

const index = ({ crowdfundings }) => {
  return <div> {crowdfundings} </div>;
};

index.getInitialProps = async () => {
  let crowdfundings = [];
  if (web3 && factory) {
    crowdfundings = await factory.methods.getDeployedCrowdfundings().call();
  }
  return { crowdfundings };
};

export default index;
