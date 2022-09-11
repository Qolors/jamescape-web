import type { NextPage } from "next";

const Home: NextPage = () => {

  

  return (
    <div className="bg-base-200">
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <img src="./jamescape.png" className="max-w-full object-contain rounded-lg drop-shadow-2xl" />
        <div>
          <h1 className="text-6xl font-bold"><span className="text-primary">Jame</span>Scape</h1>
          <p className="pt-1 pb-6 text-center font-medium opacity-60">A Solo Player Blog</p>
          <div className=" place-items-center gap-6 justify-center flex">
            <button className="btn btn-primary px-6">Posts</button>
            <button className="btn btn-primary px-6">Stats</button>
          </div>
        </div>
      </div>
    </div>
    <div className="flex flex-col place-items-center w-full">
    <h2 className="font-bold text-primary pt-6 pb-6 text-5xl text-center justify-center flex bg-base-200">Updates</h2>
    <div className="flex pb-24 container bg-base-200 flex-col w-full lg:w-3/4 mx-auto border-opacity-50">
      <NewsPost
        title="Account Swapping"
        body="I have small pp I am swapping acc for ironman event"
        date="05 Sep"
      />
      <div className="divider"></div>
      <NewsPost
        title="Account Swapping"
        body="I will be making an account swap for the new Iron Man Event"
        date="05 Sep"
      />
      <div className="divider"></div>
      <NewsPost
        title="Account Swapping"
        body="I will be making an account swap for the new Iron Man Event"
        date="05 Sep"
      />
    </div>
    </div>
    </div>
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
    <div className="grid p-2 bg-base-200">
        <h2 className="text-2xl font-bold flex gap-4 place-items-center">
          <span className="badge bg-primary badge-lg">{date}</span>
          {title}
        </h2>
        <p className="break-word px-2 indent-2 pt-2">
          {body}
        </p>
    </div>
  )
}