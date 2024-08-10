"use client";
import React, { useRef } from "react";
import { useState } from "react";
import { commandsExists } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { executeCommand } from "@/utils/Execute";

const Home = () => {
    const router = useRouter();
    const inputref = useRef(null);
    const [history, setHistory] = useState([
        {
            command: "help",
            output: commandsExists,
        },
    ]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1877f2] to-blue-200 flex justify-center items-center lg:p-12 p-8">
            <div className="bg-black/30 rounded-lg backdrop:blur-lg h-[85vh] p-4 lg:w-11/12 space-y-6 text-lg font-mono box-border overflow-auto">
                {history.map((h, i) => (
                    <div key={i}>
                        <div>
                            <span className="text-[#20C20E]">
                                player@wargames:~$&nbsp;
                            </span>
                            <span className="text-white">{h.command}</span>
                        </div>
                        <pre className="text-white">{h.output}</pre>
                    </div>
                ))}
                <div>
                    <span className="text-[#20C20E]">
                        player@wargames:~$&nbsp;
                    </span>
                    <input
                        className="bg-transparent text-white outline-none w-[70%]"
                        type="text"
                        placeholder="Enter command"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                executeCommand(
                                    inputref.current.value,
                                    history,
                                    setHistory,
                                    inputref
                                );
                                
                            }else if(e.key === "ArrowUp"){
                                inputref.current.value = history[history.length-1].command;
                            }
                        }}
                        ref={inputref}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
