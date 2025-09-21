import mongoose, { Schema, Document } from 'mongoose';

export type InteractionType = 'view' | 'like';

export interface IInteraction extends Document {
  userId: mongoose.Types.ObjectId;
  articleId: mongoose.Types.ObjectId;
  interactionType: InteractionType;
  createdAt: Date;
}

const InteractionSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    articleId: { type: Schema.Types.ObjectId, ref: 'Article', required: true },
    interactionType: { type: String, required: true }
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default mongoose.model<IInteraction>('Interaction', InteractionSchema);
