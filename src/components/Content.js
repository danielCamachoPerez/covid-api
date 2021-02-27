import React from 'react';

const Content = ({filterName, confirmed, deaths, date}) => {
    return ( 
        <div className="content is-center">
            <table>
                <tbody>
                    <tr>
                        <th>Estado</th>
                        <th>Contagios</th>
                        <th>Defunciones</th>
                    </tr>
                    <tr>
                    <td>{filterName}</td>
                        <td>{confirmed}</td>
                        <td>{deaths}</td>
                    </tr>
                </tbody>
            </table>
            
            <div className="content is-center">
                <h5 className="has-text-centered">last update:  {date}</h5>
            </div>
        </div>
     );
}
 
export default Content;