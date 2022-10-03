import React from 'react'


interface Obj {
    name: string,
    rank: string,
    level: string,
    experience: string
}

const Skilling = (props: any) => {

    const skills: any = []
    
    
    Object.keys(props.props).forEach((key: any) => {
        const obj: Obj = {
            name: key,
            rank: props.props[key]['rank'],
            level: props.props[key]['level'],
            experience: props.props[key]['experience']

        }
        skills.push(obj)

    })
    const formatter = Intl.NumberFormat('en', { notation: 'compact'})

    const trimmer = (scout: string) => {
        return scout.charAt(0).toUpperCase() + scout.slice(1);
    }

  return (
            <div className='w-full flex flex-col place-items-center'>
                <div className='flex flex-col w-full'>
                    {skills.map((s: any) => {
                        
                        const str = formatter.format(parseInt(s.experience))
                        return(
                            <div key={s.name}>
                            <div className="flex justify-end gap-12 px-2 bg-base-200 rounded-box place-items-center">
                                <div className='flex'>
                                {s.name != 'overall' ? <img className='flex max-w-[45px]' src={`https://runescape.wiki/images/${trimmer(s.name)}.png`} /> : <></>}
                                </div>
                                <p className='w-full text-center'>{trimmer(s.name)}</p>
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