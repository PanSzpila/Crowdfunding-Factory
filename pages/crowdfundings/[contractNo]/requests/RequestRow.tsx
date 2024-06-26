import React from "react";
import { Button, TableCell, TableRow } from "@mui/material";
import web3 from "../../../../ethereum/web3";
import Crowdfunding from "../../../../ethereum/crowdfunding";

interface RequestRowProps {
  id: number;
  request: {
    description: string;
    value: string;
    recipient: string;
    complete: boolean;
    approvalCount: BigInt;
  };
  approversCount: number | null;
  contractNo: string | undefined;
}

const RequestRow: React.FC<RequestRowProps> = ({
  id,
  request,
  approversCount,
  contractNo,
}) => {
  if (!request) {
    return <p>no requests</p>;
  }
  const readyToFinalize: boolean =
    approversCount !== null
      ? Number(request.approvalCount) > approversCount / 2
      : false;

  const handleRequest = async (
    method: "approveRequest" | "finalizeRequest"
  ) => {
    const crowdfunding = Crowdfunding(contractNo);
    try {
      const accounts: string[] | undefined = await web3?.eth.getAccounts();
      if (accounts?.length) {
        if (method === "approveRequest") {
          await crowdfunding.methods
            .approveRequest(id)
            .send({ from: accounts[0] });
        } else if (method === "finalizeRequest") {
          await crowdfunding.methods
            .finalizeRequest(id)
            .send({ from: accounts[0] });
        }
      } else {
        throw new Error(
          "No accounts available. Maybe there is no connection with your MetaMask Wallet?"
        );
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <TableRow key={id}>
      <TableCell component="th" scope="row">
        {id}
      </TableCell>
      <TableCell align="right">{request.description}</TableCell>
      <TableCell align="right">
        {web3?.utils.fromWei(request.value.toString(), "ether")}
      </TableCell>
      <TableCell align="right">{request.recipient}</TableCell>
      <TableCell align="right">
        {Number(request.approvalCount)}/{approversCount}
      </TableCell>
      <TableCell align="right">
        {request.complete ? (
          <p>approved</p>
        ) : (
          <Button
            variant="outlined"
            size="small"
            color="success"
            onClick={() => handleRequest("approveRequest")}
          >
            Approve
          </Button>
        )}
      </TableCell>
      <TableCell align="right">
        {request.complete ? (
          <p>finalized</p>
        ) : (
          <Button
            variant="outlined"
            size="small"
            color="secondary"
            onClick={() => handleRequest("finalizeRequest")}
            disabled={!readyToFinalize}
          >
            Finalize
          </Button>
        )}
      </TableCell>
    </TableRow>
  );
};

export default RequestRow;
