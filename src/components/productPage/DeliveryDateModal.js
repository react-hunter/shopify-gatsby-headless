
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
      <div style={{position:'fixed', width: '100%', height:'100%',zIndex:999999, background:'white', left: '0px', top: '0px'}}>
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
  