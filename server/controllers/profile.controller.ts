import { compare } from 'bcryptjs';
import IProfileModel from '../interfaces/profile.interface';
import Profile from '../models/profile.model';

export const register = async (
    name: string,
    email: string,
    password: string,
    mobileNumber: string
): Promise<unknown> => {
    const profile = new Profile({
        name,
        email,
        password,
        mobileNumber
    });
    await profile.save();
    const token = await profile.generateAuthToken();
    return { profile, token };
};

export const login = async (
    email: string,
    password: string
): Promise<unknown> => {
    const profile = await Profile.findByCredentials(email, password);
    const token = await profile.generateAuthToken();
    return { profile, token };
};

export const changePassword = async (
    profile: IProfileModel,
    oldPassword: string,
    newPassword: string
): Promise<string> => {
    const isMatch = await compare(oldPassword, profile.password);
    if (!isMatch) throw new Error('Incorrect Password');
    profile.password = newPassword;
    await profile.save();
    return 'Changed Password Successfully';
};

export const deleteUser = async (profile: IProfileModel): Promise<string> => {
    await profile.remove();
    return 'Removed the account';
};
