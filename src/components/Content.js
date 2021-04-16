import React from "react";

const Content = ({ filterName, confirmed, deaths, date }) => {
  const todayDate = (date)=>{
      const lastUpdate = new Date(date)
      const newDate = new Intl.DateTimeFormat('en', {day: '2-digit'}).format(lastUpdate)
      const newMonth = new Intl.DateTimeFormat('en', {month: 'long'}).format(lastUpdate)
      const newYear = new Intl.DateTimeFormat('en', {year: 'numeric'}).format(lastUpdate)
      //const newDate = lastUpdate.getDate()
      //const newMonth = lastUpdate.getMonth()
      //const newYear = lastUpdate.getFullYear()
      return {newDate, newMonth, newYear}
  }
  const {newDate, newMonth, newYear} = todayDate(date) 
  //todayDate(date)
  //console.log(todayDate(date));
  return (
    <div className="content is-center">
      <table>
        <tbody>
          <tr>
            <th>Province</th>
            <th>Confirmed</th>
            <th>Deaths</th>
          </tr>
          <tr>
            <td>{filterName}</td>
            <td>{confirmed}</td>
            <td>{deaths}</td>
          </tr>
        </tbody>
      </table>

      <div className="content is-center">
        <h5 className="has-text-centered">Last Update: {newMonth} {newDate} {newYear}</h5>
      </div>
    </div>
  );
};

export default Content;
