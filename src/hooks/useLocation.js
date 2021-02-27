import React, { useEffect, useState } from 'react'
import Content from '../components/Content'
import axios from 'axios'

const useLocation = userLocation => {
    const [origin, setOrigin] = useState(userLocation)
    const [province, setProvince] = useState([])
    useEffect(()=>{
        const request = async ()=>{
            if(!origin) return
            const url = 'https://api.covid19api.com/live/country/mexico/status/confirmed/date/2021-02-26T00:00:00Z'
            const result = await axios.get(url)
            setProvince(result.data)
            //console.log(result.data);
            //result.data.map(response=>console.log(response.Province))
            //result.data.map(response=>setProvince([...province, response.Province]))
            //const province = result.data
            //province.filter(estado=>console.log(estado==='hidalgo'))
            //setProvince(result.data)
            //province.map(res=>console.log(res))
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