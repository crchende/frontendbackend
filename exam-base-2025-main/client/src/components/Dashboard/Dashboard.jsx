import './Dashboard.css'
import UsersList from './UsersList.jsx'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../../stores/actions/users-actions'
//import { JSONAPISerializer } from 'miragejs'

// selectors
const userIdSelector = state => state.user.data.id
const userTypeSelector = state => state.user.data.type
const usersDataSelector = state => state.users.data

const Dashboard = () => {
  const dispatch = useDispatch()
  const userType = useSelector(userTypeSelector)

  const userId = useSelector(userIdSelector)
  const users = useSelector(usersDataSelector)

  useEffect(() => {
    console.log("in effect")
    if (!userId || userType != "admin") {
        return
      }

      const loadUsers = async (userId) => {
        const action = await getAllUsers(userId)
        dispatch(action)
      }

      loadUsers()
  }, [dispatch])

  return (
    <div className='dashboard'>
      <h1>Dashboard for {userType}</h1>

      {userType === 'admin' && (
        <div>
            <h1>Utilizatori</h1>
            <table className="utilizatori">
            <thead>
            Tabel utilizatori
            </thead>
            <tbody>
              <tr>
                <th>Email</th>
                <th>Data inregistrare</th>
              </tr>
              <UsersList users={ users } />
            </tbody>
            </table>
        </div>
      )}

      {userType === 'regular' && (
        <div>
          <Link to='/projects'>Projects</Link>
        </div>
      )}
    </div>
  )
}

export default Dashboard


{
/**
 *           {JSON.stringify(users)}
          <table>
            <thead></thead>
            <tbody>
            
            </tbody>
          </table>
 */

}