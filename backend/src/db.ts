import { connect,Schema,model,Types} from "mongoose";

connect("MongoDB URL");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String
});

export const User = model("User", userSchema);

const contentTypes = ['image', 'video', 'article', 'audio']; // Extend as needed

const contentSchema = new Schema({
  link: { type: String, required: true },
  type: { type: String, enum: contentTypes, required: true },
  title: { type: String, required: true },
  tags: [{ type: Types.ObjectId, ref: 'Tag' }],
  userId: { type: Types.ObjectId, ref: 'User', required: true },
});

export const Content = model("Content", contentSchema);

const tagSchema = new Schema({
    title: { type: String, required: true, unique: true }
});

export const Tag = model("Tag",tagSchema);

const linkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true,unique : true },
  });

export const Link = model("Link",linkSchema);