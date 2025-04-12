"use client";
import Clock from "@/components/clock";
import Settings from "@/components/settings";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function Home() {
	const [timings, setTimings] = useLocalStorage<number[]>(
		"timings",
		[25, 5, 0]
	);

	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 lg:p-6 p-2 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col lg:flex-row gap-8 row-start-2 items-center w-full h-full">
				<div className="lg:w-1/4 lg:h-full"></div>
				<Clock timings={timings} />
				<Settings timings={timings} setTimings={setTimings} />
			</main>
		</div>
	);
}
