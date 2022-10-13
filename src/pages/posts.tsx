import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { prisma } from "../server/db/client";
import { motion } from 'framer-motion'
import { Icon } from "@iconify/react";


const Posts: NextPage = (props: any) => {

  return (
      <div className="w-full bg-base-200 pb-24 flex flex-col items-center justify-center min-h-screen">
        <div className="flex overflow-hidden w-full place-items-end justify-center">
        <h1 className="text-xl pt-5">POSTS</h1>

        </div>
        <div className="w-[90%] grid grid-cols-1 gap-6 text-center md:grid-cols-2 lg:w-2/3">
          {props.posts.map((p: any) => {

          let c = 0;
          props.comments.map((comment:any) => { if (comment.postid === p.id) return c = c + 1});

          console.log(c)

          return ( 
          <>
          <a key={p.id} href={`/posts/${p.id}`} className="relative">
            <TechnologyCard
              name={p.title}
              description={p.body}
              category={p.category}
              image={p.image ? p.image : './jamescape.png'}
            />
            <div className="absolute top-8 right-0 py-2 px-4 bg-secondary rounded-xl flex gap-2 place-items-center"><Icon icon="bx:message-alt-detail" />{c}</div>
          </a>
          
          </>
          )
          }
          )}
        </div>
      </div>
  );
};

export default Posts;

type TechnologyCardProps = {
  name: string;
  description: string;
  category: string;
  image: string;
};

const TechnologyCard = ({
  name,
  description,
  category,
  image
}: TechnologyCardProps) => {
  return (
    <>
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 2000, damping: 50 }} >
      <div className="mx-auto flex w-full object-cover flex-col justify-center bg-base-100">
        <div className="h-[300px] overflow-hidden">
          <img className="w-full object-center object-cover min-h-[300px]" src={`${image}`} />
        </div>
        <div className="p-4 py-6 bg-base-200">
          <p className=" text-green-200 font-bold text-left text-xs bg-stone-800 p-2 px-4 w-fit rounded-xl">{category}</p>
          <h1 className="text-2xl text-left font-medium py-2">{name}</h1>
          <p className="text-sm text-left truncate ...">{description}</p>
        </div>
      </div>
    </motion.div>
    <div className="divider"></div>
    
    </>

  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const unsorted = await prisma.posts.findMany();
  const bigposts = unsorted.reverse()
  const comments = await prisma.comment.findMany();

  const posts = bigposts.slice(0, 40);

  return { props: { posts, comments } }
}