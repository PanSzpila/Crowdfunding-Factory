import React, { useState, FormEvent } from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import Crowdfunding from "../ethereum/crowdfunding";
import web3 from "../ethereum/web3";
import { useRouter } from "next/router";
import ErrorModal from "./ErrorModal";

interface IContributeFormProps {
  contractNo: string;
  minimumContribution: bigint;
  refreshKey: number;
  setRefreshKey: (value: ((prevState: number) => number) | number) => void;
}

const ContributeForm = ({
  contractNo,
  refreshKey,
  setRefreshKey,
}: IContributeFormProps) => {
  const [loadingOnBtn, setLoadingOnBtn] = useState<boolean>(false);
  const [contribution, setContribution] = useState<string>("");
  const [errModalMsg, setErrModalMsg] = useState<string>("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    // Sprawdź, czy wartość jest liczbą lub pustym ciągiem znaków
    if (!isNaN(Number(value)) || value === "") {
      //TODO: to i jeszcze dodatkowo sprawdzenie czy vaule <= minimumContribution
      setContribution(value);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoadingOnBtn(true);
    const crowdfunding = Crowdfunding(contractNo);
    try {
      const accounts: string[] | undefined = await web3?.eth.getAccounts();
      if (accounts?.length) {
        await crowdfunding?.methods.contribute().send({
          from: String(accounts[0]),
          value: web3?.utils.toWei(contribution, "ether"),
        });
        setRefreshKey((prevKey) => prevKey + 1);
        router.replace(`/crowdfundings/${contractNo}`);
      } else {
        setErrModalMsg(
          "No accounts available. Maybe there is no connection with your MetaMask Wallet."
        );
      }
    } catch (err: any) {
      setErrModalMsg(err.message);
    }
    console.log(`Submitted with contribution: ${contribution}`);
    setLoadingOnBtn(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
          <TextField
            label="amount to contribute"
            id="amount to contribute"
            sx={{ m: 1, width: "25ch" }}
            InputProps={{
              endAdornment: <InputAdornment position="end">eth</InputAdornment>,
            }}
            value={contribution}
            onChange={handleChange}
          />
          <LoadingButton
            loading={loadingOnBtn}
            variant="contained"
            type="submit"
            size="large"
          >
            Contribute!
          </LoadingButton>
        </Box>
      </form>
      <ErrorModal msg={errModalMsg} handleClose={() => setErrModalMsg("")} />
    </div>
  );
};

export default ContributeForm;
