import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>React - пример просте базе података кредитних картица</h1>
            <p>Странице</p> 
            <p>- Насловна</p>         
            <p><Link to="users">- Листа корисника</Link></p>
            <p>- Додавање картица или урађивање података</p>
        </div>
    );
}

export { Home };