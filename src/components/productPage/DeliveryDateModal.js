
import React, {useState } from 'react';
  import DatePicker from "react-datepicker";
  import "./deliverydate.scss";

  
  
  const DeliveryDateModal = (props) => {
    const [modal, setModal] = useState(props.isOpen);

    const toggle = () => {
      setModal(!modal);
    };
  
    return (
      <>
      <div className='date-modal'>
      <span class="fa fa-times"  size="1x" onClick={()=>{props.onClose()}} />
                <DatePicker
                    selected={props.selected}
                    includeDates={props.includeDates}
                    onChange={(date) => {
                        props.onChange(date);
                    }}
                    inline
                />
           </div>
        
      </>
    );
  };
  
  export default (DeliveryDateModal);
  