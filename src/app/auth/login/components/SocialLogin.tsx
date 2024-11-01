"use client";
import { Minus } from "lucide-react";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SocialLogin = () => {
  const route = usePathname();

  return (
    <>
      {/* <div className='flex flex-col items-center '> */}
{/*       <div
        className={`flex justify-between items-center overflow-hidden ${route === `/auth/login` ? "my-4" : "my-4"
          }`}
      >
        <hr
          className={`w-20 sm:w-32 md:36 lg:w-44 xl:w-52 h-px bg-black border-0`}
        />
        <span className="mx-2 text-second-1000 w-28 flex text-xs font-medium ml-5">
          {route === "/auth/login" ? <h3 className="ml-3 md:ml-0">Or Login with</h3> : <h3 className="ml-1 md:ml-0">Or Register with</h3>}
        </span>
        <hr
          className={`w-20 sm:w-32 md:36 lg:w-44 xl:w-52 h-px bg-black border-0`}
        />
      </div>
      <button
        onClick={() => signIn('google', { callbackUrl: "/user/dashboard" })}
        className="border border-[#FF3D00] w-full flex justify-center">
        <div className="flex items-center ">
          <div className="w-6 h-6">
            <Image
              src="/auth/google_logo.png"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </div>
          <p className="text-[#FF3D00] text-xs font-medium ml-2 py-3">
            {route === "/auth/login" ? "Login with Google" : "Google"}
          </p>
        </div>
      </button> */}
      {/* </div> */}
      {route === "/auth/login" ? (
        <div className="text-center flex justify-center mt-4 items-center gap-1">
          <Minus className="" />
          <div className="text-black text-sm flex justify-center items-center">
            Do not have an account?{" "}
            <Link
              href="/auth/registration"
              className="text-end text-[#723EEB] text-sm font-medium cursor-pointer ml-1"
            >
              Register
            </Link>
          </div>
          <Minus className="" />
        </div>
      ) : (
        <div className="text-center flex justify-center mt-4 items-center gap-1">
          <Minus className="" />
          <div className="text-black text-sm flex justify-center items-center">
            Already Have An Account?
            <Link
              href="/auth/login"
              className="text-end text-[#723EEB] text-sm font-medium cursor-pointer ml-1"
            >
              Login
            </Link>
          </div>
          <Minus className="" />
        </div>
      )}
    </>
  );
};

export default SocialLogin;
