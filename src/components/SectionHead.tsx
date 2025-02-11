import React from "react";

interface SectionHeadProps {
  title: string;
  para?: string;
  special?: string;
}

export const SectionHead: React.FC<SectionHeadProps> = ({
  title,
  para,
  special,
}) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      className="mx-auto flex flex-col justify-center items-center py-5"
    >
      <h1 className="md:text-3xl font-bold text-white text-3xl">{title}</h1>
      <span className="text-primary font-bold md:text-xl text-base w-full mx-auto text-center">
        {special}
      </span>
      <p className="mt-4 text-white md:text-lg text-base  lg:w-8/12 w-10/12 mx-auto text-center flex gap-2 items-center justify-center">
        {para}
      </p>
    </div>
  );
};
