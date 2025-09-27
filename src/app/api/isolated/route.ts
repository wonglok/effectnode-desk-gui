import { NextResponse } from "next/server";
import { runExample } from "./_example/example001-asyncfunc";

// https://ridwandevjourney.vercel.app/posts/setup-isolated-vm-using-class/#highlights
// https://ridwandevjourney.vercel.app/posts/setup-isolated-vm-using-class/#highlights
// https://ridwandevjourney.vercel.app/posts/setup-isolated-vm-using-class/#highlights
// https://ridwandevjourney.vercel.app/posts/setup-isolated-vm-using-class/#highlights

export const GET = async (req) => {
    //
    let result = await runExample();

    //
    return NextResponse.json(result);
};

export const POST = GET;

//
//
//
//
