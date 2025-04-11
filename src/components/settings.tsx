import { SetStateAction } from "react";

export default function Settings({
	timings,
	setTimings,
}: {
	timings: number[];
	setTimings: React.Dispatch<SetStateAction<number[]>>;
}) {
	return (
		<div className="w-1/4 flex flex-col justify-center p-2">
			<span className="w-full flex flex-row justify-evenly">
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
		<div className="w-[30%] flex flex-col">
			<label htmlFor={labelText} className="text-center">
				{labelText}
			</label>
			<input
				className="text-center w-3/4 text-xl px-2 py-5 rounded-md mx-auto text-input-foreground bg-input-background [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
				type="number"
				name={labelText}
				onChange={(e) => {
					onChange(Number(e.currentTarget.value));
				}}
				defaultValue={value}
			/>
		</div>
	);
}
