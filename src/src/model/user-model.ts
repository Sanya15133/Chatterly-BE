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

// const guest = new User({
//   name: "Guest",
//   password: "123456",
//   avatar:
//     "https://www.screenfeed.fr/wp-content/uploads/2013/10/default-avatar.png",
// });

export async function findUsers() {
  connectMongoose();
  return await User.find().then((users) => {
    console.log(users);
    return users;
  });
}

export async function findUser(name: string) {
  connectMongoose();
  return await User.find({ name: name }).then((user) => {
    if (!user) {
      return Promise.reject({ status: 404, msg: "Cannot find specified user" });
    }
    return user;
  });
}

export async function addUser(name: string, password: string, avatar: string) {
  connectMongoose();

  const checkName = await findUser(name);
  if (checkName) {
    return Promise.reject({ status: 400, msg: "User already exists" });
  }

  if (name.length < 5) {
    return Promise.reject({
      status: 400,
      msg: "Name should be longer than 5 characters",
    });
  }

  if (password.length < 5) {
    return Promise.reject({
      status: 400,
      msg: "Password should be longer than 5 characters",
    });
  }

  if (!avatar) {
    avatar =
      "https://community.intellistrata.com.au/CommunityMobile/img/user.png";
  }
  return User.create({ name, password, avatar }).then((user) => {
    return user;
  });
}

export default User;
