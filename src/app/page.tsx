"use client";
import Clock from "@/components/clock";
import Settings from "@/components/settings";
import Tasks from "@/components/tasks";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Home() {
	const [timings, setTimings] = useLocalStorage<number[]>(
		"timings",
		[25, 5, 0]
	);

	return (
		<div className="flex flex-col items-center justify-items-center h-screen gap-16 lg:p-6 px-2 py-12 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col lg:flex-row gap-8 row-start-2 items-center justify-center w-full h-full">
				<Tasks/>
				<Clock timings={timings} />
				<Settings timings={timings} setTimings={setTimings} />
			</main>
		</div>
	);
}
