import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "@/server/api/trpc";
import { canEditSpace } from "@/server/db/WorkspaceACL";
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
                key: `${input.key}`,
                //
                value: input.value,
            });

            // post = { id: post.id + 1, name: input.name };
            // return post;
        }),

    readOneByKey: protectedProcedure
        .input(
            z.object({
                workspaceID: z.string(),
                // type: z.string(),
                key: z.string(),
                // value: z.any(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            //

            let ok = await canEditSpace({
                adminSpaces: ctx.adminSpaces,
                editorSpaces: ctx.editorSpaces,
                viewerSpaces: ctx.viewerSpaces,
                workspaceID: input.workspaceID,
            });

            // await WorkspaceObjectModel.deleteMany({});

            // let data = await WorkspaceObjectModel.find({
            //     workspaceID: input.workspaceID,
            // });

            return await WorkspaceObjectModel.find({
                //
                workspaceID: `${input.workspaceID}`,
                //
                // type: input.type,
                //
                // key: `${input.key}`,
                //
                // value: input.value,
            }).then((r) => {
                return r.find((r) => `${r.key}` === `${input.key}`);
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
