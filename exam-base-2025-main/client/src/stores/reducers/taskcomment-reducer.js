const initialState = {
  data: [],
  count: 0,
  selectedTaskComment: null,
  loading: false,
  error: null
}

export default function taskCommentReducer(state = initialState, action) {
    //console.log("taskcomment-reducer - apel taskCommentReducer. action.type:", action.type)
    switch (action.type) {
        case `GET_ALL_TASKCOMMENTS_PENDING`:
        case `DELETE_TASKCOMMENT_PENDING`:
        case `UPDATE_TASKCOMMENT_PENDING`:
            return {
                ...state,
                loading: true,
                error: null
            }
        case `GET_ALL_TASKCOMMENTS_FULFILLED`:
        case `DELETE_TASKCOMMENT_FULFILLED`:
        case `UPDATE_TASKCOMMENT_FULFILLED`:
            //console.log("*** data", action.payload.data)
            return {
                ...state,
                loading: false,
                error: null,
                data: action.payload.data,
                count: action.payload.count
            }
        case `GET_ALL_TASKCOMMENTS_REJECTED`:
        case `DELETE_TASKCOMMENT_REEJCTED`:
        case `UPDATE_TASKCOMMENT_REEJCTED`:
            console.log("+++ action.payload:", action.payload)
            console.log("+++ action.error:", action.error)
            return {
                ...state,
                loading: false,
                error: action.payload || action.error || "Task Comments error"
            }
        default:
            return state
    }
}