'use client'
import { useAuthContext } from '@/context/AuthContext'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useState } from 'react'
const TableComp = dynamic(() => import('@/components/DataTable'), { ssr: false })

const AdminPage = () => {
  const { admin } = useAuthContext()
  const [likesdata, setLikesData] = useState([])
  const [dailyStatsData, setDailyStatsData] = useState([])
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  function startDateHandler(e: any) {
    setStartDate(e.target.value)
  }

  function endDateHandler(e: any) {
    setEndDate(e.target.value)
  }

  async function topGifPerf() {
    const res = await fetch('api/admin/top', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    setLikesData(data)
  }

  async function dailyStatsFetcher() {
    const res = await fetch(`api/admin/daily-stats?startDate=${startDate}&endDate=${endDate}`, {
      method: 'GET',
    })
    const data = await res.json()
    console.log(data)
    setDailyStatsData(data!)
  }

  useEffect(() => {
    topGifPerf()
    dailyStatsFetcher()
  }, [])

  // if (!admin)
  //   return (
  //     <div>
  //       Not authorized
  //       <br />
  //       <Link href={'/admin/login'}>Go to admin login page</Link>
  //     </div>
  //   )

  return (
    <div
      style={{
        width: '100%',
        minHeight: '90vh',
        padding: '10px 30px',
        display: 'flex',
        gap: '20px',
        flexDirection: 'column',
        backgroundColor: '#ebebeb',
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <h2
          style={{
            fontFamily: 'inherit',
            width: '100%',
            backgroundColor: 'white',
            padding: '20px 10px',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0px 4px 100px 0px #cccccc',
            border: '2px solid #cccccc',
          }}
        >
          Admin Dashboard
        </h2>
      </div>

      <DashboardSectionTemplate heading={' TOP GIF BY LIKES 🩷🩷🩷'}>
        <TableComp likesList={likesdata} tableHeadText={['GIF NAME', 'GIF ID', 'LIKES']} />
      </DashboardSectionTemplate>

      <DashboardSectionTemplate heading={' Daily Stats 🔂🔂🔂'}>
        <div
          style={{
            width: '100%',
            height: '50px',
            marginBottom: '20px',
            display: 'flex',
            gap: '30px',
          }}
        >
          <div
            style={{
              backgroundColor: 'black',
              width: 'fit-content',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              height: '50px',
              gap: '10px',
              paddingLeft: '40px',
              borderRadius: '50px',
            }}
          >
            <span style={{ fontWeight: '500', paddingRight: '10px' }}> From: </span>
            <input
              type="date"
              onChange={(e) => startDateHandler(e)}
              style={{
                padding: '6px 30px',
                height: '100%',
                outline: 'none',
                border: '3px solid black',
                borderRadius: '50px',
                cursor: 'pointer',
              }}
            />
          </div>

          <div
            style={{
              backgroundColor: 'black',
              width: 'fit-content',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              height: '50px',
              gap: '10px',
              paddingLeft: '40px',
              borderRadius: '50px',
            }}
          >
            <span style={{ fontWeight: '500', paddingRight: '10px' }}> To: </span>
            <input
              type="date"
              onChange={(e) => endDateHandler(e)}
              style={{
                padding: '6px 30px',
                height: '100%',
                outline: 'none',
                border: '3px solid black',
                borderRadius: '50px',
                cursor: 'pointer',
              }}
            />
          </div>

          <button
            style={{
              height: '100%',
              padding: '0px 50px',
              borderRadius: '50px',
              border: '2px solid grey',
              backgroundColor: 'black',
              color: 'white',
              cursor: 'pointer',
            }}
            onClick={dailyStatsFetcher}
          >
            Filter
          </button>
        </div>
        <TableComp
          dailyStatsData={dailyStatsData}
          tableHeadText={['DATE', 'LIKES', 'REGISTRATION', 'SEARCH']}
        />
      </DashboardSectionTemplate>

      <DashboardSectionTemplate heading={' MOST ACTIVE USERS 👦🏻👩🏻'}>
        <TableComp likesList={likesdata} tableHeadText={['USER NAME', 'SEARCH', 'LIKED']} />
      </DashboardSectionTemplate>
    </div>
  )
}

export default AdminPage

const DashboardSectionTemplate = ({ children, heading }: any) => {
  return (
    <div
      style={{
        width: '100%',
        padding: '50px',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0px 4px 100px 0px #cccccc',
        border: '2px solid #cccccc',
      }}
    >
      <div
        style={{
          width: '100%',
          height: 'fit-content',
        }}
      >
        <h4
          style={{
            marginBottom: '30px',
            backgroundColor: '#d9fae2',
            border: '2px solid',
            borderColor: 'green',
            padding: '20px',
            borderRadius: '0px 20px 0px 20px',
          }}
        >
          {heading}
        </h4>

        {children}
      </div>
    </div>
  )
}
