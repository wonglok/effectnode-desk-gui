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

    create: protectedProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async ({ input, ctx }) => {
            //
            await WorkspaceACLModel.create({
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
