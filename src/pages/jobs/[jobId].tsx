import { CompanyLogo } from "components/home/company-logo";
import { Location } from "components/home/location";
import { PostedAt } from "components/home/posted-at";
import { ScheduleType } from "components/home/schedule-type";
import { ArrowIcon } from "components/icons/arrow";
import { useJobs } from "context/jobs-provider";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const JobPage: NextPage = () => {
  const router = useRouter();
  const { selectedJob } = useJobs();
  console.log({ selectedJob });
  useEffect(() => {
    if (!!selectedJob) return;

    router.push("/");
  }, [selectedJob]);

  if (!selectedJob) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col lg:flex-row gap-8 lg:mt-11">
      <aside className="w-full lg:w-3/12 flex flex-col gap-4 text-brand-dark-blue text-sm font-medium font-poppins">
        <Link href="/" className="flex items-center gap-3.5 text-brand-blue">
          <ArrowIcon />
          <span className="whitespace-nowrap">Back to search</span>
        </Link>
        <p>
          This job was posted{" "}
          <span className="font-semibold">{selectedJob.via}</span>
        </p>
        <h2 className="font-bold uppercase text-brand-light-gray">
          Useful links
        </h2>
        <ul className="flex flex-col gap-2">
          {selectedJob.related_links.map((relatedLink, index) => (
            <li key={index}>
              <Link
                href={relatedLink.link}
                target="__blank"
                className="text-brand-blue"
              >
                - {relatedLink.text}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
      <div className="text-brand-dark-blue font-roboto">
        <h1 className="text-2xl font-bold flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-4 mb-2.5">
          {selectedJob.title}
          <ScheduleType
            schedule_type={selectedJob.detected_extensions.schedule_type}
          />
        </h1>
        <PostedAt posted_at={selectedJob.detected_extensions.posted_at} />
        <div className="flex items-center">
          <CompanyLogo thumbnail={selectedJob.thumbnail} />
          <div className="flex flex-col gap-2.5">
            <div className="font-bold text-lg">{selectedJob.company_name}</div>
            <Location location={selectedJob.location} />
          </div>
        </div>
        <p
          dangerouslySetInnerHTML={{
            __html: selectedJob.description.replaceAll("•", "<br/>•"),
          }}
        />
      </div>
    </div>
  );
};

export default JobPage;
