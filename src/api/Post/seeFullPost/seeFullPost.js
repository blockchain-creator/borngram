import { prisma } from "../../../../generated/prisma-client";
import {  FULL_POST_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeFullPost: async (_, args) => {
      const { id } = args;
      console.log(args);
      try {
        return prisma.post({ id }).$fragment(FULL_POST_FRAGMENT);
        
      } catch (error) {
        console.log(error);        
      }
      
      // const comment = await prisma
      //   .post({ id })
      //   .comments()
      //   .$fragment(COMMENT_FRAGMENT);
      // const likeCount = await prisma
      //   .likesConnection({ where: { post: { id } } })
      //   .aggregate()
      //   .count();
      // const files = await prisma.post({ id }).files();
      // const user = await prisma.post({ id }).user();
      // return {
      //   post
        // comment,
        // files,
        // user
      // };
    }
  }
};
