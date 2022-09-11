import React from 'react'

const Bossing = (props: any) => {

    const formatter = Intl.NumberFormat('en', { notation: 'compact'})

    const trimmer = (x: string) => {
        if (x.includes('_')){
            const chop = x.replace('_', '');
            return chop.charAt(0).toUpperCase() + chop.slice(1);
        }
        return x.charAt(0).toUpperCase() + x.slice(1);
    }

  return (
            <table className="sm:w-full md:w-1/2 lg:w-3/4 w-full table table-compact">
                <thead>
                <tr>
                    <th>
                    </th>
                    <th>Boss</th>
                    <th>Kills</th>
                    <th>Rank</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {props.props.map((s: any) => {
                        const str = formatter.format(parseInt(s.boss.kills))
                        const rstr = s.boss.rank.toLocaleString("en-US")
                        if (s.boss.kills > 0){
                        return(
                        <tr className='bg-base-100'key={s.boss.name}>
                            <th>
                                <img className='min-w-[24px]' src={`https://wiseoldman.net/img/runescape/icons_small/${s.boss.name}.png`} />
                            </th>
                            <td>
                                <div>{trimmer(s.boss.name)}</div>
                            </td>
                            <td>
                                <div className='flex-col flex'>
                                    {str}
                                </div>
                            </td>
                            <td>
                                <div>{rstr}</div>
                            </td>
                        </tr>
                        )}
                    })}
                    
                    
                </tbody>
            </table>
  )
}

export default Bossing;