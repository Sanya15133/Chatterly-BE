import mongoose, { Document, Schema, Model, model } from "mongoose";
import * as bcrypt from "bcrypt";

interface IUser extends Document {
  name: string;
  password: string;
  avatar?: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", async function (next: any) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User: Model<IUser> = model<IUser>("User", userSchema);
export default User;



interface ISignIn extends Document {
  name: string;
  password: string;
}

const signInSchema: Schema<ISignIn> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

