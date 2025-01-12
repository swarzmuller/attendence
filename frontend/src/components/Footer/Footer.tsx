import { Box, Container, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      component="footer"
      padding={2}
      sx={{ backgroundColor: "primary.main" }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" color="textSecondary" textAlign="center">
          &copy; {new Date().getFullYear()} Таблиця відвідувань учнів.
        </Typography>
      </Container>
    </Box>
  );
};
