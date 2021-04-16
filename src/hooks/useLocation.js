import React, { useEffect, useState } from 'react'
import Content from '../components/Content'
import axios from 'axios'

const useLocation = userLocation => {
    const [origin, setOrigin] = useState(userLocation)
    const [province, setProvince] = useState([])
    useEffect(()=>{
        const request = async ()=>{
            if(!origin) return
            //const url = 'https://api.covid19api.com/live/country/mexico/status/confirmed/date/2021-04-07T00:00:00Z'
            const date = new Date()
            date.setDate(date.getDate() - 1)
            const date_year = date.getFullYear()
            const date_month = new Intl.DateTimeFormat('es', {month:'numeric'}).format(date)
            //const date_month = date.getMonth()
            const date_day = date.getDate()
            //const date_day = new Intl.DateTimeFormat('es', {day:'2-digit'}).format(full_date)
            //const date_month = new Intl.DateTimeFormat('es', {month:'numeric'}).format(full_date)
            //const date_year = new Intl.DateTimeFormat('es', {year:'numeric'}).format(full_date)
            const url = `https://api.covid19api.com/live/country/mexico/status/confirmed/date/${date_year}-${date_month}-${date_day}T00:00:00Z`
            const result = await axios.get(url)
            setProvince(result.data)
        }
        request()
    },[origin])
    const Query = ()=>{
        return (
            <div>
                <div className="content is-center">
                    <h1 className="has-text-centered">Resultado</h1>
                </div>
                {province.filter(response=>(response.Province===origin)).map(filterName=>(
                    <Content
                        key={filterName.ID}
                        filterName={filterName.Province}
                        confirmed={filterName.Confirmed}
                        deaths={filterName.Deaths}
                        date={filterName.Date}
                    />
                ))}
            </div>
        )
    } 
    return [ Query, setOrigin ]
}
 
export default useLocation;