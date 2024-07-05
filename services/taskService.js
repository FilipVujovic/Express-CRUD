const db = require("../database");
const crypto = require("crypto");

exports.createTask = async (taskData, userData) => {
  const insertQuery = `INSERT INTO "task"(id, title, description, priority, status, "userId") VALUES ('${crypto.randomUUID()}', '${
    taskData.title
  }', '${taskData.description}', '${taskData.priority}', '${
    taskData.status
  }', '${userData.id}')`;

  try {
    const dbResult = await db.query(insertQuery);
    return dbResult;
  } catch (error) {
    throw error;
  }
};

exports.getTaskById = async (taskId, userData) => {
  const getAllQuery = `SELECT id, title, description, priority, status, "userId" from "task" where "userId"='${userData.id}'`;
  try {
    const getAllResult = await db.query(getAllQuery);
    if (getAllResult.rowCount === 0) {
      throw {
        status: 400,
        message: "This user does not have any tasks.",
      };
    } else if (!getAllResult.rows.find((task) => task.id === taskId)) {
      throw {
        status: 401,
        message: "You do not have permissions to get this task.",
      };
    }

    return getAllResult.rows.find((task) => task.id === taskId);
  } catch (error) {
    throw error;
  }
};

exports.getAllTasks = async (userData) => {
  const getAllQuery = `SELECT id, title, description, priority, status, "userId" from "task" where "userId"='${userData.id}'`;
  try {
    const getAllResult = await db.query(getAllQuery);
    return getAllResult.rows;
  } catch (error) {
    throw error;
  }
};

exports.updateTask = async (taskData, userData) => {
  const getTask = `SELECT id, title, description, priority, status, "userId" from "task" where id='${taskData.id}'`;
  const updateQuery = `UPDATE "task" SET title='${taskData.title}', description='${taskData.description}', priority='${taskData.priority}', status='${taskData.status}' WHERE id='${taskData.id}';`;
  try {
    const getResut = await db.query(getTask);
    if (getResut.rowCount === 0) {
      throw {
        status: 400,
        message: "This task does not exist.",
      };
    } else if (getResut.rows[0].userId != userData.id) {
      throw {
        status: 401,
        message: "You can not update this task.",
      };
    }
  } catch (error) {
    throw error;
  }

  try {
    const updateResult = await db.query(updateQuery);
    return updateResult;
  } catch (error) {
    throw error;
  }
};

exports.deleteTask = async (taskId, userData) => {
  const getTaskQuery = `SELECT id, title, description, priority, status, "userId" from "task" where id='${taskId}'`;
  const deleteQuery = `DELETE from "task" where id='${taskId}'`;

  try {
    const getResult = await db.query(getTaskQuery);
    if (getResult.rowCount === 0) {
      throw {
        status: 400,
        message: "This task does not exist.",
      };
    } else if (getResult.rows[0].userId != userData.id) {
      throw {
        status: 401,
        message: "You can not delete this task.",
      };
    }
  } catch (error) {
    throw(error);
  }

  try {
    const deleteResult = await db.query(deleteQuery);
    return deleteResult;
  } catch (error) {
    throw (error);
  }
};
