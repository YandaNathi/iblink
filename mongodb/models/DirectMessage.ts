import mongoose, { Schema, Document } from 'mongoose';

export interface IDirectMessage extends Document {
    sender: string;
    recipient: string;
    message: string;
    createdAt: Date;
}

const DirectMessageSchema: Schema = new Schema({
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const DirectMessage = mongoose.model<IDirectMessage>('DirectMessage', DirectMessageSchema);
export default DirectMessage;