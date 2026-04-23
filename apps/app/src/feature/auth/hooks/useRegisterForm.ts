import { useState } from "react";

export const useRegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    const submit = async () => {
    };

    return { username, setUsername, password, setPassword, password2, setPassword2, submit };
};