import "styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "components/layout";
import { JobsProvider } from "context/jobs-provider";
import { FiltersProvider } from "components/home/filters-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <FiltersProvider>
        <JobsProvider>
          <Component {...pageProps} />
        </JobsProvider>
      </FiltersProvider>
    </Layout>
  );
}
