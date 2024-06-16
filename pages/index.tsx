import Layout from "../components/layout/Layout";
import Readme from "../components/Readme";
import { Container } from "@mui/system";
import Breadcrumb from "../components/Breadcrumb";
import TechInfo from "../components/TechInfo";
import Box from "@mui/material/Box";
import { upperBoxStyles, upperContainerStyles } from "../styles/sharedStyles";
import { Theme } from "@mui/material/styles";
import { useTheme } from "@mui/system";
import Crowdfundings from "../components/Crowdfundings";

interface IndexProps {
  crowdfundings: string[];
}

const index: React.FC = () => {
  const theme = useTheme() as Theme;
  return (
    <Layout>
      <Box sx={{ pb: { xs: 2, sm: 4 }, ...upperBoxStyles(theme) }}>
        <Container maxWidth="xl" sx={upperContainerStyles}>
          <Breadcrumb items={[{ text: "Home" }]} />
          <Readme />
        </Container>
      </Box>
      <Box
        sx={{
          pt: { xs: 1, sm: 3 },
          pb: { xs: 2, sm: 4 },
          color: "white",
          bgcolor: "#06090a",
        }}
      >
        <Container maxWidth="xl">
          <TechInfo />
        </Container>
      </Box>
      <Box
        id="crowdfundings"
        sx={{
          pt: { xs: 1, sm: 3 },
        }}
      >
        <Container maxWidth="xl">
          <Crowdfundings />
        </Container>
      </Box>
    </Layout>
  );
};

export default index;
