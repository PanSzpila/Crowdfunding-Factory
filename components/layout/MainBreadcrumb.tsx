import * as React from "react";
import { useRouter } from "next/router";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function Breadcrumb() {
  const router = useRouter();
  const pathnames = router.pathname.split("/").filter((x) => x);

  return (
    <Stack spacing={2}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          if (value === "crowdfundings") {
            return (
              <Link underline="hover" color="inherit" href="/" key={to}>
                Crowdfundings
              </Link>
            );
          }

          return last ? (
            <Typography color="text.primary" key={to}>
              Contract {value}
            </Typography>
          ) : (
            <Link underline="hover" color="inherit" href={to} key={to}>
              {value}
            </Link>
          );
        })}
      </Breadcrumbs>
    </Stack>
  );
}

// import * as React from "react";
// import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import Stack from "@mui/material/Stack";
// import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
//   event.preventDefault();
//   console.info("You clicked a breadcrumb.");
// }

// export default function Breadcrumb() {
//   const breadcrumbs = [
//     <Link
//       underline="hover"
//       key="1"
//       color="inherit"
//       href="/"
//       onClick={handleClick}
//     >
//       MUI
//     </Link>,
//     <Link
//       underline="hover"
//       key="2"
//       color="inherit"
//       href="/material-ui/getting-started/installation/"
//       onClick={handleClick}
//     >
//       Core
//     </Link>,
//     <Typography key="3" color="text.primary">
//       Breadcrumb
//     </Typography>,
//   ];

//   return (
//     <Stack spacing={2}>
//       <Breadcrumbs
//         separator={<NavigateNextIcon fontSize="small" />}
//         aria-label="breadcrumb"
//       >
//         {breadcrumbs}
//       </Breadcrumbs>
//     </Stack>
//   );
// }
