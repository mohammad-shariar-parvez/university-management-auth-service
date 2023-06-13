import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from './users.interface'
import { User } from './users.model'
import { generatedUserId } from './users.utils'

//default pass

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto genarated incremental id
  const id = await generatedUserId()
  user.id = id
  if (!user.password) {
    user.password = config.default_user_pass as string
  }
  const createdUser = await User.create(user)

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create User 1')
  }

  return createdUser
}

export default {
  createUser,
}