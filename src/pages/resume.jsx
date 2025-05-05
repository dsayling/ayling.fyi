import React from "react";
import Layout from "@theme/Layout";
import Head from "@docusaurus/Head";

export default function page() {
  return (
    <Layout title="Page" description="Drew Ayling Resume">
      <Head>
        <meta property="og:image" content="image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <iframe style={{ height: "100vh" }} src="./resume.html" />
    </Layout>
  );
}
