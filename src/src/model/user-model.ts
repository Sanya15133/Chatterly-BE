import mongoose, { Document, Schema, Model, model } from "mongoose";
import * as bcrypt from "bcrypt";
import connectMongoose from "../connect";

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

userSchema.pre<IUser>("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (error) {
    next();
  }
});

const User: Model<IUser> = model<IUser>("User", userSchema);

const guest = new User({
  name: "Guest",
  password: "123456",
  avatar:
    "https://www.screenfeed.fr/wp-content/uploads/2013/10/default-avatar.png",
});

export async function findUsers() {
  connectMongoose();
  return await User.find().then((users) => {
    console.log(users);
    return users;
  });
}

export async function selectUser(
  name: string,
  password: string,
  avatar: string
) {
  connectMongoose();

  if (name.length < 5) {
    Promise.reject({ status: 400, msg: "Invalid Request" });
  }

  if (password.length < 5) {
    Promise.reject({ status: 400, msg: "Invalid Request" });
  }

  if (!avatar) {
    avatar =
      "https://community.intellistrata.com.au/CommunityMobile/img/user.png";
  }
}

export default User;
