import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
  return (
    <Card sx={{ minWidth: 275, margin: "3rem 0" }}>
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
