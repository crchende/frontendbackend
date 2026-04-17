import Sequelize from 'sequelize'
import createProjectEntity from './project.mjs'
import createTaskEntity from './task.mjs'
import createUserEntity from './user.mjs'
import createPermissionEntity from './permission.mjs'
import createTaskCommentEntity from './task_comment.mjs'

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './db.sqlite',
  logQueryParameters: true
})

const Project = createProjectEntity(sequelize, Sequelize)
const Task = createTaskEntity(sequelize, Sequelize)
const User = createUserEntity(sequelize, Sequelize)
const Permission = createPermissionEntity(sequelize, Sequelize)
const TaskComment = createTaskCommentEntity(sequelize, Sequelize)

User.hasMany(Project)
Project.belongsTo(User)

Project.hasMany(Task)
Task.belongsTo(Project)

Project.hasOne(Permission, {
  foreignKey: 'forResource',
  constraints: false
})
Task.hasOne(Permission, {
  foreignKey: 'forResource', constraints: false
})

Task.belongsTo(User, { as: 'assignedTo' })
User.hasOne(Task)

Task.hasMany(TaskComment)
TaskComment.belongsTo(Task)

TaskComment.hasOne(Permission, {
  foreignKey: 'forResource', constraints: false
})

TaskComment.belongsTo(User, { as: 'assignedTo' })
User.hasOne(TaskComment)

try {
  await sequelize.sync({
    alter: true
  })
} catch (err) {
  console.warn(err)
}

export default {
  sequelize,
  Permission,
  Project,
  Task,
  User,
  TaskComment
}
