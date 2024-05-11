import React, { useMemo, useState, useEffect } from "react";
import Layout from "../../../../components/layout/Layout";
import {
  AppBar,
  Typography,
  Button,
  IconButton,
  Toolbar,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import { AddCard } from "@mui/icons-material";
import { useContractNo } from "../../../../shared/sharedFunctions";

const RequestsIndex = () => {
  const router = useRouter();
  const contractNo = useContractNo();

  if (typeof contractNo !== "string") {
    throw new Error("contractNo must be a string");
  }

  return (
    <div>
      <Layout>
        <h3>Requests</h3>
        <Link href={`/crowdfundings/${contractNo}/requests/new`}>
          <Button
            variant="contained"
            style={{ float: "right", marginLeft: "2rem" }}
            startIcon={<AddCard />}
          >
            add request
          </Button>
        </Link>
      </Layout>
    </div>
  );
};

export default RequestsIndex;
