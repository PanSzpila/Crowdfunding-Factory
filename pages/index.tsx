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

const Index: React.FC = () => {
  const theme = useTheme() as Theme;
  return (
    <Layout>
      <Box sx={{ pb: { xs: 4, sm: 8 }, ...upperBoxStyles(theme) }}>
        <Container maxWidth="xl" sx={upperContainerStyles}>
          <Breadcrumb items={[{ text: "Home" }]} />
          <Readme />
        </Container>
      </Box>
      <Box
        sx={{
          pt: { xs: 2, sm: 6 },
          pb: { xs: 4, sm: 8 },
          color: "white",
          bgcolor: "#06090a",
          borderTop: "1px solid",
          borderBottom: "1px solid",
          borderColor: "grey.900",
        }}
      >
        <Container maxWidth="xl">
          <TechInfo />
        </Container>
      </Box>
      <Box
        id="crowdfundings"
        sx={{
          pt: { xs: 2, sm: 6 },
        }}
      >
        <Container maxWidth="xl">
          <Crowdfundings />
        </Container>
      </Box>
    </Layout>
  );
};

export default Index;
