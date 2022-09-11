import React from 'react'

const Skilling = (props: any) => {

    const formatter = Intl.NumberFormat('en', { notation: 'compact'})

    const trimmer = (scout: string) => {
        return scout.charAt(0).toUpperCase() + scout.slice(1);
    }

  return (
            <table className="table w-full">
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
                <tbody>
                    {props.props.map(s => {
                        let str = formatter.format(parseInt(s.skill.experience))
                        let rstr = s.skill.rank.toLocaleString("en-US")
                        return(
                        <tr>
                            <th>
                                <img className='min-w-[24px]' src={`https://wiseoldman.net/img/runescape/icons_small/${s.skill.name}.png`} />
                            </th>
                            <td>
                                <div>{trimmer(s.skill.name)}</div>
                            </td>
                            <td>
                                <div className='flex-col flex'>
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