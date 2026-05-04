
import './TaskCommentList.css'

import { useState, useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { useParams, useLocation, useNavigate } from 'react-router-dom'

import { getAllTaskComments } from '../../stores/actions/taskcomment-actions'

import TaskComment from './TaskComment'

// selectors
const taskCommentsDataSelector = state => state.taskcomment.data
const taskCommentsCountSelector = state => state.taskcomment.count
const userIdSelector = state => state.user.data.id

const TaskCommentList = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    
    const taskcomments = useSelector(taskCommentsDataSelector)
    const totalRecords = useSelector(taskCommentsCountSelector)
    const userId = useSelector(userIdSelector)

    const location_info = useLocation()
    const task_id_path = location_info.pathname.substring(0,location_info.pathname.lastIndexOf("/"))

    const back_to_tasks_path = task_id_path.substring(0,task_id_path.lastIndexOf("/"))

    useEffect(() => {
        if (!userId || !params.pid) {
            return
        }
        const loadTaskComments = async () => {
            const action = await getAllTaskComments(userId, params.pid, params.tid)
            dispatch(action)
        }
        loadTaskComments()
    }, [dispatch, userId, params.pid])

    return(
        <div className='taskcomment-list'>

            <div 
                onClick={() => navigate(back_to_tasks_path)} 
                style={{color:"blue", margin:"4px", cursor:"grab"}}
            >        
                <u>Tasks</u>
            </div>

            <h1>Task Comment List</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            <div>Title</div>
                        </th>
                        <th>
                            <div>Description</div>
                        </th>
                        <th>
                            Actiuni
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {taskcomments.map(taskcomment => 
                        <TaskComment key={taskcomment.id} taskcomment={taskcomment}/>
                    )}
                </tbody>
            </table>


            <div className='footer'>
                <button onClick={() => navigate(`/projects/${params.pid}/tasks/${params.tid}/taskcomments/new`)}>
                Create Task Comment
                </button>
            </div>
        </div>
    )
}

export default TaskCommentList