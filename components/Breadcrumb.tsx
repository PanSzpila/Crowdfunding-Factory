import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface BreadcrumbItem {
  text: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <Stack spacing={2} sx={{ my: "30px" }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {items.map((item, index) => {
          const last = index === items.length - 1;

          return last ? (
            <Typography color="text.primary" key={item.text}>
              {item.text}
            </Typography>
          ) : (
            <Link
              underline="hover"
              color="inherit"
              href={item.href}
              key={item.text}
            >
              {item.text}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
}
