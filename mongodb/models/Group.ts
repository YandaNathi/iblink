import mongoose, { Document, Schema } from 'mongoose';

interface IGroup extends Document {
  name: string;
  description: string;
  members: { userId: string; joinedAt: Date }[];
}

const GroupSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [
    {
      userId: { type: String, required: true },
      joinedAt: { type: Date, default: Date.now },
    },
  ],
});

const Group = mongoose.model<IGroup>('Group', GroupSchema);

export default Group;
export type { IGroup };
