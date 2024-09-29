import { model, models, Schema, Document } from 'mongoose'

export interface IUser extends Document {
    Email: string,
    Password: string,
    userName: string,
    Phone: number,
    profileImage: string,
    IsAdmin: boolean,
    IsBlocked: boolean
    lastMessage?: string
    lastSeen?: string
}

const userSchema = new Schema<IUser>({

    Email: { type: String, required: true, unique: true },
    Password: { type: String, required: true },
    userName: { type: String, required: true },
    Phone: { type: Number, required: true, unique: true },
    profileImage: { type: String, required: true },
    IsAdmin: { type: Boolean, required: true, default: false },
    IsBlocked: { type: Boolean, required: true, default: false },
    lastSeen: { type: String, required: true, default: false }

}, { timestamps: true })

export const UserModel = models.users || model("users", userSchema)