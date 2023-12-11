import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

// Define a Mongoose schema for the Url entity
@Schema({ timestamps: true }) // Use the timestamps option to automatically add createdAt and updatedAt fields
export class Url {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the User model, indicating that userId will be an ObjectId associated with a User
  })
  userId: mongoose.Types.ObjectId; // ObjectId representing the user associated with the URL

  @Prop()
  title: string;

  @Prop()
  shortUrl: string;

  @Prop()
  longUrl: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}
// Create a Mongoose schema based on the Url class
export const UrlSchema = SchemaFactory.createForClass(Url);
