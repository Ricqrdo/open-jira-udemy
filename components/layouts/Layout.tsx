import Head from "next/head";

import { Box } from "@mui/material";

import { Navbar, Siderbar } from "../UI";

interface Props {
  title?: string;
  children: any;
}

export function Layout({ title = "OpenJira", children }: Props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <Siderbar />

      <Box sx={{ padding: "10px 20px" }}>{children}</Box>
    </Box>
  );
}
