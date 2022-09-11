import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { useState } from "react";
import Skilling from "../components/skilling";
import Bossing from "../components/bossing";
import Clue from "../components/clue";

const Stats: NextPage = (props: any) => {
    //View Handler for Button On Toggle
    //skill, boss, clue
    const [seeStat, setSeeStat] = useState('skill');

    return (
        <div className="w-full flex flex-col bg-base-200 place-items-center justify-center min-h-screen">
        <div className="flex py-24 w-full bg-base-200">
            <div className="mx-auto">
                <div className="min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-xl mt-16">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full flex justify-center">
                                <div className="relative">
                                    <img src="./legault432.png" className="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                                </div>
                            </div>
                            <div className="w-full text-center mt-20">
                                <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                    <div className="p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">{props.level}</span>
                                        <span className="text-sm text-slate-400">Combat Level</span>
                                    </div>
                                    <div className="p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-slate-700">{props.account}</span>
                                        <span className="text-sm text-slate-400">Account Type</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <h3 className="text-2xl font-bold leading-normal mb-1 text-primary">{props.username}</h3>
                            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>{props.build} Account
                            </div>
                        </div>
                        <div className="mt-6 py-6 border-t border-slate-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4">
                                    <div className="btn-group grid grid-cols-3">
                                        <button className="btn btn-outline" onClick={() => setSeeStat('skill')}>Skilling</button>
                                        <button className="btn btn-outline" onClick={() => setSeeStat('boss')}>Bossing</button>
                                        <button className="btn btn-outline" onClick={() => setSeeStat('clue')}>Clues</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full pb-28 flex justify-center">
        {seeStat === 'skill' && <Skilling props={props.skills} />}
        {seeStat === 'boss' && <Bossing props={props.bosses} />}
        {seeStat === 'clue' && <Clue props={props.clues} />}
        </div>
        </div>
        
    )
}

export default Stats;


export const getStaticProps: GetStaticProps = async () => {
    //Update on Name Change request
    const url = "https://api.wiseoldman.net/players/username/legault432"
    const result = await fetch(url)
    const mineData = await result.json()
    const skillGroup = [];
    const bossGroup = [];
    const cluesGroup = [];
    const innerObj: any = {};
    //Initial Cleanse
    for (const obj in mineData.latestSnapshot){
        if (mineData.latestSnapshot.hasOwnProperty(obj)){
            innerObj[obj] = mineData.latestSnapshot[obj];
            
        }
    }
    //Splitting of Data
    for (const chunks in innerObj) {
        if(innerObj[chunks]?.experience) {
            skillGroup.push({
                skill: {
                    name: chunks,
                    rank: innerObj[chunks].rank,
                    experience: innerObj[chunks].experience,
                    ehp: innerObj[chunks].ehp,
                }
            })
        }
        if(innerObj[chunks]?.kills) {
            bossGroup.push({
                boss: {
                    name: chunks,
                    rank: innerObj[chunks].rank,
                    kills: innerObj[chunks].kills,
                    ehb: innerObj[chunks].ehb,

                }
            })
        }
        if(innerObj[chunks]?.score) {
            cluesGroup.push({
                clue: {
                    name: chunks,
                    rank: innerObj[chunks].rank,
                    score: innerObj[chunks].score,
                }
            })
        }
    }
    return { props: { 
        account: mineData.type,
        username: mineData.username,
        level: mineData.combatLevel,
        skills: skillGroup,
        bosses: bossGroup,
        clues: cluesGroup,
        build: mineData.build,
    } }
}