import React, { useState, useEffect } from "react";
import './css/FrontPage.css';
import Guest from './Guest';

export default function FrontPage() {

    return (
        <div className="frontPage">
            <div className="sloganTitle">
               <h1>Catalog your video game collection</h1>
                <h5>Everything from yesterday to today.</h5>
            </div>
        </div>
    )
}