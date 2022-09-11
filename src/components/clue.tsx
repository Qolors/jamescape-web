import React from 'react'

const Clue = (props: any) => {

    const formatter = Intl.NumberFormat('en', { notation: 'compact'})

    const trimmer = (scout: string) => {
        if (scout.includes('clue_scrolls_')){
            const sara = scout.replace('clue_scrolls_', '');
            return sara.charAt(0).toUpperCase() + sara.slice(1);
        }
    }

  return (
            <table className="sm:w-full md:w-1/2 lg:w-3/4 w-full table table-compact">
                <thead>
                <tr>
                    <th>
                    </th>
                    <th>Score</th>
                    <th>scores</th>
                    <th>Rank</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                    {props.props.map((s: any) => {
                        const str = formatter.format(parseInt(s.clue.score))
                        const rstr = s.clue.rank.toLocaleString("en-US")
                        if (s.clue.score > 0){
                        return(
                        <tr className="bg-base-100" key={s.clue.name}>
                            <th>
                                <img className='min-w-[24px]' src={`https://wiseoldman.net/img/runescape/icons_small/${s.clue.name}.png`} />
                            </th>
                            <td>
                                <div>{trimmer(s.clue.name)}</div>
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

export default Clue;