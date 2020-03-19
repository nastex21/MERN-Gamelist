import React from "react";
import './css/FrontPage.css';
import ImageCredit from './ImageCredit';

export default function FrontPage() {

    return (
        <div className="frontPage">
            <div className="sloganTitle">
               <h1>Catalog your video game collection</h1>
                <h5>Everything from yesterday to today.</h5>
            </div>
            <ImageCredit />

        </div>
    )
}