import React, { useEffect, useState } from "react";
import Layout from "../../../../components/layout/Layout";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { AddCard } from "@mui/icons-material";
import { useContractNo } from "../../../../shared/sharedFunctions";
import Crowdfunding from "../../../../ethereum/crowdfunding";
import web3 from "../../../../ethereum/web3";

interface Request {
  description: string;
  value: string;
  recipient: string;
  approvalCount: string;
}

const RequestsIndex: React.FC = () => {
  const router = useRouter();
  const contractNo = useContractNo();
  const [reqs, setReqs] = useState<Request[]>([]);

  useEffect(() => {
    if (
      contractNo &&
      typeof contractNo === "string" &&
      contractNo.length === 42
    ) {
      const getInitialProps = async () => {
        const crowdfunding = Crowdfunding(contractNo);
        const requestCount: string = await crowdfunding.methods
          .getRequestsCount()
          .call();
        const requests: Request[] = (
          await Promise.all(
            Array(parseInt(requestCount))
              .fill(null)
              .map((element, index) => {
                return crowdfunding.methods.requests(index).call();
              })
          )
        ).map((request: any) => ({
          description: request.description,
          value: request.value,
          recipient: request.recipient,
          approvalCount: request.approvalCount,
        })) as Request[];
        // console.log("requests", requests, "requestCount", requestCount);
        setReqs(requests);
      };
      getInitialProps();
    }
  }, [contractNo]);

  const tableCellsRenderer = () => {
    return reqs.map((row, index) => (
      <TableRow key={index + 1}>
        <TableCell component="th" scope="row">
          {index + 1} {/* ID */}
        </TableCell>
        <TableCell align="right">{row.description}</TableCell>
        <TableCell align="right">
          {web3?.utils.fromWei(row.value.toString(), "ether")}
        </TableCell>
        <TableCell align="right">{row.recipient}</TableCell>
        <TableCell align="right">{Number(row.approvalCount)}</TableCell>
        <TableCell align="right">{/* TODO: Approve btn */}</TableCell>
        <TableCell align="right">{/* TODO: Finalize btn */}</TableCell>
      </TableRow>
    ));
  };

  return (
    <div>
      <Layout>
        <h3>Requests</h3>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Amount</TableCell>
                <TableCell align="right">Recipient</TableCell>
                <TableCell align="right">Approval Count</TableCell>
                <TableCell align="right">Approve</TableCell>
                <TableCell align="right">Finalize</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{tableCellsRenderer()}</TableBody>
          </Table>
        </TableContainer>

        <Link href={`/crowdfundings/${contractNo}/requests/new`}>
          <Button
            variant="contained"
            style={{ float: "right", marginLeft: "2rem" }}
            startIcon={<AddCard />}
          >
            Add Request
          </Button>
        </Link>
      </Layout>
    </div>
  );
};

export default RequestsIndex;
