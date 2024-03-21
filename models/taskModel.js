import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: { type: String, required: true },
    dateAdded: { type: Date, default: Date.now },
    priority: { type: String, required: true, enum: ['Low', 'Normal', 'High'] },
    done: { type: Boolean, default: false }
});

export default mongoose.model('Task', taskSchema);