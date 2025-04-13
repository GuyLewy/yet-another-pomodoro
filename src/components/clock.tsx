"use client";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useState, useEffect } from "react";

export default function Clock({
	timings,
	longBreakInterval,
}: {
	timings: number[];
	longBreakInterval: number;
}) {
	/**
	 * States:
	 * 0: Timer
	 * 1: Short Break
	 * 2: Long Break
	 */
	const [state, setState] = useLocalStorage("state", 0);
	const [started, setStarted] = useLocalStorage("started", false);
	const [paused, setPaused] = useLocalStorage("paused", false);
	const [time, setTime] = useState(Date.now());
	const [shortBreakCounter, setShortBreakCounter] = useLocalStorage(
		"shortBreakCounter",
		0
	);
	const [endTime, setEndTime] = useLocalStorage(
		"endTime",
		timings[state] * 60 * 1000 + Date.now()
	);

	if (!started && endTime !== timings[state] * 60 * 1000 + time) {
		setEndTime(timings[state] * 60 * 1000 + time);
	}

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
		if (state === 1) {
			setShortBreakCounter(shortBreakCounter + 1);
		}

		if (longBreakInterval !== 0 && state === 0 && shortBreakCounter >= longBreakInterval) {
			setState(2);
			setShortBreakCounter(0);
		} else if (state === 2) {
			setState(0);
		} else {
			setState((state + 1) % 2);
		}

		setStarted(false);
		setEndTime(timings[state] * 60 * 1000 + Date.now());
	}

	if (timeDiff <= 0) {
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
		<div className="lg:w-1/2 w-full h-full box-border flex items-center flex-col justify-center max-w-[700px]">
			<h1 className="w-full lg:text-[10em] text-[23vw] text-center m-3 box-border">
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

			<div className="lg:w-3/4 w-[90%] flex flex-row items-center justify-center gap-x-4 text-xl">
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
