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

const RequestsIndex = () => {
  const router = useRouter();
  const contractNo = useMemo(() => {
    let contractNoFromPath = router.asPath.split("/").pop();
    if (router.isReady && router.query.contractNo) {
      contractNoFromPath = String(router.query.contractNo);
    }
    return contractNoFromPath;
  }, [router.asPath, router.query.contractNo, router.isReady]);

  if (typeof contractNo !== "string") {
    throw new Error("contractNo must be a string");
  }

  if (!(contractNo.length === 42)) {
    throw new Error(
      "contractNo is an blockchain address, so it should hafe 42 characters"
    );
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
