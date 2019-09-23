import { prisma } from "../../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../../fragments";

export default {
  Query: {
    seeRooms: async (_, __, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      console.log(user.id);
      // return prisma.rooms({ where: { participants_some: { id: user.id } } });
      // .$fragment(ROOM_FRAGMENT);

      return prisma
        .rooms({
          where: { participants_some: { id: "ck0s0mhlv000v0844culrhn0z" } }
        })
        .$fragment(ROOM_FRAGMENT);
    }
  }
};
