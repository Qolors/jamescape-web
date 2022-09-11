import React from 'react'

const Bossing = (props: any) => {

    const formatter = Intl.NumberFormat('en', { notation: 'compact'})

    const trimmer = (x) => {
        if (x.includes('_')){
            let chop = x.replace('_', '');
            return chop.charAt(0).toUpperCase() + chop.slice(1);
        }
        return x.charAt(0).toUpperCase() + x.slice(1);
    }

  return (
            <table className="table w-full">
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
                    {props.props.map(s => {
                        let str = formatter.format(parseInt(s.boss.kills))
                        let rstr = s.boss.rank.toLocaleString("en-US")
                        if (s.boss.kills > 0){
                        return(
                        <tr>
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