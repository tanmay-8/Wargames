export const getUsername = async (email) => {
    try {
        const res = await fetch("https://wargames.onrender.com/api/getUsername", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err.message);
    }
};

export const submitFlag = async (username, flag) => {
    try {
        const res = await fetch("https://wargames.onrender.com/api/submit", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, flag }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err.message);
    }
};

export const getUserStats = async (username) => {
    try {
        const res = await fetch("https://wargames.onrender.com/api/show", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username }),
        });
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err.message);
    }
}