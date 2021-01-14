import React from 'react';
import { Link } from "gatsby"

const DefaultAddress = ({defaultAddress, addressesSize}) => {
    return (
        <div className="grid__item myaccount__account-details">
            <h2 className="">ACCOUNT DETAILS</h2>
            {
                defaultAddress != null && (
                    <div className="has-text-left">
                        <p className="has-text-grey">{defaultAddress.firstName} {defaultAddress.lastName}</p>
                        <p className="has-text-grey">{defaultAddress.address1}</p>
                        <p className="has-text-grey">{defaultAddress.zip}, {defaultAddress.city}</p>
                        <p className="has-text-grey">{defaultAddress.country}</p>
                    </div>
                )
            }
            <Link to="account/addresses">
                <button
                    className="btn btn--small"
                >
                    View Addresses ({addressesSize})
                </button>
            </Link>
        </div>
    );
};

export default DefaultAddress;