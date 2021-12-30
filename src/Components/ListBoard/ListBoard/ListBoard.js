import React from 'react';
import ActivityList from '../../ActivityList/ActivityList';
import AddWork from '../AddWork/AddWork';
import {  useState } from 'react';


const ListBoard = () => {
    const [reRender, setReRender] = useState(false);

    return (
        <section style={{backgroundColor:"#F4FDFB", overflow:"hidden",height:"150vh"}}>
        <h2 className='text-center text-success mt-3 mb-5'>TO Do List</h2>
        <div className="row">
            <div className="col-md-5">
            <AddWork reRender={reRender} setReRender={setReRender}></AddWork>
            </div>
            <div className='col-md-7 pe-5' >
        <ActivityList reRender={reRender} setReRender={setReRender}></ActivityList>
        </div>
        </div>
    </section>
    );
};

export default ListBoard;