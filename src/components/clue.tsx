import React from 'react'

const Clue = (props: any) => {

    const formatter = Intl.NumberFormat('en', { notation: 'compact'})

    const trimmer = (scout: string) => {
        if (scout.includes('clue_scrolls_')){
            let sara = scout.replace('clue_scrolls_', '');
            return sara.charAt(0).toUpperCase() + sara.slice(1);
        }
    }

  return (
            <table className="table w-full">
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
                    {props.props.map(s => {
                        let str = formatter.format(parseInt(s.clue.score))
                        let rstr = s.clue.rank.toLocaleString("en-US")
                        if (s.clue.score > 0){
                        return(
                        <tr>
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