import React from "react";

import { SectionHead } from "@/components/SectionHead";
import { ContactForm } from "./_ContactsForm/ContactsForm";

export const Contacts = () => {
  return (
    <div className={`bg-center bg-cover bg-fixed text-white pb-10 `}>
      <div>
        <SectionHead
          title={"Get In Touch"}
          titleColor="text-gray-800 dark:text-fourth"
          para={"Please Let Me Know If You Have Any Queries"}
          paraColor="text-gray-600 dark:text-fourth"
        />
      </div>

      <ContactForm />
    </div>
  );
};
