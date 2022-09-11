import React from 'react'
import Image from 'next/image'

const Skilling = (props: any) => {

    const formatter = Intl.NumberFormat('en', { notation: 'compact'})

    const trimmer = (scout: string) => {
        return scout.charAt(0).toUpperCase() + scout.slice(1);
    }

  return (
            <table className='sm:w-full md:w-1/2 lg:w-3/4 w-full table table-compact'>
                <thead>
                <tr>
                    <th>
                    </th>
                    <th>Skill</th>
                    <th>Experience</th>
                    <th>Rank</th>
                    <th></th>
                </tr>
                </thead>
                <tbody className=''>
                    {props.props.map((s: any) => {
                        const str = formatter.format(parseInt(s.skill.experience))
                        const rstr = s.skill.rank.toLocaleString("en-US")
                        return(
                        <tr className='bg-base-100' key={s.skill.name}>
                            <th>
                                <Image width={20} height={20} src={`https://wiseoldman.net/img/runescape/icons_small/${s.skill.name}.png`} alt="Skill Icon"/>
                            </th>
                            <td className=''>
                                <div>{trimmer(s.skill.name)}</div>
                            </td>
                            <td>
                                <div className='flex-col flex px-2'>
                                    {str}
                                    {((s.skill.experience / 13034431) * 100) >= 100 ?
                                    (<progress className="progress progress-success" value="100" max="100">99</progress>)
                                    :
                                    (<progress className="progress progress-primary" value={s.skill.experience / 13034431 * 100} max="100"></progress>)
                                    }
                                </div>
                            </td>
                            <td>
                                <div>{rstr}</div>
                            </td>
                        </tr>
                        )
                    })}
                    
                    
                </tbody>
            </table>
  )
}

export default Skilling;