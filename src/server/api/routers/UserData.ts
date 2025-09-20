import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { UserDataModel } from "@/server/db/UserData";

// let post = {
//     id: 1,
//     name: "Hello World",
// };

export const userDataRouter = createTRPCRouter({
    // hello: publicProcedure
    //     .input(z.object({ text: z.string() }))
    //     .query(({ input }) => {
    //         return {
    //             greeting: `Hello ${input.text}`,
    //         };
    //     }),
    //
    //
    updateUser: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ input, ctx }) => {
            //
            let userData = await UserDataModel.findOneAndUpdate(
                {
                    userID: ctx?.session?.user?._id,
                },
                {
                    userID: ctx?.session?.user?._id,
                    name: input.name,
                },
                {
                    new: true,
                    upsert: true,
                },
            );

            //
            return userData?._doc;
        }),

    // getLatest: protectedProcedure.query(() => {
    //     return post;
    // }),
    // getSecretMessage: protectedProcedure.query(() => {
    //     return "you can now see this secret message!";
    // }),
});
