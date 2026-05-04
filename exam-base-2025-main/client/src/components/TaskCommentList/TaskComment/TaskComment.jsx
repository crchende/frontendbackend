import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { updateTaskComment, deleteTaskComment } from '../../../stores/actions/taskcomment-actions'

// selectors
const userIdSelector = state => state.user.data.id

const TaskComment = ( { taskcomment} ) => {
    const [isEditing, setIsEditing] = useState(false)
    const [title, setTitle] = useState(taskcomment.title)
    const [description, setDescription] = useState(taskcomment.description)

    const dispatch = useDispatch()
    const params = useParams()
    const navigate = useNavigate()

    const userId = useSelector(userIdSelector)

    const canEdit = userId === taskcomment.permission?.forUser

    const handleSave = async () => {
        const action = await updateTaskComment(userId, params.pid, params.tid, taskcomment.id, {
            title,
            description
        })
        dispatch(action)
        setIsEditing(false)
    }
    
    const handleDelete = async () => {
        const action = await deleteTaskComment(userId, params.pid, params.tid, taskcomment.id)
        dispatch(action)
    }

    return(
        <tr>
            {
                canEdit
                    ? (
                        isEditing
                            ? (
                                <>
                                    <td>
                                    <input
                                        type='text'
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                    </td>
                                    <td>
                                    <input
                                        type='text'
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                    <button onClick={() => setIsEditing(false)}>
                                        Cancel
                                    </button>
                                    <button onClick={handleSave}>
                                        Save
                                    </button>
                                    </td>
                                </>
                            ) 
                            :
                            (
                                <>
                                    <td>{taskcomment.title}</td>
                                    <td>{taskcomment.description}</td>
                                    <td>
                                        <button onClick={() => setIsEditing(true)}>Edit</button>
                                        <button onClick={handleDelete}>Delete</button>
                                    </td>
                                </>
                            )
                    ) 
                    :
                    (
                        <>
                        <td>{taskcomment.title}</td>
                        <td>{taskcomment.description}</td>
                        <td>&nbsp;</td>
                        </>
                    )
            }
        </tr>
    )
}

export default TaskComment