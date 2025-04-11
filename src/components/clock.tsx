"use client";
import { useState, useEffect } from "react";

export default function Clock() {
	/**
	 * States:
	 * 0: Timer
	 * 1: Break
	 */
	const [state, setState] = useState(0);
	const [started, setStarted] = useState(false);
	const [paused, setPaused] = useState(false);
	const [time, setTime] = useState(Date.now());
	const [timings, setTimings] = useState([25, 0.1, 0]);

	const [endTime, setEndTime] = useState<number>(
		timings[state] * 60 * 1000 + Date.now()
	);

	useEffect(() => {
		const interval = setInterval(() => {
			if (!paused && started) setTime(Date.now());
		}, 1000);
		return () => {
			clearInterval(interval);
		};
	}, [paused, started]);

	const timeDiff = endTime - time;

	function timerEnd() {
		setState((state + 1) % 2);
		setStarted(false);
		setEndTime(timings[state] * 60 * 1000 + Date.now());
	}

	if (!(timeDiff === null) && timeDiff < 0) {
		timerEnd();
	}

	function start() {
		if (started) {
			return;
		}

		setTime(Date.now());
		setPaused(false);
		setStarted(true);
		setEndTime(endTime + Date.now() - time);
	}

	function next() {
		resume();
		timerEnd();
	}

	function pause() {
		setPaused(true);
	}

	function resume() {
		if (!started || !paused) {
			return;
		}

		setEndTime(endTime + Date.now() - time);
		setTime(Date.now());
		setPaused(false);
	}

	return (
		<div className="w-full h-full box-border flex items-center flex-col justify-center max-w-[700px]">
			<h1 className="w-full text-[10em] text-center m-3 box-border">
				{String(Math.floor((timeDiff || 0) / 1000 / 60)).padStart(
					2,
					"0"
				)}
				:
				{String(Math.floor(((timeDiff || 0) / 1000) % 60)).padStart(
					2,
					"0"
				)}
			</h1>

			<div className="w-3/4 flex flex-row items-center justify-center gap-x-4 text-xl">
				<button
					className="w-full bg-foreground text-background p-3 rounded-md"
					onClick={
						started === false ? start : paused ? resume : pause
					}
				>
					{!started && "Start"}
					{started && paused && "Resume"}
					{started && !paused && "Pause"}
				</button>
				{started && (
					<button
						className="w-full bg-foreground text-background p-3 rounded-md"
						disabled={timeDiff === null}
						onClick={next}
					>
						Skip
					</button>
				)}
			</div>
		</div>
	);
}
