import { useState } from "react";

export const useRegisterForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    return { username, setUsername,email, setEmail, password, setPassword, password2, setPassword2 };
};