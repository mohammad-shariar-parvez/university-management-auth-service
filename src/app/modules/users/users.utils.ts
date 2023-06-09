import { User } from './users.model'

export const findLastUserId = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}
// Optional filtering
// User.find({}, { id: 1, _id: 0 }).sort({ createdAt: -1 }).limit(1)
// db.collection.findOne({}, { id: 1, _id: 0 }, { sort: { createdAt: -1 } })

export const generatedUserId = async () => {
  const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')
  const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
  return incrementedId
}
