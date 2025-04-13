"use client"
import useLocalStorage from "@/hooks/useLocalStorage";
import { useRef } from "react";

export default function Tasks() {
	const [tasks, setTasks] = useLocalStorage("tasks", [""]);
	const [taskInputText, setTaskInputText] = useLocalStorage("taskInput", "");
    const taskInput = useRef<HTMLInputElement>(null);

	return (
        <div className="lg:w-1/4 min-h-[200px] lg:min-h-[300px] w-full max-w-[700px] px-5 overflow-y-hidden my-auto flex flex-col">
            <div className="h-[75%] max-h-[300px] lg:max-h-[] overflow-y-scroll [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex-grow">
            {tasks.map((task, i) => (
                <Task
                    key={`task-${i}-${task}`}
                    description={task}
                    onDelete={() => {
                        const updatedTasks = tasks.filter(
                            (_, index) => index !== i
                        );
                        setTasks(updatedTasks);
                    }}
                    />
                ))}
            </div>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    setTasks(tasks.concat(taskInputText));
                    setTaskInputText("");
                    if (taskInput.current) {
                        taskInput.current.focus();
                    }
                }}
                className="w-full mb-[2px]"
            >
                <input
                    type="text"
                    onChange={(e) => {
                        setTaskInputText(e.currentTarget.value);
                    }}
                    value={taskInputText}
                    className="bg-input-background text-input-foreground p-2 text-md rounded-l-md w-[80%]"
                    ref={taskInput}
                />
                <button type="submit" className="w-[20%] rounded-r-md bg-foreground text-background p-2 text-md hover:bg-input-background hover:text-input-foreground">+</button>
            </form>
        </div>
	);
}

function Task({
	description,
	onDelete,
}: {
	description: string;
	onDelete: () => void;
}) {
	return <p className="hover:cursor-not-allowed hover:text-red-500" onClick={onDelete}>{description}</p>;
}
