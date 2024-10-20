import { useState, useEffect } from 'react'
import {create} from '../services/accountInfo.mjs'
import {findAll} from '../services/accountInfo.mjs'
import AddUserNameBar from './add-username-bar.js'
import AccountInfoListItem from './accountInfo-list-item.js'
import AddPasswordBar from './add-password-bar.js'

function AccountInfoList() {
    const [loading, setLoading] = useState(false)
    const [userNames, setNewUserName] = useState([])
    const [passwords, setNewPassword] = useState([])

    const fetchData = async () => {
        setLoading(true)

        const res = await findAll()

        setNewUserName([...res]);
        setNewPassword([...res]);
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [])


    const createNewUserName = async (args) => {
        const res = await create(args);
        setNewUserName([...userNames, { id: res.id, ...args }]);
    };

    const createNewPassword = async (args) => {
        const res = await create(args);
        setNewPassword([...passwords, { id: res.id, ...args }]);
    };
 
    return (
        <section>
            <header>
                <h2>Set User Name</h2>
            </header>

            <AddUserNameBar createNewUserName={createNewUserName}/>

            { loading && 
                <p>loading...</p>
            }

            <ul>
            {userNames.length > 0 && userNames.map(accountInfo => (
                <AccountInfoListItem accountInfo= {accountInfo}/>
            ))}
            </ul>

            <header>
                <h2>Set Password</h2>
            </header>

            <AddPasswordBar createNewPassword={createNewPassword}/>

            { loading && 
                <p>loading...</p>
            }

            <ul>
            {passwords.length > 0 && passwords.map(accountInfo => (
                <AccountInfoListItem accountInfo= {accountInfo}/>
            ))}
            </ul>
        </section>
    )
}

export default AccountInfoList