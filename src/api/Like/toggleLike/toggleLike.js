import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
export default {
  Mutation: {
    toggleLike: async (_, args, { request }) => {
      isAuthenticated(request);
      const { postId } = args;
      const { user } = request;

      const filterOptions = {
        AND: [
          {
            user: {
              id: user.id
            }
          },
          {
            post: {
              id: postId
            }
          }
        ]
      };
      try {
        // 기존에 좋아요가 있는지 없는지 확인
        const existingLike = await prisma.$exists.like(filterOptions);
        if (existingLike) {
          console.log("UN LIKE");
          //기존 좋아요가 있다면 좋아요 삭제
          await prisma.deleteManyLikes(filterOptions);
        } else {
          console.log("LIKE");
          await prisma.createLike({
            user: {
              connect: {
                id: user.id
              }
            },
            post: {
              connect: {
                id: postId
              }
            }
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    }
  }
};
