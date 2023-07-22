import Image from "next/image";
import { FC } from "react";

type TCompanyLogo = {
  thumbnail?: string;
};

const CompanyLogo: FC<TCompanyLogo> = ({ thumbnail }) => (
  <>
    {thumbnail && (
      <figure className="flex-shrink-0 relative w-24 h-24">
        <Image
          src={thumbnail}
          alt=""
          className="object-scale-down object-center"
          fill
        />
      </figure>
    )}
    {!thumbnail && (
      <div className="flex-shrink-0 w-24 h-24 rounded-4 bg-gray-100 text-brand-light-gray text-xs font-medium flex justify-center items-center">
        not found
      </div>
    )}
  </>
);

export { CompanyLogo };
