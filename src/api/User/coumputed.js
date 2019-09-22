import { prisma } from "../../../generated/prisma-client";

export default {
  User: {
    fullName: parent => {
      return `${parent.firstName} ${parent.lastName}`;
    },
    isFollowing: async (parent, __, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;

      try {
        const exist = await prisma.$exists.user({
          AND: [{ id: parentId }, { followers_some: { id: user.id } }]
        });
        console.log(exist);
        return exist;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    isSelf: (parent, __, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return user.id === parentId;
    }
  }
};
