import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";

interface IndexProps {
  crowdfundings: string[];
}

interface IndexComponent extends React.FC<IndexProps> {
  getInitialProps: () => Promise<IndexProps>;
}

const index: IndexComponent = ({ crowdfundings }) => {
  return <div> {crowdfundings[0]} </div>;
};

index.getInitialProps = async () => {
  let crowdfundings: string[] = [];
  if (web3 && factory) {
    crowdfundings = await factory.methods.getDeployedCrowdfundings().call();
  }
  return { crowdfundings };
};

export default index;
