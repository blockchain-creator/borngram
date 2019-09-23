import { prisma } from "../../../generated/prisma-client";
import { ROOM_FRAGMENT } from "../../fragments";

export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { user } = request;
      const { roomId, message, toId } = args;
      let room;
      if (roomId === undefined) {
        if (user.id !== toId) {
          room = await prisma
            .createRoom({
              participants: {
                connect: [{ id: toId }, { id: user.id }]
              }
            })
            .$fragment(ROOM_FRAGMENT);
        }
      } else {
        room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
      }
      if (!room) {
        throw Error("채팅방이 존재 하지 않습니다.");
      }
      const getTo = room.participants.map(
        participant => participant.id !== user.id
      )[0];
      const newMessage = await prisma.createMessage({
        text: message,
        from: {
          connect: {
            id: user.id
          }
        },
        to: {
          connect: {
            id: roomId ? getTo.id : toId
          }
        },
        room: {
          connect: {
            id: room.id
          }
        }
      });
      return newMessage;
    }
  }
};
