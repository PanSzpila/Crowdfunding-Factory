import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";
import ContractCard from "../components/ContractCard";
import Layout from "../components/layout/Layout";
import { Button } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import Link from "next/link";
import LogoCollection from "../components/LogoCollection";

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
      <LogoCollection />
      <h3> Open crowdfundings</h3>
      <div>
        {crowdfundings.map((contractNo) => (
          <ContractCard contractNo={contractNo} key={contractNo} />
        ))}
      </div>
      <Link href="/crowdfundings/new">
        <Button
          variant="contained"
          style={{ float: "right", marginLeft: "2rem" }}
          size="large"
          startIcon={<AddBox />}
        >
          Create Crowdfunding
        </Button>
      </Link>
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
