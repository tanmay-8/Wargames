import { getUsername, getUserStats, submitFlag } from "./apis";
import { commandsExists } from "./constants";
export const executeCommand = async (
    command,
    history,
    setHistory,
    inputref
) => {
    let data;
    const [cmd, ...args] = command.split(" ");
    inputref.current.value = "";
    switch (cmd) {
        case "help":
            setHistory([
                ...history,
                {
                    command: "help",
                    output: commandsExists,
                },
            ]);
            break;
        case "show-all":
            setHistory([
                ...history,
                {
                    command: "show all",
                    output: "",
                },
            ]);
            window.open("/leaderboard", "_blank");
            break;
        case "clear":
            setHistory([
                {
                    command: "help",
                    output: commandsExists,
                },
            ]);
            break;
        case "username":
            const email = args[0].trim();
            const dataus = await getUsername(email);
            if (dataus.username) {
                setHistory([
                    ...history,
                    {
                        command: `username ${email}`,
                        output: `Username: ${dataus.username}`,
                    },
                ]);
            } else {
                setHistory([
                    ...history,
                    {
                        command: `username ${email}`,
                        output: "User not found",
                    },
                ]);
            }
            break;

        case "submit":
            const username = args[0].split(":")[0].trim();
            const flag = args[0].split(":")[1].trim();
            const datafl = await submitFlag(username, flag);


            if (datafl.success) {
                setHistory([
                    ...history,
                    {
                        command: `submit ${username}:${flag}`,
                        output: `Congratulations! You have completed level .\nPassword for next level is ${datafl.password}`,
                    },
                ]);
            }else{
                setHistory([
                    ...history,
                    {
                        command: `submit ${username}:${flag}`,
                        output: datafl.msg,
                    },
                ]);
            }
            break;
        
        case "show":
            const username2 = args[0].trim();
            const datash = (await getUserStats(username2)).data;
            if (datash.username) {
                setHistory([
                    ...history,
                    {
                        command: `show ${username2}`,
                        output: `Username: ${datash.username}\nLevel: ${datash.curlevel}`,
                    },
                ]);
            } else {
                setHistory([
                    ...history,
                    {
                        command: `show ${username2}`,
                        output: "User not found",
                    },
                ]);
            }
            break;
        default:
            setHistory([
                ...history,
                {
                    command: command,
                    output: `bash: ${command}: command not found`,
                },
            ]);
            break;
    }
};
