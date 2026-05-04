import './App.css'
import React from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import AuthGuard from '../AuthGuard'
import LoginForm from '../LoginForm'
import ProjectList from '../ProjectList'
import ProjectForm from '../ProjectForm/ProjectForm'
import TaskList from '../TaskList'
import TaskForm from '../TaskForm'
import TaskDetails from '../TaskDetails'
import Dashboard from '../Dashboard'
import ErrorDisplay from '../ErrorDisplay'

import TaskCommentList from '../TaskCommentList'
import TaskCommentForm from '../TaskCommentForm'

import { logout } from '../../stores/actions/user-actions'

// selectors
const userDataSelector = state => state.user.data


const App = () => {
  const dispatch = useDispatch()
  const userData = useSelector(userDataSelector)
  console.log("App: userData:", userData)

  const isAuthenticated = !!userData.token

  const handleLogout = async () => {
    const action = await logout()
    dispatch(action)
  }

  return (
    <div className='app'>
      {isAuthenticated && (
        <div className='app-header'>
          <div>
            <h5>Welcome, {userData.email}</h5>
          </div>
          <div>
            <button onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      )}

      <ErrorDisplay />

      <Router>
        {isAuthenticated && <nav>
            <ul style={{listStyle:"none", display:"flex"}}>
              <li style={{padding:"4px"}}><Link to="/projects">Projects</Link></li>
              {userData.type === "admin" && <li style={{padding:"4px"}}><Link to="/">Dashboard</Link></li>}
            </ul>
          </nav>
        }
        
        <Routes>
          <Route path='/login' element={<LoginForm />} />

          <Route
            path='/'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <Dashboard />
              </AuthGuard>
            }
          />

          <Route
            path='/projects'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <ProjectList />
              </AuthGuard>
            }
          />

          <Route
            path='/projects/new'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <ProjectForm />
              </AuthGuard>
            }
          />
          <Route
            path='/projects/:pid/tasks'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <TaskList />
              </AuthGuard>
            }
          />
          <Route
            path='/projects/:pid/tasks/new'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <TaskForm />
              </AuthGuard>
            }
          />
          <Route
            path='/projects/:pid/tasks/:tid'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <TaskDetails />
              </AuthGuard>
            }
          />

          <Route
            path='/projects/:pid/tasks/:tid/taskcomments'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <TaskCommentList />
              </AuthGuard>
            }
          />

          <Route
            path='/projects/:pid/tasks/:tid/taskcomments/new'
            element={
              <AuthGuard isAuthenticated={isAuthenticated}>
                <TaskCommentForm />
              </AuthGuard>
            }
          />

        </Routes>
      </Router>
    </div>
  )
}

export default App
