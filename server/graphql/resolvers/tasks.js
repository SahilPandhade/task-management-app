const { GraphQLError } = require('graphql')
const Task = require('../../models/Task')
const User = require('../../models/User')
module.exports = {
    Mutation: {
        async addTask(_, { taskInput, userId }) {
            try {
                const user = await User.findById(userId)
                if (!user) {
                    throw new Error('User not found')
                }
                const { name, description, status } = taskInput;
                const task = new Task({
                    name: name,
                    description: description,
                    status: status,
                    userId: user._id,
                })

                const savedTask = await task.save()
                if (!savedTask) {
                    throw new GraphQLError('Task not saved', {
                        extensions: {
                            code: 'TASK_SAVE_UNSUCCESSFUL'
                        }
                    })
                }
                savedTask.user = user
                return savedTask
            } catch (e) {
                console.log(`Error adding the task ${e.message}`)
            }
        },
        async deleteTask(_, { id }) {
            return await Task.findByIdAndRemove(id)

        },
        async updateTask(_, { id, taskInput }) {
            const { name, description, status } = taskInput
            return await Task.findByIdAndUpdate(
                id,
                {
                    $set: {
                        name: name,
                        description: description,
                        status: status,
                    },
                },
                { new: true }
            );
        }
    },
    Query: {
        task: async(_, {taskId}) => {
            const task = await Task.findById(taskId)
            const user = await User.findById(task.userId)
            return {...task._doc,user}
        },
        tasks: async (_, { userId }) => {
            const foundedTasks = await Task.find({ userId:userId });
            const user = await User.findById(userId)
            return foundedTasks.map((task)=>{
                const newTask = {...task._doc,user}
                return newTask
            })
        }
    }
}