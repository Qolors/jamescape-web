import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion } from 'framer-motion'
import { GetServerSideProps } from "next";
import { prisma } from "../server/db/client";
import { ResponsiveRadar } from '@nivo/radar'

const Home: NextPage = (props: any) => {

  return (
    <motion.div>
    <div className="w-full overflow-hidden bg-base-200">
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src="./jamescape.png" className="max-w-full object-contain rounded-lg drop-shadow-2xl" />
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-center"><span className="text-primary">Jame</span>Scape</h1>
          <p className="pt-1 pb-6 text-center font-medium opacity-60">A Solo Player Blog</p>
          <div className=" place-items-center gap-6 justify-center flex">
            <Link href='/posts'>
              <motion.div  whileTap={{ scale: 0.8 }}>
              <button className="btn btn-primary px-6">Posts</button>
              </motion.div>
            </Link>
            <Link href='/stats'>
              <motion.div  whileTap={{ scale: 0.8 }}>
              <button className="btn btn-primary px-6">Stats</button>
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col place-items-center w-full">
    <h2 className="font-bold text-primary pt-6 pb-6 text-5xl text-center justify-center flex bg-base-200">Updates</h2>
    <div className="flex pb-24 container bg-base-200 flex-col w-full lg:w-3/4 mx-auto border-opacity-50">
      <NewsPost
        title="RS3 Event"
        body="Starting a new RS3 account for event"
        date="25 Sep"
      />
      <div className="divider"></div>
      <NewsPost
        title="Account Swapping"
        body="I will be making an account swap for the new Iron Man Event"
        date="01 Jun"
      />
      <div className="divider"></div>
      <NewsPost
        title="Account Swapping"
        body="Bossing Grind"
        date="02 Mar"
      />
    </div>
    </div>
    </div>
    </motion.div>
  )
}

export default Home;


type NewsPostProps = {
  title: string;
  body: string;
  date: string;
};

const NewsPost = ({
  title,
  body,
  date
}: NewsPostProps) => {

  return (
    <>
    <Head>
      <title>JameScape</title>
      <meta name="JameScape Solo Player Blog" content="OSRS Blog Post" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className="grid p-2 bg-base-200">
        <h2 className="text-2xl font-bold flex gap-4 place-items-center">
          <span className="badge bg-primary badge-lg">{date}</span>
          {title}
        </h2>
        <p className="break-word px-2 indent-2 pt-2">
          {body}
        </p>
    </div>
    </>
  )
}


export interface TopSkill {
  [key: string]: number
}


export const getServerSideProps: GetServerSideProps = async () => {

  const levels = await prisma.skill.findMany();

      const props: TopSkill = {}

      levels.map(l => {

          const x = l.name;

          const length = (l.exp.length - 1);

          const latest = Number(l.exp[length])
          const last = Number(l.exp[length - 1])

          if (latest > last) {

              const change = latest - last;

              props[x] = change;
          }
      })

      console.log(props);

      return { props }
    }