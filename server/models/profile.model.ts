import { Schema, model, Model, Error } from 'mongoose';
import validator from 'validator';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import Course from './course.model';
import Enroll from './enroll.model';
import Score from './score.model';
import IProfileDocument from '../interfaces/profile.interface';
import IToken from '../interfaces/token.interface';

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
            unique: true,
            minlength: 10,
            maxlength: 10
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

export interface IProfileModel extends IProfileDocument {
    generateAuthToken(): string;
}

export interface IProfile extends Model<IProfileModel> {
    findByCredentials(email: string, password: string): IProfileModel;
}

profileSchema.methods.toJSON = function () {
    const profile = this!;
    const profileObject = profile.toObject();

    delete profileObject.password;
    delete profileObject._id;

    return profileObject;
};

profileSchema.methods.generateAuthToken = async function () {
    const user = this!;
    const secret: string = process.env.JWT_SECRET!;
    const _id: string = user._id.toString();
    const payload: IToken = { _id };
    const token: string = jwt.sign(payload, secret, {
        expiresIn: '10m'
    });

    return token;
};

profileSchema.statics.findByCredentials = async function (
    email: string,
    password: string
) {
    const profile = await Profile.findOne({ email });
    if (!profile) {
        throw new Error('Unable to Login');
    }
    const isMatch = await bcrypt.compare(password, profile.password);
    if (!isMatch) {
        throw new Error('Unable to Login');
    }
    return profile;
};

profileSchema.pre('save', async function (this: IProfileModel, next) {
    const user = this!;
    if (user.isModified('password')) {
        user.password = await bcrypt.hashSync(user.password, 8);
    }
    next();
});

profileSchema.pre('remove' || 'deleteOne', async function (next) {
    const courses = await Course.find({ instructorId: this._id });
    await Promise.all(
        courses.map(async (element) => {
            await element.remove();
        })
    );
    await Enroll.deleteMany({ studentId: this._id });
    await Score.deleteMany({ studentId: this._id });
    next();
});

const Profile: IProfile = model<IProfileModel, IProfile>(
    'Profile',
    profileSchema
);
export default Profile;
