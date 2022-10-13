import React, { useEffect, useState } from 'react'

const Skilling = (props: any) => {

    const [skills, setSkills] = useState<Object>([])
    
    useEffect(() => {
        let x = [];
        for (var object in props.props) {
            x.push(props.props[object])
        }
        x.sort(function(a, b) {return a.id - b.id})

        setSkills(x);
        
    }, [])



    const formatter = Intl.NumberFormat('en', { notation: 'compact'})

  return (
            <div className='w-full flex flex-col place-items-center'>
                <div className='flex flex-col w-full'>
                    {skills.map((s: Object) => {

                        let x: number = s.id
                        
                        const str = formatter.format(parseInt(s.xp))
                        return(
                            <div className='w-full px-6' key={x}>
                            <div className="flex justify-end gap-12 px-2 bg-base-200 rounded-box place-items-center">
                                <div className='flex'>
                                <img className='flex max-w-[45px]' src={`https://runescape.wiki/images/${fer[x]}.png`} />
                                </div>
                                <p className='w-full text-center'>{fer[x]}</p>
                                <div className='flex flex-col'>
                                    <p>{str}</p>
                                    <p className=' text-gray-400'>Xp.</p>
                                </div>
                                <div className='flex flex-col'>
                                    <p>Lvl. {s.level}</p>
                                    <progress className="progress progress-info w-12" value={s.level / 99 * 100} max="100">Level</progress>

                                </div>
                            </div>
                            <div className='divider'></div>
                            </div>
                        )
                    })}
                    
                    
                </div>
            </div>
  )
}

export default Skilling;

interface Fer {
    [index: number]: string
}

export const fer: Fer = {
    0: "Attack",
    1: "Defence",
    2: "Strength",
    3: "Constitution",
    4: "Ranged",
    5: "Prayer",
    6: "Magic",
    7: "Cooking",
    8: "Woodcutting",
    9: "Fletching",
    10: "Fishing",
    11: "Firemaking",
    12: "Crafting",
    13: "Smithing",
    14: "Mining",
    15: "Herblore",
    16: "Agility",
    17: "Thieving",
    18: "Slayer",
    19: "Farming",
    20: "Runecrafting",
    21: "Hunter",
    22: "Construction",
    23: "Summoning",
    24: "Dungeoneering",
    25: "Divination",
    26: "Invention",
    27: "Archaeology"
}