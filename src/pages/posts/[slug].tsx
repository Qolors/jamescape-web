import { prisma } from "../../server/db/client";
import { GetServerSideProps } from "next";
import CommentBox from "../../components/comment";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Toastify from 'toastify-js'
import { motion } from 'framer-motion'

type Comments = {
    content: string,
    author: any,
    post: string,


}

const Post = (props: any) => {

    const { data: session } = useSession();

    const [list, setList] = useState([])

    const [text, setText] = useState('')

    const postHandler = async (commenter: Comments) => {

        const res = await fetch('../api/examples', {
            method: 'POST',
            body: JSON.stringify(commenter)
        })
        console.log(res.json())

    }

    const onChange = (event: any) => {
        setText(event.target.value)
    }

    useEffect(() => {
        setList(props.comments)
    }, [])

    
    if (session) { 
        const { user } = session;
    


    return (

        <motion.section transition={{ duration: 1.0 }} initial={{ y: 30 }} animate={{ y: 0 }} className="bg-base-200 min-h-screen flex place-items-center">
            <div className="container px-6 py-10 mx-auto place-items-center flex flex-col">
                <div className="lg:-mx-6 lg:flex lg:items-center ">
                    <img className="object-contain object-center drop-shadow-lg lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]" src={props.post.image !== '' ? `${props.post.image}` : '../jamescape.png'} alt="" />
                    <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0 pb-24">
                        <div className="flex justify-center place-items-center">
                        <h1 className="text-5xl text-left w-full relative flex font-semibold text-primary xl:text-4xl lg:w-96">
                            {props.post.title}
                        </h1>
                        

                        
                        </div>
                        <h3 className="mt-6 w-fit bg-primary text-green-300 px-4 rounded-md text-lg font-medium">{props.post.category}</h3>
                        <p className="text-secondary dark:text-gray-300">An Okay Time</p>

                        <p className="max-w-lg w-full mt-6 text-gray-800 bg-white p-4 rounded-lg">
                            {props.post.body}
                        </p>
                    </div>
                </div>
                <div className="flex pb-24 flex-col gap-4 place-items-center pt-24 max-w-[500px]">
                    <h1 className="text-xl xl:text-3xl lg:text-2xl">Comments</h1>
                    <form onSubmit={(e) => {
                        if (text == '') return
                        const x = ''
                        const setter: Comments = { content: text, author: user ? user.name : 'RuneScape Lover', post: props.post.id}
                        postHandler(setter)
                        setText('');
                        Toastify({
                            text: "Post Submitted",
                            duration: 3000,
                            newWindow: false,
                            gravity: "bottom", // `top` or `bottom`
                            position: "center", // `left`, `center` or `right`
                            stopOnFocus: true, // Prevents dismissing of toast on hover
                            style: {
                              zIndex: '100',
                            },
                            selector: "comehere",
                            className: "max-w-3/4 p-2 text-white text-center font-bold flex rounded-xl bg-success",
                             // Callback after click
                          }).showToast();
                          
                        }}>
                        <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div id="comehere" className="space-y-6 bg-white px-4 py-5 sm:p-6">

                            
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700">Contribute</label>
                            <div className="mt-1">
                                <textarea id="about" name="about" onChange={onChange} rows={3} className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-success focus:ring-success sm:text-sm" placeholder=""></textarea>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Brief Description of your Runescape Addiction perhaps?</p>
                            </div>
                        <div className="bg-gray-50 px-4 py-3 text-right sm:px-6 text-center">
                            

                    
                            {session ? <button type="submit" className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Post</button> : <button onClick={() => signIn('discord')} className="inline-flex justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Sign In</button>}
                        
                        </div>
                        </div>
                    </form>
                    
                </div>
                <div className="w-full flex flex-col place-items-center gap-4  pb-24">
                {list && list.map((p: any) => {
                        const content: string = p.content
                        const author: string = p.author

                        return (
                            
                            <CommentBox key={p.id} content={content} author={author} />
                            
                            )
                    })}
                </div>
            </div>
        </motion.section>

                )} else {
                    return (
                        <div className="flex justify-center place-items-center h-screen w-screen">
                            
                                <button className="btn-ghost btn-md bg-primary text-white" onClick={() => signIn('discord')}>Sign In</button>

                        </div>
                        
                    )
                }

    
    
}


export default Post;



export const getServerSideProps: GetServerSideProps = async (pageContext: any) => {

    const pageSlug = pageContext.query.slug;

    if(!pageSlug) {
        return {
            notFound: true
        }
    }

    const post = await prisma.posts.findUnique({
        where: {
            id: `${pageSlug}`
        }
    })

    const commenter = await prisma.comment.findMany({
        where: {
            postid: `${pageSlug}`
        }
    })

    const comments = commenter.reverse();

    return { props: { post, comments } }
  }


