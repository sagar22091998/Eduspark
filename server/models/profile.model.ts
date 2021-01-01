import { Schema, model, Model } from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import Course from './course.model';
import Enroll from './enroll.model';
import Score from './score.model';
import IProfile from '../interfaces/profile.interface';

const profileSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate(value: string) {
                if (!validator.isEmail(value)) {
                    throw new Error('Email is invalid');
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value: string) {
                if (value.toLowerCase().includes('password')) {
                    throw new Error('Password cannot contain "password"');
                }
            }
        },
        mobileNumber: {
            type: String,
            trim: true,
            required: true,
            minlength: 10,
            maxlength: 10
        },
        profileType: {
            type: Boolean,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
);

profileSchema.methods.generateAuthToken = async function () {
    const user = this!;
    const secret: string = process.env.JWT_SECRET!;
    const token = jwt.sign({ _id: user._id.toString() }, secret, {
        expiresIn: '7d'
    });

    return token;
};

profileSchema.pre('save', async function (this: IProfile, next) {
    const user = this!;
    if (user.isModified('password')) {
        user.password = await bcrypt.hashSync(user.password, 8);
    }
    next();
});

profileSchema.pre('remove' || 'deleteOne', async function (next) {
    await Course.deleteMany({ instructorId: this._id });
    await Enroll.deleteMany({ studentId: this._id });
    await Score.deleteMany({ studentId: this._id });
    next();
});

const Profile: Model<IProfile> = model<IProfile>('Profile', profileSchema);
export default Profile;
