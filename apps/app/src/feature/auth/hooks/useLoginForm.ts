import { useState } from "react";

export const useLoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return { username, setUsername, password, setPassword};
};