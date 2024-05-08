import React, { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { useRouter } from "next/router";
import Crowdfunding from "../../ethereum/crowdfunding";

const CrowdfundingShow: React.FC = () => {
  const router = useRouter();
  const { contractNo } = router.query;
  const [summary, setSummary] = useState<object | null>(null);

  useEffect(() => {
    if (contractNo) {
      getInitialProps();
    }
  }, [contractNo]);

  useEffect(() => {
    console.log(summary, typeof summary);
  });

  const getInitialProps = async () => {
    const crowdfunding = Crowdfunding(contractNo);
    const summary = await crowdfunding.methods.getSummary().call();
    if (summary !== undefined) {
      const labeledSummary = {
        minimumContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        approversCount: summary[3],
        manager: summary[4],
      };
      setSummary(labeledSummary as object);
    } else {
      console.log("Invalid summary:", summary);
    }
  };

  return (
    <Layout>
      <div>CrowdfundingShow - details of the contract {contractNo}</div>
      {/* {summary && <div>Summary: {summary}</div>} */}
    </Layout>
  );
};

export default CrowdfundingShow;
