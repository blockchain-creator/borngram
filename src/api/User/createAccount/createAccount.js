import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { fullName, email, firstName = "", lastName = "", bio = "" } = args;
      const user = await prisma.createUser({
        fullName,
        email,
        firstName,
        lastName,
        bio
      });
      return user;
    }
  }
};
