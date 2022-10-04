import type { NextPage } from "next";
import { GetStaticProps } from "next";
import { useState } from "react";
import Skilling from "../components/skilling";
import Bossing from "../components/bossing";
import Clue from "../components/clue";
import { runemetrics } from "runescape-api";
import { prisma } from "../server/db/client";
import { RuneScape } from "runescape-api/types";

const Stats: NextPage = (props: any) => {
    //View Handler for Button On Toggle
    //skill, boss, clue
    const [seeStat, setSeeStat] = useState('skill');

    const formatter = Intl.NumberFormat('en', { notation: 'compact'})

    return (
        <div className="w-full flex flex-col bg-base-200 place-items-center justify-center min-h-screen">
        <div className="flex bg-cover bg-no-repeatt py-24 w-full bg-base-200" style={{ backgroundImage: `url('./statbg.png')` }}>
            <div className="mx-auto ">
                <div className="min-w-0 break-words bg-white/20 backdrop-blur-md w-full mb-6 shadow-lg rounded-xl mt-16">
                    <div className="px-6">
                        <div className="flex flex-wrap justify-center">
                            <div className="w-full flex justify-center">
                                <div className="relative">
                                    <img src="./legault432.png" className="shadow-xl border-2 border-white rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"/>
                                </div>
                            </div>
                            <div className="w-full text-center mt-20">
                                <div className="flex justify-center lg:pt-4 pt-8 pb-0">
                                    <div className="p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-white">{props.player.combatLevel}</span>
                                        <span className="text-sm text-white">Combat Level</span>
                                    </div>
                                    <div className="p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-white">Main</span>
                                        <span className="text-sm text-white">Account Type</span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-2">
                            <h3 className="text-2xl font-bold leading-normal mb-1 text-white">{props.player.name}</h3>
                            <div className="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                                <i className="fas fa-map-marker-alt mr-2"></i>RS3 Account
                            </div>
                        </div>
                        <p className="text-medium  pt-4 text-center text-white">Exp. Distribution</p>
                        <div className="w-full flex justify-center text-white">
                            
                            <div className="p-3 text-center">
                                <span className="text-sm font-bold block uppercase tracking-wide text-white">{formatter.format(parseInt(props.player.experience_distribution.magic))}</span>
                                <span className="text-sm">Magic</span>
                            </div>
                            <div className="p-3 text-center">
                                <span className="text-sm font-bold block uppercase tracking-wide text-white">{formatter.format(parseInt(props.player.experience_distribution.melee))}</span>
                                <span className="text-sm">Melee</span>
                            </div>
                            <div className="p-3 text-center">
                                <span className="text-sm font-bold block uppercase tracking-wide text-white">{formatter.format(parseInt(props.player.experience_distribution.ranged))}</span>
                                <span className="text-sm">Ranged</span>
                            </div>
                        </div>
                        <div className="mt-6 py-6 border-t border-slate-200 text-center">
                            <div className="flex flex-wrap justify-center">
                                <div className="w-full px-4">
                                    <div className="btn-group grid grid-cols-3">
                                        <button className="btn btn-outline" onClick={() => setSeeStat('skill')}>Skilling</button>
                                        <button className="btn btn-outline" onClick={() => setSeeStat('boss')}>Questing</button>
                                        <button className="btn btn-outline" onClick={() => setSeeStat('clue')}>Progress</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full pb-28 pt-12 flex justify-center">
        {seeStat === 'skill' && <Skilling props={props.player.skills} />}
        {seeStat === 'boss' && <Bossing quest={props.player.quests}  props={props.quest} />}
        {seeStat === 'clue' && <Clue  props={props.player.activities} />}
        </div>
        </div>
        
    )
}

export default Stats;

export const getStaticProps: GetStaticProps = async () => {
    //Update on Name Change request
    
    const player: any = await runemetrics.getProfile("an okay time").then(data => {

        Object.keys(data.skills).forEach(async (s: string) => {
    
            const skills = await prisma?.skill.findUnique({
                where: {
                    name: s,
                }
            });
    
            if (skills) {
                // 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
                skills.exp.push(String(data.skills[s].experience))
                const oldSkill = await prisma?.skill.update({
                    where: {
                        name: s,
                    },
                    data: {
                        exp: skills.exp
                    }
                })
                console.log(oldSkill.exp)
            } else {
                const createSkill = await prisma?.skill.create({
                    data: {
                        name: s,
                        // 👇️ ts-nocheck ignores all ts errors in the file
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

                        exp: [String(data.skills[s].experience)]
                    }
                })
                console.log(createSkill)
            }
        })
        
        return JSON.parse(JSON.stringify(data))
    })
    const quest: any = await runemetrics.getQuests("an okay time").then(data => {
        return JSON.parse(JSON.stringify(data))
    })

    
    



    return { props: { player, quest }, revalidate: 600 }
    
}
