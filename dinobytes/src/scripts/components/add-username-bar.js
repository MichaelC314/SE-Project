import { useState } from "react";

function AddUserNameBar(props) {

    const [ newUserName, setNewUserName ] = useState("")

    const handleChange = (e) => setNewUserName(e.target.value)

    const submit = () => {
        props.createNewUserName({userId: newUserName})
        setNewUserName("")
    }

    return (
        <div>
            <input type="text" value={newUserName} onChange={handleChange} />
            <button onClick={submit}>Add User Name</button>
        </div>
    )
}

export default AddUserNameBar;