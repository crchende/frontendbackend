/**
 * Defines the 'task_comment' entity in the database.
 *
 * @param {object} sequelize - The Sequelize instance used to define the model.
 * @param {object} DataTypes - A collection of data types supported by Sequelize.
 * @returns {object} A Sequelize model representing the 'task_comments' entity.
 *
 * @property {string} title - The title of the task. This field is required.
 * @property {string} [description] - the comment text
 */
export default (sequelize, DataTypes) => {
  return sequelize.define('task_comment', {
    title: {
      type:
      DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  })
}