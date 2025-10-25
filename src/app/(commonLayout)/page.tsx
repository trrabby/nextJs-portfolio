// app/page.tsx (Server Component)
import HomePageLayout from "./_HomePageLayout/HomePageLayout";
import ScrollSections from "./_ScrollSections/ScrolSections";

export default function Page() {
  return (
    <HomePageLayout>
      <ScrollSections />
    </HomePageLayout>
  );
}
