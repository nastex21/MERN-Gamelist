import React, { useEffect } from "react";
import '../css/FrontPage.css';
import ImageCredit from "./ImageCredit";

export default function FrontPage() {

  useEffect(() => {
    document.body.style.overflow = "hidden";
  });

  return (
    <div className="frontPage">
    <div className="sloganTitle">
       <h1 className="titleSplash">Catalog your video game collection</h1>
        <h5 className="titleSplash">Everything from yesterday to today.</h5>
    </div>
    <ImageCredit />
</div>
  )
}
