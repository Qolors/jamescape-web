import type { GetServerSideProps, NextPage } from "next";
import { prisma } from "../server/db/client";

const Posts: NextPage = (props: any) => {

  return (
      <div className="w-full bg-base-200 pb-24 pt-24 flex flex-col items-center justify-center min-h-screen">
        
        <p className="text-2xl text-gray-700">Posts:</p>
        <div className="w-full grid grid-cols-1 px-2 gap-6 pt-3 mt-3 text-center md:grid-cols-2 lg:w-2/3">
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

      <div className="mx-auto flex w-full object-cover flex-col justify-center bg-base-100 rounded-2xl shadow-xl shadow-gray-400/20">
        <div className="h-[300px] overflow-hidden">
          <img className="w-full rounded-t-2xl object-center object-cover h-[300px]" src={`${image}`} />
        </div>
        <div className="p-6">
          <small className=" text-green-600 text-xs">{category}</small>
          <h1 className="text-2xl font-medium text-gray-800 pb-2">{name}</h1>
          <p className="text text-gray-500 leading-6 truncate ...">{description}</p>
        </div>
      </div>

  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const unsorted = await prisma.posts.findMany();
  const posts = unsorted.reverse()
  return { props: { posts } }
}