import store from '../store'
import { SERVER } from '../../config/global'

export const getAllUsers = async (userId) => {

    const token = store.getState().user.data.token
    const url = `${SERVER}/api/users/${userId}/users`

    return {
        type: 'GET_ALL_USERS',
        payload: async () => {
            const response = await fetch(
                url,
                {
                    headers: {
                        authorization: token
                    }
                }
            )

            if(!response.ok) {
                throw response
            }

            const rjs = await response.json()
            console.log("*** getAllUsers response", rjs)
            return rjs
        }
    }
}

/*
        payload: async () => {
            const response = {
                count: 100,
                data: {
                    user1: "name1",
                    user2: "name2"
                }
            }
            return response
        }
*/