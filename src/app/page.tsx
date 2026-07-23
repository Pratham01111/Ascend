import CommandDashboard from "@/components/CommandDashboard";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-14 px-6 py-12 lg:px-16 lg:py-16">
      <div className="flex items-baseline gap-4">
        <div className="text-2xl font-bold tracking-[0.44em] text-[#E8EAF2]">
          ASCEND
        </div>
        <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-[#565d70]">
          Personal RPG · Operating System
        </div>
      </div>

      <CommandDashboard />
    </main>
  );
}
