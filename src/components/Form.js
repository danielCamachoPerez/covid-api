import React, { useState } from 'react';
import Error from '../components/Error'

/* custom hooks */
import useLocation from '../hooks/useLocation'

const Form = () => {
    const [data, setData] = useState('')
    const [error, setError] = useState(false)
    const [Query, setOrigin] = useLocation(data)
    const getData = e =>{
        setError(false)
        const upper = e.target.value
        const lowerLetter = upper.toLowerCase().replace(/\b[a-z]/g, (letter)=>{
            return letter.toUpperCase()
        })
        setData(lowerLetter)
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
            <h5 className="title is-5 has-text-centered">find information on infections in your state</h5>
            <form onSubmit={submit}>
                <div className="field">
                    <label htmlFor="estado">Estado</label>
                    <div className="control">
                        <input 
                            className="input is-hovered is-small" 
                            type="text" 
                            name="state" 
                            id="estado" 
                            placeholder="Estado"
                            onChange={getData}    
                        />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <input className="button is-primary" type="submit" value="Buscar"/>
                    </div>
                </div>
            </form>
            {error ? <Error/> : <Query/>}
        </div>
     );
}
 
export default Form;