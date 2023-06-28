import { User } from './user.model';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import { generatedFacultyId } from './user.utils';

//default pass

const createUser = async (user: IUser): Promise<IUser | null> => {
  // console.log('USER IN SERVICE', user);

  //auto genarated incremental id
  // const semester = {
  //   code: '01',
  //   year: '2025',
  // };
  const id = await generatedFacultyId();
  user.id = id;
  if (!user.password) {
    user.password = config.default_user_pass as string;
  }
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create User 1');
  }

  return createdUser;
};

export const UserService = {
  createUser,
};
