export const POST = async (req) => {
    let body = await req.json();
    return new Response(
        JSON.stringify({
            //
            vercelFunc: "from rest api from vercel",
            ...(body || {}),
        }),
    );
};

export const GET = POST;
