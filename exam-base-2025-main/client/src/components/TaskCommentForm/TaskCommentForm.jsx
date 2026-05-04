import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { createTaskComment } from '../../stores/actions/taskcomment-actions'

// selectors
const userIdSelector = state => state.user.data.id

const TaskCommentForm = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const params = useParams()
    const userId = useSelector(userIdSelector)

    const handleCreate = async () => {
        const action = await createTaskComment(userId, params.pid, params.tid, { title, description })
        dispatch(action)
        navigate(`/projects/${params.pid}/tasks/${params.tid}/taskcomments`)
    }

    return(
        <div>
            <h1>Task Comment Form</h1>
            <input
                type='text'
                placeholder='title'
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
            <input
                type='text'
                placeholder='description'
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
            <button onClick={handleCreate}>
                Create
            </button>
        </div>
    )
}

export default TaskCommentForm