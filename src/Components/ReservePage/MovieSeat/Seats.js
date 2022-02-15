import React from 'react';
import MvSeat from './chair.png';
import  './ReserveMySeat.css';

const Seats = (props) => {

    return (
      <div style={{textAlign: '-webkit-center'}}>
          <table>
          <tbody>
          {props.values.map(row => {
              
              return (
                <tr>
                    {row.map(seat=>{
                        const urSelection = props.urSelection.includes(seat);
                        const isReserved = props.isReserved.includes(seat);
                        const isBooked = props.isBooked.includes(seat);
                        let seatClass;
                        if(isBooked) {
                            seatClass = 'isBooked';
                        }
                        if(isReserved) {
                            seatClass = 'isReserved';
                        }
                        if(urSelection) {
                            seatClass = 'urSelection';
                        }
                        return(<td  className={seatClass} onClick={props.addSeat} key={seat}>        
                            <span className='lable'>{seat}</span>
                            <img src={MvSeat} alt="seat" className='seat'/>
                        </td>)
                    })}
                </tr>
          )})}</tbody>
          </table>
      </div>
    );
}
export default Seats;