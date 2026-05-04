import User from "./User.jsx"

const UsersList = ( {users} ) => {
    console.log("UsersList", users)

    return(
        users.map(user => {
            //console.log("UserList user:", user)
            return(
                <User key={ user.id } user={ user } />
            )
        })

    )
}

export default UsersList

/**
 *         
 */