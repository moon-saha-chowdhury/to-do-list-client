import React from 'react';
import { useForm } from "react-hook-form";

const AddWork = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data,e)=>{
      const reviewData ={
          description:data.description,
          status:"Pending",
          disable:false
      }
      console.log(reviewData);

      const url ='https://fathomless-refuge-89561.herokuapp.com/addActivity';
      fetch(url,{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify(reviewData)
      })
      .then(res=>res.json())
      .then(data =>{
          if(data){
              alert("Your activity added successfully")
          }
      })
      e.target.reset();
  };
    return (
      <section>
        <div className=' ps-5' style={{backgroundColor:"#F4FDFB"}}>
        <h5 className="text-success">Add New Activity</h5>
        <form onSubmit={handleSubmit(onSubmit)}>  
        <div className="form-group">
        <label className="text-white pb-2" htmlFor="exampleInputName1">Your Activity</label>  
        <input type="text" className="form-control" name="description" placeholder="Your Activity" {...register("description")} />
        </div>
        <button type="submit" className="btn btn-success text-white m-3">Submit</button>
    </form>
            
        </div>
      </section>
    );
};

export default AddWork;