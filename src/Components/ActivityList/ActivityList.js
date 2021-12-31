import React from 'react';
import { useEffect, useState } from 'react';
import "./ActivityList.css";

const ActivityList = ({reRender, setReRender}) => {
    const [activities, setActivities] = useState([]);
    
    useEffect(()=>{
        fetch('https://fathomless-refuge-89561.herokuapp.com/activity')
        .then(res=> res.json())
        .then(data=> setActivities(data))
    },[reRender])

    
	const changeStatus = (event, id) => {
		const status =
		event.target.options[event.target.selectedIndex].text;
		console.log(status, id);
        const url =`https://fathomless-refuge-89561.herokuapp.com/updateStatus/${id}`;
        fetch(url,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({status})
        })
        .then(res=>res.json())
        .then(data =>{
            console.log(data);
            if(data){
                setReRender(!reRender);
            }
        })
	};
     
    const handleChangeTextColor = (id) => {
        const disable = true;
        const url =`https://fathomless-refuge-89561.herokuapp.com/addStatus/${id}`;
        fetch(url,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({disable})
        })
        .then(res=>res.json())
        .then(data =>{
            setReRender(!reRender)
        })

    }

   
    return (
        <section>
        <div className=' d-flex flex-column justify-content-between'>
        <h3 className='text-center text-success mb-3'>Your Next Activities</h3>
        <div className="table-responsive p-2">
          <table className='table table-bordered table-striped'>
          <thead>
              <tr className="heading bg-success text-white">
                <th>Activity Name</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
            </thead>
            {
                activities.map(activity =>
                       
                        <tbody>
                            <tr>
                            <td style={{textDecoration : activity.disable? "line-through" : "none"}}
                             className='text-center fw-bold'>{activity.description}</td>
                                <td>
                                {
                            activity.status==="Pending" &&  <select onChange={(event) =>changeStatus(event, activity._id)} className="form-control input-lg bg-transparent border-0 without-focus text-info fw-bold text-center p-0" aria-label=".form-select-lg example">
                            <option  defaultValue={activity.status}>{activity.status}</option>
                                <option value="Done">Done</option></select> || <p className='text-info fw-bold'>Done</p>    
                        }
                      </td>
                                <td>
                                {
                                        activity.disable?<button disabled onClick={()=>handleChangeTextColor(activity._id)} className="btn btn-danger text-light">Delete</button>:
                                        <button onClick={()=>handleChangeTextColor(activity._id)} className="btn btn-danger text-light">Delete</button>
                                    }
                                </td>
                            </tr>

                        </tbody>
                )
            }
            
          </table>
        </div>
        </div>
        </section>
    );
};

export default ActivityList;