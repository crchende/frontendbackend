const initialState = {
  data: [],
  count: 0,
  selectedTask: null,
  loading: false,
  error: null
}

export default function usersReducer(state = initialState, action) {
    switch(action.type) {
        case "GET_ALL_USERS_PENDING":
            return {
                ...state,
                loading: true,
                error: null
            }
        case "GET_ALL_USERS_FULFILLED":
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload.data,
                count: action.payload.count
            }
        case "GET_ALL_USERS_REJECTED":
            return {
                ...state,
                loading: false,
                error: action.payload || action.error || "Users info error!"
            }
        default:
            return state
    }
}