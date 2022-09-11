import { prisma } from "../../server/db/client";

const Post = (props: any) => {
    return (

        <section className="bg-base-200 min-h-screen flex place-items-center">
            <div className="container px-6 py-10 mx-auto">
                <div className="lg:-mx-6 lg:flex lg:items-center">
                    <img className="object-cover object-center lg:w-1/2 lg:mx-6 w-full h-96 rounded-lg lg:h-[36rem]" src={props.post.image !== '' ? `${props.post.image}` : '../jamescape.png'} alt="" />

                    <div className="mt-8 lg:w-1/2 lg:px-6 lg:mt-0">
                        <p className="text-5xl font-semibold text-primary ">“</p>

                        <h1 className="text-2xl font-semibold text-primary xl:text-4xl lg:w-96">
                            {props.post.title}
                        </h1>

                        <p className="max-w-lg mt-6 text-gray-800 dark:text-gray-400 ">
                            {props.post.body}
                        </p>

                        <h3 className="mt-6 text-lg font-medium text-primary">{props.post.category}</h3>
                        <p className="text-secondary dark:text-gray-300">legault432</p>
                    </div>
                </div>
            </div>
        </section>
    
    )
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
    return { props: { post } }
  }


  