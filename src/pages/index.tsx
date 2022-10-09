import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { motion } from 'framer-motion'
import { GetStaticProps } from "next";
import { runemetrics } from "runescape-api";
import { useEffect, useState } from "react";

const Home: NextPage = (props: any) => {

  const [status, setStatus] = useState('');
  const [action, setAction] = useState('');

  useEffect(() => {

    const x = props.player.activities[0];
    const y = x.description;

    if (y === status) { setAction('chillin') } else {

    if (y.includes('levelled')){ setAction('skilling')} else {setAction('questing')}

    }

    setStatus(y);

  }, [props])

  return (
    <motion.div>
    <div className="w-full overflow-hidden bg-base-200">
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col">
        <div className="w-full flex flex-col gap-2 place-items-center justify-center min-h-screen">
        <h1 className="text-5xl font-bold text-center"><span className="text-secondary">Jame</span>Scape</h1>
          <p className="pt-1 text-center font-medium opacity-60">A Solo Player Blog</p>
          <div className="grid place-items-center font-bold">Currently {action}..</div>
          <img src={`./${action}.gif`} className="w-full max-h-[300px] object-contain rounded-lg drop-shadow-xl" />
          <p>Recently {status}</p>
          <div className="flex">
          
          <div className=" place-items-center gap-6 justify-center flex">
            <Link href='/posts'>
              <motion.div  whileTap={{ scale: 0.8 }}>
              <button className="btn btn-secondary rounded-lg px-6">Posts</button>
              </motion.div>
            </Link>
            <Link href='/stats'>
              <motion.div  whileTap={{ scale: 0.8 }}>
              <button className="btn btn-secondary rounded-lg px-6">Stats</button>
              </motion.div>
            </Link>
          </div>
        </div>
        </div>
        
        
      </div>
    </div>
    <div className="flex flex-col place-items-center w-full">
    <h2 className="font-bold text-stone-800 pt-6 pb-6 text-5xl text-center justify-center flex bg-base-200">Updates</h2>
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
          <span className="badge bg-secondary badge-lg">{date}</span>
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


export const getStaticProps: GetStaticProps = async () => {

  const player: any = await runemetrics.getProfile("an okay time").then(data => {
    return JSON.parse(JSON.stringify(data))
  })

  return { props: {player}, revalidate: 600 }
}