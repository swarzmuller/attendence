import { useMemo } from "react";
import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import * as locales from "@mui/material/locale";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { GlobalStyles } from "@/globalStyles";
import { Footer, Header, LayoutWrapper } from "@/components";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

export const App = () => {
  const theme = useTheme();
  const themeWithLocale = useMemo(
    () => createTheme(theme, locales["ukUA"]),
    [theme]
  );
  return (
    <ThemeProvider theme={themeWithLocale}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <Header />
        <LayoutWrapper>
          <Outlet />
        </LayoutWrapper>
        <ToastContainer />
        <Footer />
      </QueryClientProvider>
    </ThemeProvider>
  );
};
