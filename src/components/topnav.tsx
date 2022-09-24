

import { RedirectToSignIn, RedirectToUserProfile, SignedIn, SignedOut, UserProfile, useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import Link from "next/link"


const TopNav = () => {

    const [sign, setSign] = useState(false)
    const [profile, setProfile] = useState(false)
    const [username, Setusername] = useState('')

    const { user } = useUser();

    useEffect(() => {

        if (user) {
            
            let x = ''
            
            if (user.username? x = user.username : '') Setusername(x)
            if (user.firstName? x = user.firstName : '') Setusername(x)
            if (user.lastName? x = user.lastName : '') Setusername(x)
            if (user.fullName? x = user.fullName : '') Setusername(x)
            
        }

    }, [user])
        
    

    return (
        <div className="navbar bg-neutral text-base-200">
        <div className="flex-1 px-4">
            <Link href="/" className="btn btn-ghost normal-case text-xl">JS</Link>
        </div>
        <div className="flex-none">
            <ul className="menu menu-horizontal p-0">
                <SignedIn>
                    <li><a className="p-2 bg-neutral font-bold text-sm" onClick={() => {setProfile(true)}}>{username}.</a></li>
                </SignedIn>
                

            </ul>
        </div>
        {sign &&  <RedirectToSignIn />}
        {profile && <RedirectToUserProfile />}
        <SignedOut>
                    <li><button className="btn btn-square" onClick={() => setSign(true)}>Sign In</button></li>
                </SignedOut>
        </div>
    )
}

export default TopNav