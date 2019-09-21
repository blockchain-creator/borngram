import { prisma } from "../../../../generated/prisma-client";
import { generateToken } from "../../../utils";

export default {
  Mutation: {
    confirmSecret: async (_, args, { request }) => {
      const { email, secret } = args;
      const user = await prisma.user({ email });
      console.log(user);
      if (user.loginSecret === secret) {
        await prisma.updateUser({
          where: { id: user.id },
          data: {
            loginSecret: ""
          }
        });
        // JWT
        return generateToken(user.id);
      } else {
        return "잘못된 정보 입니다. 로그인 실패";
      }
    }
  }
};
