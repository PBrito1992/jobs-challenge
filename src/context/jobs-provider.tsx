import {
  useContext,
  createContext,
  useMemo,
  FC,
  PropsWithChildren,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import useSWRInfinite from "swr/infinite";
import { useFilters } from "components/home/filters-provider";

export type TJob = {
  company_name: string;
  description: string;
  detected_extensions: {
    posted_at: string;
    schedule_type: string;
    salary?: string;
  };
  job_highlights: {
    items: string[];
    title: string;
  }[];
  job_id: string;
  location: string;
  thumbnail?: string;
  title: string;
  via: string;
  related_links: { link: string; text: string }[];
  extensions: string[];
};

type TJobsContext = {
  jobs: TJob[][];
  selectedJob: TJob | undefined;
  size: number;
  isLoading: boolean;
  isValidating: boolean;
  setSize: (
    size: number | ((_size: number) => number)
  ) => Promise<TJob[][] | undefined>;
  setSelectedJob: Dispatch<SetStateAction<TJob | undefined>>;
};

const JobsContext = createContext<TJobsContext>({
  jobs: [],
  selectedJob: undefined,
  size: 0,
  isLoading: false,
  isValidating: false,
  setSize: () => Promise.resolve(undefined),
  setSelectedJob: () => {},
});

const getKey = (
  pageIndex: number,
  previousPageData: TJob[],
  searchTerm: string
) => {
  if ((previousPageData && !previousPageData.length) || !searchTerm)
    return null;

  const params = new URLSearchParams();
  params.set("searchTerm", searchTerm);
  params.set("page", pageIndex.toString());
  return `/api/jobs?${params.toString()}`; // SWR key
};

const fetcher = async (url: string) => {
  const { jobs } = await fetch(url).then((r) => r.json());

  return jobs;
};

const JobsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { searchTerm } = useFilters();
  const [selectedJob, setSelectedJob] = useState<TJob | undefined>();
  const { data, size, setSize, isLoading, isValidating } = useSWRInfinite<
    TJob[]
  >(
    (pageIndex: number, previousPageData: TJob[]) =>
      getKey(pageIndex, previousPageData, searchTerm),
    fetcher,
    {
      keepPreviousData: true,
      revalidateFirstPage: false,
    }
  );

  const ctxValue = useMemo(
    () => ({
      jobs: data || [],
      selectedJob,
      size,
      isLoading,
      isValidating,
      setSize,
      setSelectedJob,
    }),
    [data, selectedJob, size, setSize, isLoading, isValidating]
  );

  return (
    <JobsContext.Provider value={ctxValue}>{children}</JobsContext.Provider>
  );
};

const useJobs = () => {
  const ctx = useContext(JobsContext);

  if (!ctx) throw new Error("useJobs must be used inside of JobsProvider!");

  return ctx;
};

export { JobsProvider, useJobs };
