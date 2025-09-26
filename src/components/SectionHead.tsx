import React from "react";

interface SectionHeadProps {
  title: string;
  para?: string;
  special?: string;
  titleColor?: string;
  paraColor?: string;
  specialColor?: string;
}

export const SectionHead: React.FC<SectionHeadProps> = ({
  title,
  para,
  special,
  titleColor,
  paraColor,
  specialColor,
}) => {
  return (
    <div
      data-aos="fade-up"
      data-aos-duration="1000"
      className="mx-auto flex flex-col justify-center items-center py-5"
    >
      <h1
        className={`md:text-3xl font-bold ${
          titleColor ? titleColor : "text-primary"
        }  text-4xl`}
      >
        {title}
      </h1>
      <span
        className={`${
          specialColor ? specialColor : "text-accent"
        } font-bold md:text-xl text-base w-full mx-auto text-center`}
      >
        {special}
      </span>
      <p
        className={`mt-4 ${
          paraColor ? paraColor : "text-primary"
        } md:text-lg text-base  lg:w-6/12 w-10/12 mx-auto text-center flex gap-2 items-center justify-center`}
      >
        {para}
      </p>
    </div>
  );
};
