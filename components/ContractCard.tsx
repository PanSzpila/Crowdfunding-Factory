import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { CardStyles } from "../styles/sharedStyles";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";

export default function ContractCard({ contractNo }: { contractNo: string }) {
  const theme = useTheme() as Theme;

  return (
    <Card sx={{ margin: "4rem 0", ...CardStyles(theme) }}>
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
