import { useState } from "react";

function AddPasswordBar(props) {

    const [ newPassword, setnewPassword ] = useState("")

    const handleChange = (e) => setnewPassword(e.target.value)

    const submit = () => {
        props.createNewPassword({password: newPassword})
        setnewPassword("")
    }

}

export default AddPasswordBar;