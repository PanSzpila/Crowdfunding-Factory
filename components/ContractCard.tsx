import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export default function ContractCard({ contractNo }: { contractNo: string }) {
  return (
    <Card sx={{ minWidth: 275, margin: "4rem 0" }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {contractNo}
        </Typography>
      </CardContent>
      <CardActions>
        <Link href={`/crowdfundings/${contractNo}`}>
          <Button size="medium">View crowdfunding</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
