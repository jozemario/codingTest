import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../components/layout'
import AccessDenied from '../components/access-denied'
import { ItemList } from '../components/ItemList'
import { ItemsDisplayBoard } from '../components/ItemsDisplayBoard'
import CreateItem from '../components/CreateItem'
import { createItem } from '../services/ItemsService'


export default function Categories () {
  const [ session, loading ] = useSession()
  const [ content , setContent ] = useState()
  const [items, setItems] = useState([])
  const [numberOfItems, setNumberOfItems] = useState();
  const [item, setItem] = useState({name:'',email:'',pass:'',image:''});

 
  const type = "users"

  const fetchData = async () => {
	  const res = await fetch(`/api/private/${type}`)
	  const json = await res.json()
	  if (json) { 
	      setItems(json); 
	      setNumberOfItems(json.length); 
	      }
	}

  // Fetch content from protected route
  useEffect(()=>{
    /*const fetchData = async () => {
      const res = await fetch(`/api/private/${type}`)
      const json = await res.json()
      if (json) { 
          setItems(json);
          setNumberOfItems(json.length); 
          }
    }*/
    fetchData()
  },[session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display content
  
 
  const handleClick = (event) => {
          //event.preventDefault();
          fetchData();
      };

  const onChangeForm = (e) => {
      let newitem = item
      if (e.target.name === 'name') {
          newitem.name = e.target.value;
      } else if (e.target.name === 'pass') {
          newitem.pass = e.target.value;
      } else if (e.target.name === 'image') {
          newitem.image = e.target.value;
      }else if (e.target.name === 'email') {
          newitem.email = e.target.value;
      }
      setItem(newitem);
  }

  return (
    <Layout>
    
    {/*<ul>
        {items.map(item => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>*/}

      <div className="App">
        
        <div className="container mrgnbtm">
          <div className="row">
            <div className="col-md-8">

              {/*{session.user.email===process.env.ADMIN &&*/}
                <CreateItem 
                  item={item}
                  onChangeForm={onChangeForm}
                  createItem={createItem}
                  type={type}
                  getAllItems={handleClick}

                  />
              {}
  {/*  <BookManager/>*/}
    </div>
    <div className="col-md-4">
        <ItemsDisplayBoard
		items={items}
        numberOfItems={numberOfItems}
        getAllItems={handleClick}
        type={type}

      />
         {/* <div className="display-board">
                  <h4>Items {type}</h4>
                  <div className="number">
                  {numberOfItems}
                  </div>
                  <div className="btn">
                      <button type="button" onClick={handleClick} className="btn btn-warning">Get all Items</button>
                  </div>
              </div>*/}
      </div>
          </div>
        </div>
        <div className="row mrgnbtm">
    <ItemList items={items} 
              type={type} 
              numberOfItems={numberOfItems} 
              getAllItems={handleClick} ></ItemList>
    </div>
      </div>
     </Layout>
   /* <Layout>

      <h1>Books Manager</h1>
      <p><strong>{content || "\u00a0"}</strong></p>
    </Layout>*/
   

  )
}