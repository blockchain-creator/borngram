import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    sayGoodbye: async () => {
      return "Goodbye~";
    }
  }
};
