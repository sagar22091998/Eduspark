import { Request } from 'express';
import IProfileModel from './profile.interface';

export default interface RequestUser extends Request {
    userId: string;
    profile: IProfileModel;
}
