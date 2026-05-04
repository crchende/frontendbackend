import store from '../store'
import { SERVER } from '../../config/global'

export const getAllTaskComments = async (
    userId,
    projectId,
    taskId, 
    {
    pageNumber = '',
    pageSize = '',
    filterField = '',
    filterValue = '',
    sortField = '',
    sortOrder = ''
    } = {}
) => {
    const token = store.getState().user.data.token

    const url = `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/taskcomments`

    return {
        type: 'GET_ALL_TASKCOMMENTS',
        payload: async () => {
            const response = await fetch(
                url,
                {
                    headers: {
                        authorization: token
                    }
                }
            )

            if (!response.ok) {
                throw response
            }

            // expected: { data, count }
            const rjs = await response.json()
            console.log("*** response", rjs)
            //return response.json()
            return rjs
        }
    }
}

export const createTaskComment = async (userId, projectId, taskId, task) => {
  const token = store.getState().user.data.token

  return {
    type: 'CREATE_TASKCOMMENT',
    payload: async () => {
      let response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/taskcomments`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          },
          body: JSON.stringify(task)
        }
      )

      if (!response.ok) {
        throw response
      }

      // refresh list after create
      response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/taskcomments`,
        {
          headers: {
            authorization: token
          }
        }
      )

      if (!response.ok) {
        throw response
      }

      return response.json()
    }
  }
}

export const updateTaskComment = async (userId, projectId, taskId, taskCommentId, taskcomment) => {
  const token = store.getState().user.data.token

  return {
    type: 'UPDATE_TASKCOMMENT',
    payload: async () => {
      let response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/taskcomments/${taskCommentId}`,
        {
          method: 'put',
          headers: {
            'Content-Type': 'application/json',
            authorization: token
          },
          body: JSON.stringify(taskcomment)
        }
      )

      if (!response.ok) {
        throw response
      }

      // refresh list after create
      response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/taskcomments`,
        {
          headers: {
            authorization: token
          }
        }
      )

      if (!response.ok) {
        throw response
      }

      return response.json()
    }
  }
}

export const deleteTaskComment = async (userId, projectId, taskId, id) => {
  const token = store.getState().user.data.token

  return {
    type: 'DELETE_TASKCOMMENT',
    payload: async () => {
      let response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/taskcomments/${id}`,
        {
          method: 'delete',
          headers: {
            authorization: token
          }
        }
      )

      if (!response.ok) {
        throw response
      }

      // refresh list after delete
      response = await fetch(
        `${SERVER}/api/users/${userId}/projects/${projectId}/tasks/${taskId}/taskcomments`,
        {
          headers: {
            authorization: token
          }
        }
      )

      if (!response.ok) {
        throw response
      }

      return response.json()
    }
  }
}