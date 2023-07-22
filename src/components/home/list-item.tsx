import { FC } from "react";
import { TJob, useJobs } from "context/jobs-provider";
import { useRouter } from "next/router";
import { CompanyLogo } from "components/home/company-logo";
import { ScheduleType } from "components/home/schedule-type";
import { Location } from "components/home/location";
import { PostedAt } from "components/home/posted-at";

type TListItem = {
  job: TJob;
  className?: string;
};

const ListItem: FC<TListItem> = ({ job, className }) => {
  const router = useRouter();
  const { setSelectedJob } = useJobs();

  const handleSelectedJob = () => {
    setSelectedJob(job);
    router.push(`jobs/${job.job_id}`);
  };

  return (
    <article
      onClick={handleSelectedJob}
      className={`font-roboto w-full bg-white flex items-center gap-4 p-3 rounded-4 cursor-pointer ${
        className || ""
      }`}
    >
      <CompanyLogo thumbnail={job.thumbnail} />
      <div className="w-full flex  flex-col lg:flex-row gap-6 lg:gap-0 justify-between lg:items-end">
        <div className="flex flex-col justify-between text-brand-dark-blue">
          <span className="text-xs font-bold">{job.company_name}</span>
          <span className="text-base lg:text-lg mt-2 mb-3">{job.title}</span>
          <ScheduleType schedule_type={job.detected_extensions.schedule_type} />
        </div>
        <div className="flex gap-7">
          <Location location={job.location} />
          <PostedAt posted_at={job.detected_extensions.posted_at} />
        </div>
      </div>
    </article>
  );
};

export { ListItem };
