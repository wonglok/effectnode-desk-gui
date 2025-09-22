import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { WorkspaceACLModel } from "@/server/db/WorkspaceACL";

let post = {
    id: 1,
    name: "Hello World",
};

export const workspaceACLRouter = createTRPCRouter({
    // hello: publicProcedure
    //     .input(z.object({ text: z.string() }))
    //     .query(({ input }) => {
    //         return {
    //             greeting: `Hello ${input.text}`,
    //         };
    //     }),

    listMy: protectedProcedure
        .input(z.object({}))
        .mutation(async ({ input, ctx }) => {
            //
            let mySpaces = await WorkspaceACLModel.find({
                members: {
                    $elemMatch: {
                        userID: `${ctx.session?.user?._id}`,
                    },
                },
            });

            //

            return mySpaces.map((r) => r._doc);
        }),
    create: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ input, ctx }) => {
            //
            let object = await WorkspaceACLModel.create({
                name: input.name,
                members: [
                    {
                        name: ctx?.session?.user?.name,
                        userID: ctx?.session?.user?._id,
                        email: ctx?.session?.user?.email,
                        role: "admin", // admin / editor / viewer
                    },
                ],
            });

            return object._doc;
            // post = { id: post.id + 1, name: input.name };
            // return post;
        }),
    // getLatest: protectedProcedure.query(() => {
    //     return post;
    // }),
    // getSecretMessage: protectedProcedure.query(() => {
    //     return "you can now see this secret message!";
    // }),
});
