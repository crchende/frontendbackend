import './TaskList.css'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Task from './Task'
import { getAllTasks } from '../../stores/actions/task-actions'
// import Paginator from '../Paginator/Paginator'

// selectors
const taskDataSelector = state => state.task.data
const userIdSelector = state => state.user.data.id

const TaskList = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const params = useParams()

  const tasks = useSelector(taskDataSelector)
  const userId = useSelector(userIdSelector)

  useEffect(() => {
    if (!userId || !params.pid) {
      return
    }

    const loadTasks = async () => {
      const action = await getAllTasks(userId, params.pid)
      dispatch(action)
    }

    loadTasks()
  }, [dispatch, userId, params.pid])

  return (
    <div className='task-list'>
      <h1>Task list</h1>
      <table>
        <thead>
          <tr>
            <th>
              Name
            </th>
            <th>
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <Task key={task.id} task={task} />
          ))}
        </tbody>
      </table>
      <div className='footer'>
        <button onClick={() => navigate(`/projects/${params.pid}/tasks/new`)}>
          Create Task
        </button>
      </div>
    </div>
  )
}

export default TaskList
