import { SetStateAction } from "react";

export default function Settings({
	timings,
	setTimings,
	longBreakInterval,
	setLongBreakInterval,
}: {
	timings: number[];
	setTimings: React.Dispatch<SetStateAction<number[]>>;
	longBreakInterval: number;
	setLongBreakInterval: React.Dispatch<SetStateAction<number>>;
}) {
	return (
		<div className="lg:w-1/4 w-full flex flex-col justify-center p-2 gap-5">
			<span className="w-full flex flex-row justify-evenly items-end">
				<DurationInput
					labelText="Focus"
					onChange={(value) => {
						const newTimings = [...timings];
						newTimings[0] = value;
						setTimings(newTimings);
					}}
					value={timings[0]}
				/>
				<DurationInput
					labelText="Short Break"
					onChange={(value) => {
						const newTimings = [...timings];
						newTimings[1] = value;
						setTimings(newTimings);
					}}
					value={timings[1]}
				/>
				<DurationInput
					labelText="Long Break"
					onChange={(value) => {
						const newTimings = [...timings];
						newTimings[2] = value;
						setTimings(newTimings);
					}}
					value={timings[2]}
				/>
			</span>
			<span className="w-full flex flex-row items-center justify-center mx-auto">
				<label htmlFor="longBreakInterval" className="text-center text-xl mr-5">
					Long Break Interval:
				</label>
				<input
					className="text-center w-1/4 text-xl p-2 rounded-md text-input-foreground bg-input-background [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					type="number"
					name="longBreakInterval"
					id="longBreakInterval"
					onChange={(e) => {
						setLongBreakInterval(Number(e.currentTarget.value));
					}}
					min={0}
					max={9}
					value={longBreakInterval}
				/>
			</span>
		</div>
	);
}

function DurationInput({
	labelText,
	onChange,
	value,
}: {
	labelText: string;
	onChange: (value: number) => void;
	value: number;
}) {
	return (
		<div className="w-[30%] flex flex-col h-full">
			<label htmlFor={labelText} className="text-center">
				{labelText}
			</label>
			<input
				className="text-center w-3/4 text-xl px-2 py-5 rounded-md mx-auto text-input-foreground bg-input-background [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
				type="number"
				name={labelText}
				id={labelText}
				onChange={(e) => {
					onChange(Number(e.currentTarget.value));
				}}
				defaultValue={value}
			/>
		</div>
	);
}
