import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";
import ContractCard from "../components/ContractCard";
import { contract } from "web3/lib/commonjs/eth.exports";
import Layout from "../components/layout/Layout";
import { Button } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import Link from "next/link";

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
    <Layout>
      <h3> Open crowdfundings</h3>
      <Link href="/crowdfundings/new">
        <Button
          variant="contained"
          style={{ float: "right", marginLeft: "2rem" }}
          startIcon={<AddBox />}
        >
          Create Crowdfunding
        </Button>
      </Link>
      <div>
        {crowdfundings.map((contractNo) => (
          <ContractCard contractNo={contractNo} key={contractNo} />
        ))}
      </div>
    </Layout>
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
