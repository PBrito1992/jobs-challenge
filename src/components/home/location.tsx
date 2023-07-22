import { GlobeIcon } from "components/icons/globe";
import { FC } from "react";

type TLocation = {
  location: string;
};

const Location: FC<TLocation> = ({ location }) => (
  <span className="flex items-center gap-2 text-brand-light-gray text-xs">
    <GlobeIcon />
    {location}
  </span>
);

export { Location };
