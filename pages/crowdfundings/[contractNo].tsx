import React from "react";
import { useRouter } from "next/router";

const CrowdfundingShow: React.FC = () => {
  const router = useRouter();
  const { contractNo } = router.query;
  return <div>CrowdfundingShow - details of the contract {contractNo}</div>;
};

export default CrowdfundingShow;
