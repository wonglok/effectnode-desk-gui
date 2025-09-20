"use client";

import { LogoutButton } from "@/components/buttons/LogoutButton";

export default function Home() {
    return (
        <>
            {/*  */}
            {/*  */}

            <div className="relative h-full w-full">
                {/*  */}

                {/* <LogoutButton></LogoutButton> */}

                <>
                    {/*  */}

                    <div
                        className="absolute top-[45px] right-0 bottom-[45px] left-0 bg-gradient-to-tr from-red-500 to-violet-500"
                        style={{
                            backgroundImage: `url('/bg/room.jpg')`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center",
                        }}
                    ></div>

                    {/*  */}
                </>

                <div className="absolute top-0 left-0 h-[45px] w-full border-b border-gray-300 bg-white">
                    {/*  */}
                    {/*  */}
                </div>

                <div className="absolute bottom-0 left-0 h-[45px] w-full border-t border-gray-300 bg-white">
                    {/*  */}
                    {/*  */}
                </div>
            </div>

            {/*  */}
            {/*  */}
        </>
    );
}
