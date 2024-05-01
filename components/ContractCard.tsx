import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function ContractCard({ contractNo }: { contractNo: string }) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {contractNo}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium">View crowdfunding</Button>
      </CardActions>
    </Card>
  );
}
