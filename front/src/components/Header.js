import React from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { ROUTE } from '../utills/route'



export default function Header({ title }) {

    return (

        <div className="Header">{title}</div>

    );

}