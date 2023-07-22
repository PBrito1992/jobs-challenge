import { ClockIcon } from "components/icons/clock";
import { FC } from "react";

type TPostedAt = {
  posted_at: string;
};

const PostedAt: FC<TPostedAt> = ({ posted_at }) => (
  <span className="flex items-center gap-2 text-brand-light-gray text-xs">
    <ClockIcon />
    {posted_at}
  </span>
);

export { PostedAt };
