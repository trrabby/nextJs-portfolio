// app/page.tsx (Server Component)
import ConditionalLayout from "./_ConditionalCommonLayout/ConditionalLayout";
import ScrollSections from "./_ScrollSections/ScrolSections";

export default function Page() {
  return (
    <ConditionalLayout>
      <ScrollSections />
    </ConditionalLayout>
  );
}
