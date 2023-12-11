import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Define a Mongoose schema for the User entity
@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
}

// Create a Mongoose schema based on the User class
export const UserSchema = SchemaFactory.createForClass(User);
