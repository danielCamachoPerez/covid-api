import React, { useEffect, useState } from 'react';
import Error from '../components/Error'
import axios from 'axios'

/* custom hooks */
import useLocation from '../hooks/useLocation'

const Form = () => {
    const [data, setData] = useState('')
    const [error, setError] = useState(false)
    const [Query, setOrigin] = useLocation(data)
    const [getDataForm, setGetDataForm]=useState([])

    useEffect(()=>{
        const request = async ()=>{
            if(!getDataForm) return
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
            setGetDataForm(result.data)
        }
        request()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getData = e =>{
        setError(false)
        const upper = e.target.value
        //const lowerLetter = upper.toLowerCase().replace(/\b[a-z]/g, (letter)=>{
        //    return letter.toUpperCase()
        //})
        setData(upper)
        //setData(upper.charAt(0).toUpperCase() + upper.slice(1))
    }
    const submit = e=>{
        e.preventDefault()
        if(data===''){
            setError(true)
            return
        }
        setOrigin(data)
        setError(false)
    }
    return ( 
        <div className="container">
            <h5 className="title is-5 has-text-centered">Find contagion information in your state</h5>
            <form onSubmit={submit}>
                <div className="field">
                    <div>
                        <label htmlFor="estado">State</label>
                    </div>
                    <div className="select is-primary mt-2">
                        <select onChange={getData} name="state" id="estado">
                            <option value="">-- selecciona tu estado --</option>
                            {getDataForm.map(data=>(
                                <option key={data.ID} value={data.Province}>{data.Province}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <input className="button is-primary" type="submit" value="Search"/>
                    </div>
                </div>
            </form>
            {error ? <Error/> : <Query/>}
        </div>
     );
}
 
export default Form;