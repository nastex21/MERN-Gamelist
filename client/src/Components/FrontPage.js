import React, { useState, useEffect } from "react";
import { Breadcrumb } from 'react-bootstrap';
import Guest from './Guest';

export default function FrontPage() {

    return (
        <div className="frontPage">
            <p>Login / Signup/ Continue as Guest </p>
            <Breadcrumb>
                <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                <Breadcrumb.Item href="https://getbootstrap.com/docs/4.0/components/breadcrumb/">
                    Library
                </Breadcrumb.Item>
                <Breadcrumb.Item>Data</Breadcrumb.Item>
            </Breadcrumb>
        </div>
    )
}