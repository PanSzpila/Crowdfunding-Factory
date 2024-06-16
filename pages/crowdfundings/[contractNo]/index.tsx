import React, { useEffect, useState, useMemo } from "react";
import Layout from "../../../components/layout/Layout";
import { useRouter } from "next/router";
import Crowdfunding from "../../../ethereum/crowdfunding";
import ContractDetailCard from "../../../components/ContractDetailCard";
import ContributeForm from "../../../components/ContributeForm";
import web3 from "../../../ethereum/web3";
import Link from "next/link";
import { Button } from "@mui/material";
import { Ballot } from "@mui/icons-material";
import { useContractNo } from "../../../shared/sharedFunctions";
import Breadcrumb from "../../../components/Breadcrumb";
import { Box, Container } from "@mui/material";
import {
  upperBoxStyles,
  upperContainerStyles,
} from "../../../styles/sharedStyles";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/system";

const CrowdfundingShow: React.FC = () => {
  type Summary = {
    minimumContribution: bigint;
    balance: bigint;
    requestsCount: bigint;
    approversCount: bigint;
    manager: string;
  };

  const router = useRouter();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [refreshKey, setRefreshKey] = useState<number>(0);
  const contractNo = useContractNo();
  const theme = useTheme() as Theme;

  if (typeof contractNo !== "string") {
    throw new Error("contractNo must be a string");
  }

  /*   useEffect(() => {
    console.log("equal=", contractNo === contractNo2, contractNo, contractNo2);
  }); */

  useEffect(() => {
    if (
      contractNo &&
      typeof contractNo === "string" &&
      contractNo.length == 42
    ) {
      const getInitialProps = async () => {
        const crowdfunding = Crowdfunding(contractNo);
        const fetchedSummary = await crowdfunding.methods.getSummary().call();
        if (fetchedSummary !== undefined) {
          const labeledSummary = {
            minimumContribution: fetchedSummary[0],
            balance: fetchedSummary[1],
            requestsCount: fetchedSummary[2],
            approversCount: fetchedSummary[3],
            manager: fetchedSummary[4],
          };
          setSummary(labeledSummary as Summary);
        } else {
          console.log("Invalid summary:", summary);
        }
      };
      getInitialProps();
    }
  }, [contractNo, refreshKey /*  router.isReady, router.asPath */]);

  return (
    <Layout>
      <Box sx={upperBoxStyles(theme)}>
        <Container maxWidth="xl" sx={upperContainerStyles}>
          <Breadcrumb
            items={[
              { text: "Home", href: "/" },
              { text: "Crowdfundings", href: "/#crowdfundings" },
              {
                text: `Contract ${contractNo}`,
              },
            ]}
          />
          <h1>Details of the contract {contractNo}</h1>
          {summary?.minimumContribution && (
            <div>
              <div>
                <ContractDetailCard
                  cardTitle="Contract Address"
                  cardDescription="its the blockchain addres of the contract"
                  cardValue={typeof contractNo === "string" ? contractNo : ""}
                />
                <ContractDetailCard
                  cardTitle="Addres of Manager"
                  cardDescription="The manager created this campaign and can create requests to withdraw money"
                  cardValue={summary.manager}
                />
                <ContractDetailCard
                  cardTitle="Minimum Contribution (eth)"
                  cardDescription="You must contribute at least this much wei to become an approver" // @ts-ignore
                  cardValue={web3?.utils.fromWei(
                    summary.minimumContribution,
                    "ether"
                  )}
                />
                <ContractDetailCard
                  cardTitle="Minimum Contribution (wei)"
                  cardDescription="You must contribute at least this much wei to become an approver"
                  cardValue={summary.minimumContribution}
                />
                <ContractDetailCard
                  cardTitle="Crowdfunding Balance (ether)"
                  cardDescription="The balance is how much money this crowdfunding has left to spend" // @ts-ignore
                  cardValue={web3?.utils.fromWei(summary.balance, "ether")}
                />
                <ContractDetailCard
                  cardTitle="Number of Approovers"
                  cardDescription="Number of people who have already donated to this campaign"
                  cardValue={summary.approversCount}
                />
                <ContractDetailCard
                  cardTitle="Number of Requests"
                  cardDescription="A request tries to withdraw money from the contract. Requests must be approoves by approovers"
                  cardValue={summary.requestsCount}
                />
              </div>
              <ContributeForm
                contractNo={contractNo}
                refreshKey={refreshKey}
                setRefreshKey={setRefreshKey}
                minimumContribution={summary.minimumContribution}
              />
              <Link href={`/crowdfundings/${contractNo}/requests`}>
                <Button
                  variant="contained"
                  style={{ float: "right", marginLeft: "2rem" }}
                  startIcon={<Ballot />}
                  size="large"
                >
                  Show spends requests
                </Button>
              </Link>
            </div>
          )}
        </Container>
      </Box>
    </Layout>
  );
};

export default CrowdfundingShow;
