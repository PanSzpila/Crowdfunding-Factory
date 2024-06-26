import React, { useState, FormEvent } from "react";
import Layout from "../../../../components/layout/Layout";
import {
  TextField,
  InputAdornment,
  Box,
  Button,
  Container,
} from "@mui/material";
import Link from "next/link";
import LoadingButton from "@mui/lab/LoadingButton";
import Crowdfunding from "../../../../ethereum/crowdfunding";
import web3 from "../../../../ethereum/web3";
import ErrorModal from "../../../../components/ErrorModal";
import { useRouter } from "next/router";
import { useContractNo } from "../../../../shared/sharedFunctions";
import Breadcrumb from "../../../../components/Breadcrumb";
import {
  upperBoxStyles,
  upperContainerStyles,
} from "../../../../styles/sharedStyles";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/system";

const RequestNew = () => {
  const [errModalMsg, setErrModalMsg] = useState<string>("");
  const [loadingOnBtn, setLoadingOnBtn] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [recipient, setRecipient] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const router = useRouter();
  const contractNo = useContractNo();
  const theme = useTheme() as Theme;

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Sprawdź, czy wartość jest liczbą lub pustym ciągiem znaków
    if (!isNaN(Number(value)) || value === "") {
      setValue(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingOnBtn(true);
    const crowdfunding = Crowdfunding(contractNo);
    try {
      const accounts: string[] | undefined = await web3?.eth.getAccounts();
      if (accounts?.length) {
        await crowdfunding?.methods
          .createRequest(
            description,
            web3?.utils.toWei(value, "ether"),
            recipient
          )
          .send({
            from: accounts[0],
          });
        router.push(`/crowdfundings/${contractNo}`);
      } else {
        setErrModalMsg(
          "No accounts available. Maybe there is no connection with your MetaMask Wallet?"
        );
      }
    } catch (err: any) {
      setErrModalMsg(err.message);
    }
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
                text: `Contract ${contractNo}`,
                href: `/crowdfundings/${contractNo}`,
              },
              {
                text: "Spend requests",
                href: `/crowdfundings/${contractNo}/requests`,
              },
              {
                text: "Create request",
              },
            ]}
          />
          <Link href={`/crowdfundings/${contractNo}/requests`}>
            <Button size="medium">Back</Button>
          </Link>
          <h1>Create a Request</h1>
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" alignItems="flex-start">
              <TextField
                label="Description"
                id="description"
                sx={{ m: 1, width: "25ch" }}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                label="Amount in ether"
                id="amount-in-ether"
                sx={{ m: 1, width: "25ch" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">eth</InputAdornment>
                  ),
                }}
                value={value}
                onChange={handleValueChange}
              />
              <TextField
                label="Recipent"
                id="recipent"
                sx={{ m: 1, width: "25ch" }}
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
              <Box alignSelf="flex-end">
                <LoadingButton
                  loading={loadingOnBtn}
                  variant="contained"
                  type="submit"
                >
                  Create
                </LoadingButton>
              </Box>
            </Box>
          </form>
          <ErrorModal
            msg={errModalMsg}
            handleClose={() => setErrModalMsg("")}
          />{" "}
        </Container>
      </Box>
    </Layout>
  );
};

export default RequestNew;
