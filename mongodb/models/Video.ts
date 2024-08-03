import mongoose, { Document, Schema } from 'mongoose';

interface IVideo extends Document {
  title: string;
  description: string;
  url: string;
  user: {
    userId: string;
    name: string;
  };
  timestamp: Date;
}

const VideoSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  url: { type: String, required: true },
  user: {
    userId: { type: String, required: true },
    name: { type: String, required: true },
  },
  timestamp: { type: Date, default: Date.now },
});

const Video = mongoose.model<IVideo>('Video', VideoSchema);

export default Video;
export type { IVideo };
