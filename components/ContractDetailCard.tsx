import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardStyles } from "../styles/sharedStyles";
import { useTheme } from "@mui/system";
import { Theme } from "@mui/material/styles";

type ContractDetailCardProps = {
  cardTitle: string;
  cardValue: string | number | bigint;
  cardDescription: string;
};

export default function ContractDetailCard({
  cardTitle,
  cardValue,
  cardDescription,
}: ContractDetailCardProps) {
  const theme = useTheme() as Theme;
  return (
    <Card sx={{ margin: "4rem 0", ...CardStyles(theme) }}>
      <CardContent>
        <Typography sx={{ fontSize: 17 }} color="text.primary" gutterBottom>
          {cardTitle}
        </Typography>
        <Typography variant="h6" component="div">
          {String(cardValue)}
        </Typography>
        {/*         <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography> */}
        <Typography variant="body2" color="text.secondary">
          {cardDescription}
          {/*           <br />
          {'"a benevolent smile"'} */}
        </Typography>
      </CardContent>
      {/*       <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
}
