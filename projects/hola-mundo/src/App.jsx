
import React from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'

export function App() {
    return (
        // <> == <React.Fragment>
        <>
            <TwitterFollowCard userName="maxi.rivas.ok" name="maxi" />
            <TwitterFollowCard userName="maxi.ok" name="exe" />
        </>
    )
}