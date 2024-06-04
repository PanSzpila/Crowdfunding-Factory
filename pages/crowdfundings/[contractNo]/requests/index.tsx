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
import RequestRow from "./RequestRow";

interface Request {
  description: string;
  value: string;
  recipient: string;
  complete: boolean;
  approvalCount: string;
}

const RequestsIndex: React.FC = () => {
  const router = useRouter();
  const contractNo = useContractNo();
  const [requests, setRequests] = useState<Request[]>([]);
  const [approversCount, setApproversCount] = useState<number | null>(null);
  const [requestCount, setrequestCount] = useState<Number>(0);

  useEffect(() => {
    if (
      contractNo &&
      typeof contractNo === "string" &&
      contractNo.length === 42
    ) {
      const getInitialProps = async () => {
        const crowdfunding = Crowdfunding(contractNo);
        const newRequestCount: string = await crowdfunding.methods
          .getRequestsCount()
          .call();
        const newApproversCount: bigint = await crowdfunding.methods
          .approversCount()
          .call();

        const newRequests: Request[] = (
          await Promise.all(
            Array(parseInt(newRequestCount))
              .fill(null)
              .map((element, index) => {
                return crowdfunding.methods.requests(index).call();
              })
          )
        ).map((request: any) => ({
          description: request.description,
          value: request.value,
          recipient: request.recipient,
          complete: request.complete,
          approvalCount: request.approvalCount,
        })) as Request[];
        setRequests(newRequests);
        setrequestCount(Number(newRequestCount));
        setApproversCount(Number(newApproversCount));
      };
      getInitialProps();
    }
  }, [contractNo]);

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
            <TableBody>
              {requests.map((request, index) => (
                <RequestRow
                  key={index}
                  id={index}
                  request={request}
                  approversCount={approversCount}
                  contractNo={contractNo}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {!requestCount && <p>Found 0 requests</p>}

        <Link href={`/crowdfundings/${contractNo}/requests/new`}>
          <Button
            variant="contained"
            style={{ float: "right", marginLeft: "2rem", marginTop: "2rem" }}
            startIcon={<AddCard />}
            size="large"
          >
            Add Request
          </Button>
        </Link>
      </Layout>
    </div>
  );
};

export default RequestsIndex;
