import { Intro } from '@/components/Intro';
import { RoofCard } from '@/components/RoofCard';
import { FirstVisit } from '@/help/FirstVisit';

export default function Page() {
  return (
    <>
      <FirstVisit />
      <Intro />
      <RoofCard />
    </>
  );
}
