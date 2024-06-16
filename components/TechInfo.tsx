import React from "react";
import LogoCollection from "./LogoCollection";
import Typography from "@mui/material/Typography";

const TechInfo = () => {
  return (
    <div>
      <h2>Technical information</h2>

      <h4>Blockchain</h4>
      <Typography variant="body1" sx={{ color: "grey.400" }}>
        A smart contract named “CrowdfundingFactory” has been written in
        Solidity. This contract creates child contracts named “Crowdfunding”,
        each responsible for individual collections. The application is
        connected to the ethereum network using Web3.js and the Metamask wallet
        using Truffle. Tests performed in Ganache.
      </Typography>

      <h4>FrontEnd</h4>
      <Typography variant="body1" sx={{ color: "grey.400" }}>
        Application made in Next.js with TypeScript, MaterialUi.{" "}
      </Typography>

      <h4>Inspiration</h4>
      <Typography variant="body1" sx={{ color: "grey.400" }}>
        The inspiration for the project was the Udemy course "Ethereum and
        Solidity: The Complete Developer's Guide" by Stephen Grider, BUT! the
        course is quite outdated, a lot has changed in the code over the last
        two years and I used the latest stable versions of all tools, directly.
        Solidity now has a different syntax in many places, libraries have
        different methods, Next.js has a different architecture, I also added
        Typescript, used Material UI instead of Semantic UI, named variables
        differently and slightly changed the project architecture in some
        places. Plus, the app pages have my add-ons. All this to force me to
        thoroughly understand the code at every stage of the project.
      </Typography>
      <LogoCollection />
    </div>
  );
};

export default TechInfo;
