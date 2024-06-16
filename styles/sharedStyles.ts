import { SxProps } from "@mui/system";
import { Theme } from "@mui/material/styles";
import { alpha } from "@mui/material";
import { SystemStyleObject } from "@mui/system";

export const upperBoxStyles = (theme: Theme): SystemStyleObject => ({
  width: "100%",
  backgroundImage:
    theme.palette.mode === "light"
      ? "linear-gradient(180deg, #d1d1d1, #FFF)"
      : `linear-gradient(#242424, ${alpha("#101010", 0.25)})`,
  backgroundSize: "100% 20%",
  backgroundRepeat: "no-repeat",
});

export const upperContainerStyles = (): SystemStyleObject => ({
  flex: 1,
  overflow: "auto",
  marginTop: "100px",
});
