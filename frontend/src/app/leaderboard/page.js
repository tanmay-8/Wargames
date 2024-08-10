"use client";
import React from "react";
import { useState, useEffect } from "react";

const Leaderboard = () => {
    const [users, setUsers] = useState([]);

    const getData = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/leaderboard");
            const data = await res.json();
            if (data) {
                setUsers(data.data);
            }
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getData();
    }, []);
    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1877f2] to-blue-200 flex justify-center items-center lg:p-12 p-8">
            <div className="bg-black/30 rounded-lg backdrop:blur-lg h-[85vh] p-4 lg:w-11/12 space-y-6 text-lg font-mono box-border overflow-auto">
                {users.length > 0 ? (
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="text-white text-lg font-semibold">
                            <tr>
                                <th className="px-6 py-3 text-left   uppercase tracking-wider">
                                    Rank
                                </th>
                                <th className="px-6 py-3 text-left   uppercase tracking-wider">
                                    Username
                                </th>
                                <th className="px-6 py-3 text-left   uppercase tracking-wider">
                                    curlevel
                                </th>
                            </tr>
                        </thead>
                        <tbody className=" divide-y divide-gray-200 text-white">
                            {users.map((user, index) => (
                                <tr key={user.username}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.username}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.curlevel}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <div className="w-full h-full flex justify-center items-center">
                        <h1 className="text-white text-2xl font-semibold">
                            No submissions yet
                        </h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
