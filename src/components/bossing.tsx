import React, { useState } from 'react'
import { useEffect } from 'react'
import { Icon } from '@iconify/react'

const Bossing = (props: any) => {

  const [completed, setCompleted] = useState<string[]>([])
  const [prog, setProg] = useState<string[]>([])
  const [eligible, setEligible] = useState<string[]>([])

  useEffect(() => {
    let transcomp : string[] = []
    let transprog : string[] = []
    let transelig : string[] = []

    props.props.map(p => {
      if (p.status === "COMPLETED") {
        transcomp.push(p)
      }
      else if (p.status === "STARTED") {
        transprog.push(p)
      }
      else {
        if (p.eligible) {
          transelig.push(p)
        }
      }
    })

    setCompleted(transcomp)
    setProg(transprog)
    setEligible(transelig)


  }, [])

  return (
    <div className='w-full flex flex-col place-items-center'>
      <div className="w-3/4 stats stats-vertical lg:stats-horizontal shadow">
        <div className='pr-6 w-full flex place-items-center'>
        <div className="stat">
          <div className="stat-title">Completed</div>
          <div className="stat-value">{props.quest.complete}</div>
        </div>
        <Icon className='text-green-600' width="100" icon="line-md:check-list-3-filled" />
        </div>
        
        <div className='pr-6 w-full flex place-items-center'>
        <div className="stat">
          <div className="stat-title">In Progress</div>
          <div className="stat-value">{props.quest.started}</div>
        </div>
        <Icon className=' text-gray-500' width="100" icon="line-md:loading-alt-loop" />
        </div>
        
        <div className='pr-6 w-full flex place-items-center'>
        <div className="stat">
          <div className="stat-title">Not Started</div>
          <div className="stat-value">{props.quest.not_started}</div>
        </div>
        <Icon className=' text-gray-500' width="100" icon="line-md:search-twotone" />
        </div>
      </div>
      <div className='overflow-x-auto pt-12'></div>
        <table className='table w-full'>
          <thead>
            <tr>
              <th className='text-lg'>Quest Name</th>
              <th className='text-lg'>Quest Status</th>
            </tr>
          </thead>
          <tbody className='overflow-hidden'>
      {completed && completed.map(c => {
        return (
          <tr key={c.name} className='text-success'>
            <td>{c.name}</td>
            <td>Completed</td>
          </tr>
        )
      })}
      {prog && prog.map(c => {
        return (
          <tr key={c.name} className=' text-yellow-700'>
            <td>{c.name}</td>
            <td>Working On..</td>
          </tr>
        )
      })}
      {eligible && eligible.map(c => {
        return (
          <tr key={c.name} className='text-gray-600'>
            <td className='max-w-[200px] break-all truncate ...'>{c.name}</td>
            <td className=''>Eligible</td>
          </tr>
        )
      })}
          </tbody>
        </table>
    </div>
  )
}

export default Bossing;