import React from "react";

export  const Github=()=>{
    const [search,setSearch]=React.useState("")
    const [data,setData]=React.useState([])
    const [total,setTotal]=React.useState(0)
    const [page,setPage]=React.useState(1)
    const [number,setNumber]=React.useState([1,2,3,4])
    // const [loading,setLoading]=React.useState(false)

    async function  GithubData(react)
       
     {
      // setLoading(true)
      let res=await fetch(`https://api.github.com/search/repositories?q=${react}&page=${page}&per_page=100`)
      console.log(res)
      let out=await res.json()
      setData(out.items)
      setTotal(out.total_count)

     
      console.log(out.items)
     }
    

    function Pagination(params) {
      let x=[]
       for(var i=0;i<number.length;i++)

       {
        x.push(number[i]+4)
        
       }
       console.log(x)
      console.log(number)
       setNumber([...x])
       GithubData(search)
       
    }
    function PrevPagination(params) {
       let y=[]
       for(var i=number.length-1;i>=0;i--)
       {
        y.push(number[i]-4)
       }
       console.log(y)
       setNumber([...y])
       GithubData(search)

       
    }


    // console.log(setData)
    React.useEffect(()=>{
      // console.log("data show")
      GithubData("react",page)
    },[])
    
    const handleClick=()=>{
        
        console.log("clicked")
     GithubData(search)
     setSearch("")
      
    }
    React.useEffect(()=>{
     GithubData()
    },[page])


  return(
    // loading? (<div>...loading</div>) : (
      <div  style={{textAlign:"center"}}>
          <input type="text" placeholder="Search Repositiry"  value={search} onChange={(e)=>{setSearch(e.target.value)}}/>
          <button onClick={handleClick}>Click</button>
          <span>Total Count={total}</span>
          <div >
          <button onClick={PrevPagination}>Previous</button>
          
            {
              number.map((items)=>{
                
                  return(
                    <div    onClick={()=>{setPage(items)}} >{items}</div>
                  )
              })

            }
              
          
         
          <button onClick={Pagination}>Next</button>
          </div>

        
          
    {
      data.map((item)=>{
        
        return(
          <div>
          <p>{item.full_name}</p>
        </div>
        )
      
      })
    }

      
  
    </div>
    
  // )
  )
}






