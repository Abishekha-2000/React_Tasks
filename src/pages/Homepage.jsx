import React, { useEffect, useState } from 'react'
import './homepage.css'
import axios from 'axios'


export default function Homepage() {

 
    const [state, setstate] = useState([])
     console.log("state",state);
   const[categories, setcategories]=useState([])
   const [count, setCount] = useState(0);
   const [countpass, setcountpass] = useState([])
   const [olddishid, setolddishid] = useState({})
   console.log("count",count);

   useEffect(()=>{
    axios.get(`https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099`).then((fooddata)=>{
        console.log("fooddata===",fooddata.data[0]);
        setstate(fooddata.data[0])
        setcategories(fooddata.data[0].table_menu_list[0].category_dishes)
       
    })
},[])
  

   const category = (categoryName) => {
    if(state){
        const filteredList = state.table_menu_list.filter((item) => {
          return item.menu_category === categoryName;
        });
        console.log("filter",filteredList);
        setcategories(filteredList[0].category_dishes);
 }
  };
  console.log("categories=====",categories);
 

  const incrementCount = (dish_id) => {
    setCount(count + 1);
    setcountpass({...count,counts:count, dish_id:dish_id})
    setolddishid(countpass.dish_id)
    if(olddishid!== dish_id){
      setCount(0);
      console.log("olddishid===",olddishid,dish_id);
    }
  
   
    
  }


  const decrementcount = (dish_id) => {
    setCount(count - 1);
    setcountpass({...count,counts:count, dish_id:dish_id})
    setolddishid(countpass.dish_id)
    if(olddishid!== dish_id){
      setCount(0);
      console.log("olddishid===",olddishid,dish_id);
    }
  
   
    
  }
  

 




  return (
<>




<div class="container-fluid">
    <nav class="navbar bg-light">
  <div class="container-fluid">
 <a class="navbar-brand" href="#" >UNI Resto Cafe</a>
 <div class="d-flex justify-content-end">
 <div ><a href='/'/>MY Orders</div>

   <div class="cart">
  <span class="count">{count}</span>
 
  <i class="material-icons"><img src="https://cdn1.iconfinder.com/data/icons/free-98-icons/32/cart-512.png" style={{height:"2vw",width:"2rem"}}/> </i>
</div>

   </div>
   
  </div>
</nav>
</div>




 <div class="container-fluid">
    <div class="menu-wrapper">
    <div class="d-flex">
    
  <div class="row flow">
   
      <div className="nav-item" style={{maxWidth:"30rem",maxHeight:"10vw"}}  onClick={() =>{category("Salads and Soup")}}>Salads and Soup</div>
      <div className="nav-item" style={{maxWidth:"30rem",maxHeight:"10vw"}}  onClick={() =>{category ("From The Barnyard")}}>From The Barnyard</div>
      <div  className="nav-item"style={{maxWidth:"30rem",maxHeight:"10vw"}} onClick={() => {category("From the Hen House")}}>From the Hen House</div>
      <div  className="nav-item"style={{maxWidth:"30rem",maxHeight:"10vw"}} onClick={() => {category("Fresh From The Sea")}} >Fresh From The Sea</div>
      <div className="nav-item" style={{maxWidth:"30rem",maxHeight:"10vw"}} onClick={() => {category("Biryani")}}>Biriyani</div>
      <div className="nav-item" style={{maxWidth:"30rem",maxHeight:"10vw"}}  onClick={() =>{category("Fast Food")}}>Fast Food</div>
    </div>
    </div>
    
    </div>
   
</div>  











<div class="row" style={{height:"2vw"}}></div>
<div class="container-fluid">

    {categories.map((salad)=>  

    <div class="row">

{salad.dish_Type === 2 ?

       <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1200px-Veg_symbol.svg.png" style={{height:"2vw",width:"3rem",marginTop:"1rem"}}/>
     
:

<img src="https://www.pngkit.com/png/detail/257-2579552_non-veg-symbol-non-veg-symbol-png.png" style={{height:"2vw",width:"3rem" ,marginTop:"1rem" }}/>

}

        <div class="col fs-4 text fw-bold">{salad.dish_name}
        <div class="fs-6 fw-semibold">SAR {salad.dish_price}</div>
        <div class="fs-5 fw-light">{salad.dish_description}</div>
        {salad.dish_Availability === true? <div>
        <button type="button" class="btn btn-success">

        <div class="row bar" >
       
            <div class="col" onClick={() => incrementCount(salad.dish_id)}>+</div>
            {countpass.dish_id == salad.dish_id ?
            <div class="col">
              {count}
            </div>
            :
            0
            }

            <div class="col"  onClick={() => decrementcount(salad.dish_id)} >-</div>
            </div>
         </button>
         </div>
          : <div>
            <h6 style={{color:"red"}}>Not Available</h6>

         </div>
         } 
         <div class="row" style={{height:"1vw"}}></div>
    </div>
    
        <div class="col">
            <div class="row">
             <div class="col"></div>   
            <div class="col fw-semibold">{salad.dish_calories} calories</div>
            <div class="col"><img src={salad.dish_image} class="img-fluid" alt="..." style={{width:"10rem",height:"10vw"}}/></div>
            </div>
        </div>
       <div class="row" style={{height:"2rem"}}></div>
        <div class="row line"></div>
    </div>
    )}
</div>




</>
  )
}



