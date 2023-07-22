import { FC } from "react";

type TScheduleType = {
  schedule_type: string;
};

const ScheduleType: FC<TScheduleType> = ({ schedule_type }) => (
  <span className="w-fit text-xs font-bold py-1.5 px-2 border border-brand-dark-blue rounded-4">
    {schedule_type}
  </span>
);

export { ScheduleType };
