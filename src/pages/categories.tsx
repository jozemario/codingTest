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
  const [item, setItem] = useState({name:'',category:'',isbn:''});

 
  const type = "bookCategories"


  // Fetch content from protected route
  useEffect(()=>{
    const fetchData = async () => {
      const res = await fetch(`/api/private/${type}`)
      const json = await res.json()
      if (json) { 
          setItems(json);
          setNumberOfItems(json.length); 
          }
    }
    fetchData()
  },[session])

  // When rendering client side don't display anything until loading is complete
  if (typeof window !== 'undefined' && loading) return null

  // If no session exists, display access denied message
  if (!session) { return  <Layout><AccessDenied/></Layout> }

  // If session exists, display content
  
  const fetchData = async () => {
      const res = await fetch(`/api/private/${type}`)
      const json = await res.json()
      if (json) { 
          setItems(json); 
          setNumberOfItems(json.length); 
          }
    }
  const handleClick = (event) => {
          //event.preventDefault();
          fetchData();
      };

  const onChangeForm = (e) => {
      let item = this.state.item
      if (e.target.name === 'name') {
          item.name = e.target.value;
      } /*else if (e.target.category === 'category') {
          item.category = e.target.value;
      } else if (e.target.isbn === 'isbn') {
          item.isbn = e.target.value;
      }*/
      setItem(item);
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
                  //item={item}
                  onChangeForm={onChangeForm}
                  createItem={createItem}
                  type={type}
                  />
              {}
  {/*  <BookManager/>*/}
    </div>
    <div className="col-md-4">
        <ItemsDisplayBoard

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