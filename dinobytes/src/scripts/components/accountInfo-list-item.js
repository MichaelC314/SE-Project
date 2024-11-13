function AccountInfoListItem(props) {
    const accountInfo = props.accountInfo

    return (
        <li key={accountInfo.id}>
            <h3>{accountInfo.userId}</h3>
            <h3>{accountInfo.password}</h3>
        </li>
    )
}

export default AccountInfoListItem