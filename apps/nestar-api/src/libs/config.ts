import { ObjectId } from 'bson';

export const availableAgentSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViewa', 'memberRank'];

export const shapeIntoMongoObjectid = (target: any) => {
    return typeof target === 'string' ? new ObjectId(target) : target;
};