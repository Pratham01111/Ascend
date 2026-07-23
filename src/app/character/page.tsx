import NavHeader from "@/components/NavHeader";
import CharacterView from "@/components/CharacterView";

export default function CharacterPage() {
  return (
    <main className="flex flex-1 flex-col gap-14 px-6 py-12 lg:px-16 lg:py-16">
      <NavHeader />
      <CharacterView />
    </main>
  );
}
