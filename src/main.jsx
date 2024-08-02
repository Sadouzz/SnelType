import React from 'react'
import ReactDOM from 'react-dom/client'
import Menu from './Menu.jsx'
import TypingGame from './TypingGame.jsx'
import './index.css'
import { inject } from '@vercel/analytics';

inject();


ReactDOM.createRoot(document.getElementById('root')).render(
    <Menu />
)

