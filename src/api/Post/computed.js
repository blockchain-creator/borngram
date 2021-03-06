import { prisma } from "../../../generated/prisma-client";
export default {
  Post: {
    isLiked: async (parent, __, { request }) => {
      const { user } = request;
      const { id: parentId } = parent;
      return prisma.$exists.like({
        AND: [{ user: { id: user.id } }, { post: { id: parentId } }]
      });
    },
    likeCount: parent =>
      prisma.likesConnection({ where: { post: { id: parent.id } } }).aggregate().count()
  }
};
