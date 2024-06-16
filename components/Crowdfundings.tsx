// Crowdfundings.tsx
import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { AddBox } from "@mui/icons-material";
import Link from "next/link";
import ContractCard from "../components/ContractCard";
import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";

const Crowdfundings: React.FC = () => {
  const [crowdfundings, setCrowdfundings] = useState<string[]>([]);

  useEffect(() => {
    const getCrowdfundings = async () => {
      let crowdfundings: string[] = [];
      if (web3 && factory) {
        crowdfundings = await factory.methods.getDeployedCrowdfundings().call();
      }
      setCrowdfundings(crowdfundings);
    };

    getCrowdfundings();
  }, []);

  return (
    <>
      <h1>Open crowdfundings</h1>
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
    </>
  );
};

export default Crowdfundings;

// import React from 'react'
// import { Button } from "@mui/material";
// import Link from "next/link";
// import { AddBox } from "@mui/icons-material";
// import ContractCard from "../components/ContractCard";

// const Crowdfundings = () => {
//   return (
//     <div><h1> Open crowdfundings</h1>
//     <div>
//       {crowdfundings.map((contractNo) => (
//         <ContractCard contractNo={contractNo} key={contractNo} />
//       ))}
//     </div>
//     <Link href="/crowdfundings/new">
//       <Button
//         variant="contained"
//         style={{ float: "right", marginLeft: "2rem" }}
//         size="large"
//         startIcon={<AddBox />}
//       >
//         Create Crowdfunding
//       </Button>
//     </Link></div>
//   )
// }

// Crowdfundings.getInitialProps = async () => {
//     let crowdfundings: string[] = [];
//     if (web3 && factory) {
//       crowdfundings = await factory.methods.getDeployedCrowdfundings().call();
//     }
//     return { crowdfundings };
//   };

// export default Crowdfundings
