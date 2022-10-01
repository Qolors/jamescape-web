import type { GetServerSideProps, NextPage } from "next";
import { prisma } from "../server/db/client";
import { motion } from 'framer-motion'
import Image from "next/image";

const Posts: NextPage = (props: any) => {

  return (
      <div className="w-full bg-base-200 pb-24 flex flex-col items-center justify-center min-h-screen">
        <div className="flex overflow-hidden px-2 w-full place-items-end mb-4 justify-center">
        <p className="text-6xl lg:text-8xl -right-2 font-bold text-primary relative -bottom-2 flex">Feed.</p>
        <img className="w-[100px] lg:w-[150px] drop-shadow-2xl relative -bottom-1" src="./post2.png" />

        </div>
        <div className="w-full grid grid-cols-1 gap-12 pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3">
          {props.posts.map((p: any) =>
           
          <a key={p.id} href={`/posts/${p.id}`}>
            <TechnologyCard
              name={p.title}
              description={p.body}
              category={p.category}
              image={p.image ? p.image : './jamescape.png'}
            />
          </a>
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
    <div className="divider"></div>
    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 800, damping: 50 }} >
      <div className="mx-auto flex shadow-lg w-full object-cover flex-col justify-center bg-base-100">
        <div className="h-[300px] overflow-hidden">
          <img className="w-full object-center object-cover min-h-[300px]" src={`${image}`} />
        </div>
        <div className="p-4 py-6 bg-base-200">
          <p className=" text-green-200 font-bold text-left text-xs bg-primary p-2 px-4 w-fit rounded-xl">{category}</p>
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
  const posts = unsorted.reverse()
  return { props: { posts } }
}