import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";
import ContractCard from "../components/ContractCard";
import { contract } from "web3/lib/commonjs/eth.exports";

interface IndexProps {
  crowdfundings: string[];
}

interface IndexComponent extends React.FC<IndexProps> {
  getInitialProps: () => Promise<IndexProps>;
}

const index: IndexComponent = ({
  crowdfundings,
}: {
  crowdfundings: string[];
}) => {
  return (
    <div>
      {crowdfundings.map((contractNo) => (
        <ContractCard contractNo={contractNo} />
      ))}
    </div>
  );
};

index.getInitialProps = async () => {
  let crowdfundings: string[] = [];
  if (web3 && factory) {
    crowdfundings = await factory.methods.getDeployedCrowdfundings().call();
  }
  return { crowdfundings };
};

export default index;
