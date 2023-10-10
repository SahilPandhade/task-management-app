const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  name: {type: String,},
  description: {type: String,},
  status: {
    type: String,
    enum: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});
module.exports = mongoose.model('Task', TaskSchema);