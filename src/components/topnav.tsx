
import { useSession, signIn } from "next-auth/react";
import Link from "next/link"


const TopNav = () => {

    const { data: session } = useSession();

    if (session) {
        
    const { user } = session;

    return (
        <div className="navbar bg-stone-800 text-secondary">
        <div className="flex-1 px-4">
            <Link href="/" className="btn btn-ghost normal-case text-xl">JS</Link>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal p-0">
                {user?.image && (
                    <li><a className="p-2 bg-stone-800 font-bold text-sm">Hey {user?.name} <img className="w-[30px]" src={user.image} /></a></li>
                )}
                    

                

            </ul>
        </div>
        </div>
    )
    } else {
        return (

            <div className="navbar bg-neutral text-base-200">
            <div className="flex-1 px-4">
                <Link href="/" className="btn btn-ghost normal-case text-white text-xl">JS</Link>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                        <li><button className="btn" onClick={() => signIn('discord')}>Sign In</button></li>
                </ul>
            </div>
            </div>

        )
    }
}

export default TopNav