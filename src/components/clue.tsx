import React from 'react'

const Clue = (props: any) => {

    

  return (
            <div className='w-full flex flex-col gap-2 place-items-center'>
                {props.props.map((p: any) => {
                    return (
                        <div key={p.date} className="stats shadow">
  
                        <div className="stat">
                            <div className="stat-title">{p.date}</div>
                            <div className="text-sm">{p.description}</div>
                        </div>
                        
                        </div>
                    )
                })}

            </div>
  )
}

export default Clue;