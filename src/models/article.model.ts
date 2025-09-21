import mongoose, { Schema, Document } from 'mongoose';

export interface IArticle extends Document {
  title: string;
  content: string;
  author: string;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ArticleSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    summary: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IArticle>('Article', ArticleSchema);
