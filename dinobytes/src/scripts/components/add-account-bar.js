import { useState } from "react";

function AddActionBar(props) {
    const [newUserName, setNewUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const handleUserNameChange = (e) => setNewUserName(e.target.value);
    const handlePasswordChange = (e) => setNewPassword(e.target.value);

    const submit = () => {
        props.createAccount({
            userId: newUserName,
            password: newPassword,
        });
        setNewUserName("");
        setNewPassword("");
    };

    return (
        <div>
            <input
                type="text"
                placeholder="User Name"
                value={newUserName}
                onChange={handleUserNameChange}
            />
            <input
                type="password"
                placeholder="Password"
                value={newPassword}
                onChange={handlePasswordChange}
            />
            <button onClick={submit}>Add Account</button>
        </div>
    );
}

export default AddActionBar;
