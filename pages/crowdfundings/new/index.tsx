import React, { useState, FormEvent } from "react";
import Layout from "../../../components/layout/Layout";
import { TextField, InputAdornment, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import factory from "../../../ethereum/factory";
import web3 from "../../../ethereum/web3";
import ErrorModal from "../../../components/ErrorModal";
import { useRouter } from "next/router";
import Breadcrumb from "../../../components/Breadcrumb";
import { Container } from "@mui/system";
import {
  upperBoxStyles,
  upperContainerStyles,
} from "../../../styles/sharedStyles";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/system";

const CrowdfundingNew: React.FC = () => {
  const [minimumContribution, setMinimumContribution] = useState<string>("");
  const [errModalMsg, setErrModalMsg] = useState<string>("");
  const [loadingOnBtn, setLoadingOnBtn] = useState<boolean>(false);
  const router = useRouter();
  const theme = useTheme() as Theme;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Sprawdź, czy wartość jest liczbą lub pustym ciągiem znaków
    if (!isNaN(Number(value)) || value === "") {
      setMinimumContribution(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingOnBtn(true);
    try {
      const accounts: string[] | undefined = await web3?.eth.getAccounts();
      if (accounts?.length) {
        await factory?.methods.createCrowdfunding(minimumContribution).send({
          from: accounts[0],
        });
        router.push("/");
      } else {
        setErrModalMsg(
          "No accounts available. Maybe there is no connection with your MetaMask Wallet?"
        );
      }
    } catch (err: any) {
      setErrModalMsg(err.message);
    }
    console.log(`Submitted minimum contribution: ${minimumContribution}`);
    setLoadingOnBtn(false);
  };

  return (
    <Layout>
      <Box sx={upperBoxStyles(theme)}>
        <Container maxWidth="xl" sx={upperContainerStyles}>
          <Breadcrumb
            items={[
              { text: "Home", href: "/" },
              { text: "Crowdfundings", href: "/#crowdfundings" },
              {
                text: "New contract",
              },
            ]}
          />
          <h1>New crowdfunding campaign</h1>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <TextField
                label="minimum contribution"
                id="minimum-contribution"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">wei</InputAdornment>
                  ),
                }}
                value={minimumContribution}
                onChange={handleChange}
              />
              <Box alignSelf="flex-end">
                <LoadingButton
                  loading={loadingOnBtn}
                  variant="contained"
                  type="submit"
                >
                  Submit
                </LoadingButton>
              </Box>
            </Box>
          </form>
          <ErrorModal
            msg={errModalMsg}
            handleClose={() => setErrModalMsg("")}
          />
        </Container>
      </Box>
    </Layout>
  );
};
export default CrowdfundingNew;
