import { FC } from "react";
import { Virtuoso } from "react-virtuoso";
import { useJobs } from "context/jobs-provider";
import { ListItem } from "components/home/list-item";
import { Spinner } from "components/spinner";

const List: FC = () => {
  const { jobs, isLoading, isValidating, size, setSize } = useJobs();
  const isLoadingMore =
    isLoading || (size > 0 && jobs && typeof jobs[size - 1] === "undefined");

  return (
    <div className="w-full lg:w-9/12">
      <Virtuoso
        useWindowScroll
        initialItemCount={jobs.flat(1)?.length || 0}
        data={jobs.flat(1)}
        overscan={200}
        style={{ height: "100%" }}
        endReached={() => !isLoadingMore && setSize(size + 1)}
        components={{
          Footer: () =>
            isLoading || isValidating ? (
              <div className="flex justify-center items-center py-2">
                <Spinner />
              </div>
            ) : null,
        }}
        itemContent={(index, job) => (
          <div className={index > 0 ? "pt-8" : ""}>
            <ListItem key={job.job_id} job={job} />
          </div>
        )}
      />
    </div>
  );
};

export { List };
