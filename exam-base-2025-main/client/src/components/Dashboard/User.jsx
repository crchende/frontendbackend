
const User = ( props ) => {
    console.log("User. user:", props.user)

    const optiuni_data = {
        year:"numeric", 
        month: "long", 
        day: "2-digit", 
        weekday: "long", 
        hour: "2-digit", 
        minute: "2-digit", 
        second: "2-digit"
    }
    const ob_data = new Date(props.user.createdAt)
    const data_formatata = ob_data.toLocaleDateString("ro", optiuni_data)
    
    return(

        <tr>
            <td>{props.user.email}</td>
            <td>{data_formatata}</td>
        </tr>
      
    )
}

export default User