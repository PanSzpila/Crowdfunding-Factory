import { useEffect, useState } from "react";
import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";

const index = () => {
  const [crowdfundings, setCrowfundings] = useState([]);

  useEffect(() => {
    const getDeployedCrowdfundings = async () => {
      if (web3 && factory) {
        const fundings = await factory.methods
          .getDeployedCrowdfundings()
          .call();
        setCrowfundings(fundings);
        // console.log("fundings", fundings);
      }
    };
    getDeployedCrowdfundings();
  }, []);

  return <div>this is the campaign list page </div>;
};

export default index;
