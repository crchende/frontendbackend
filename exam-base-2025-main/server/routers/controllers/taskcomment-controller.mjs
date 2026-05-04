import models from '../../models/index.mjs'
import { Op } from 'sequelize'

const getAllTaskComments = async (req, res, next) => {
    console.log("taskcomment-controller. Apel async getAllTaskComments")
  try {
    const query = {
        where: {
            taskId: req.params.tid
        }
    }
    const filterQuery = {
        where: {
            taskId: req.params.pid
        }
    }

    if (req.query.filterField && req.query.filterValue) {
      query.where = {
        ...query.where,
        [req.query.filterField]: {
          [Op.like]: `%${req.query.filterValue}%`
        }
      }
      filterQuery.where = {
        ...filterQuery.where,
        [req.query.filterField]: {
          [Op.like]: `%${req.query.filterValue}%`
        }
      }
    }

    if (req.query.pageSize && req.query.pageNumber) {
      query.limit = req.query.pageSize
      query.offset = parseInt(req.query.pageSize) * parseInt(req.query.pageNumber)
    }

    if (req.query.sortField && req.query.sortOrder) {
      query.order = [[req.query.sortField, req.query.sortOrder]]
    }
    
    let count = await models.TaskComment.count({
      ...filterQuery,
      include: {
        model: models.Permission,
        where: {
          forUser: req.params.uid,
          type: 'taskcomment'
        },
        required: false
      }
    })
    
    //const count = 3
    
    let data = await models.TaskComment.findAll({
      ...query,
      include: [{
        model: models.Permission,
        where: {
          forUser: req.params.uid,
          type: 'taskcomment'
        },
        required: false
      }, {
        model: models.User,
        required: false,
        as: 'assignedTo',
        attributes: ['id', 'email']
      }]
    })
    
    //const data = [1, 2, 3]
    res.status(200).json({ data, count })
  } catch (err) {
    next(err)
  }
}

const createOwnedTaskComment = async (req, res, next) => {
  try {
    const taskcomment = await models.TaskComment.create({
      ...req.body,
      projectId: req.params.pid,
      taskId: req.params.tid
    })
    await models.Permission.create({
      forResource: taskcomment.id,
      forUser: req.params.uid,
      type: 'taskcomment',
      rights: ['read', 'write']
    })
    res.status(201).json(taskcomment)
  } catch (err) {
    next(err)
  }
}

const updateOwnedTaskComment = async (req, res, next) => {
    console.log("Apel functie: updateOwnedTaskComment")
  try {
    const taskcomment = await models.TaskComment.findOne({
      where: {
        id: req.params.tcid,
      }
    })

    console.log("UpdateOwnedTaskComment: found taskcomment", taskcomment)

    if (taskcomment) {
      await taskcomment.update(req.body)
      res.status(200).json(taskcomment)
    } else {
      res.status(404).json({ message: 'Task not found' })
    }
  } catch (err) {
    next(err)
  }
}

const deleteOwnedTaskComment = async (req, res, next) => {
  try {
    const taskcomment = await models.TaskComment.findOne({
      where: {
        id: req.params.tcid,
        taskId: req.params.tid
      }
    })
    const permission = await models.Permission.findOne({
        where: {
                forResource: req.params.tcid,
                forUser: req.params.uid,
                type: 'taskcomment'
            }
        })
    if (taskcomment && permission) {
        await permission.destroy()
      await taskcomment.destroy()
      res.status(204).end()
    } else {
      res.status(404).json({ message: 'Task comment not found' })
    }
  } catch (err) {
    next(err)
  }
}


export default {
    getAllTaskComments, 
    createOwnedTaskComment,
    updateOwnedTaskComment,
    deleteOwnedTaskComment
}