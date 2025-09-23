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

            return await WorkspaceObjectModel.findOneAndUpdate(
                {
                    //
                    workspaceID: input.workspaceID,
                    //
                    type: input.type,
                    //
                    key: `${input.key}`,
                    //
                },
                {
                    value: input.value,
                },
                {
                    upsert: true,
                    new: true,
                },
            );

            // post = { id: post.id + 1, name: input.name };
            // return post;
        }),

    removeAll: protectedProcedure
        .input(
            z.object({
                workspaceID: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            //

            //
            let ok = await canEditSpace({
                adminSpaces: ctx.adminSpaces,
                editorSpaces: ctx.editorSpaces,
                viewerSpaces: ctx.viewerSpaces,
                workspaceID: input.workspaceID,
            });

            if (!ok) {
                throw new Error("not allow");
            }

            //
            return await WorkspaceObjectModel.deleteMany({
                //
                workspaceID: input.workspaceID,
            });

            // post = { id: post.id + 1, name: input.name };
            // return post;
        }),

    //
    readAll: protectedProcedure
        .input(
            z.object({
                workspaceID: z.string(),
                // type: z.string(),
                // type: z.string(),
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

            if (!ok) {
                throw new Error("not allow");
            }

            return await WorkspaceObjectModel.find({
                //
                //
                workspaceID: `${input.workspaceID}`,
                //
                // type: input.type,
                //
                // key: `${input.key}`,
                //
                // value: input.value,
            }).then((v) => {
                return v?.map((r) => r._doc);
            });
        }),

    readByType: protectedProcedure
        .input(
            z.object({
                workspaceID: z.string(),
                // type: z.string(),
                type: z.string(),
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

            if (!ok) {
                throw new Error("not allow");
            }

            return await WorkspaceObjectModel.find({
                //
                workspaceID: `${input.workspaceID}`,
                //
                type: input.type,
                //
                // key: `${input.key}`,
                //
                // value: input.value,
            }).then((v) => {
                return v?.map((r) => r._doc);
            });
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

            if (!ok) {
                throw new Error("not allow");
            }

            return await WorkspaceObjectModel.findOne({
                //
                workspaceID: `${input.workspaceID}`,
                //
                // type: input.type,
                //
                key: `${input.key}`,
                //
                // value: input.value,
            }).then((v) => {
                return v?._doc;
            });
        }),
    // getLatest: protectedProcedure.query(() => {
    //     return post;
    // }),
    // getSecretMessage: protectedProcedure.query(() => {
    //     return "you can now see this secret message!";
    // }),
});
