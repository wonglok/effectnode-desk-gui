import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { WorkspaceACLModel } from "@/server/db/WorkspaceACL";
import { WorkspaceObjectModel } from "@/server/db/WorkspaceObject";

let post = {
    id: 1,
    name: "Hello World",
};

export const workspaceObjectRouter = createTRPCRouter({
    // hello: publicProcedure
    //     .input(z.object({ text: z.string() }))
    //     .query(({ input }) => {
    //         return {
    //             greeting: `Hello ${input.text}`,
    //         };
    //     }),

    write: protectedProcedure
        .input(
            z.object({
                workspaceID: z.string(),
                type: z.string(),
                key: z.string(),
                value: z.any(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            //

            //

            //
            await WorkspaceObjectModel.create({
                //
                workspaceID: input.workspaceID,
                //
                type: input.type,
                //
                key: input.key,
                //
                value: input.value,
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
