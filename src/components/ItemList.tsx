import React from 'react'
import { deleteItem } from '../services/ItemsService'
//import { useSession } from 'next-auth/client'


export const ItemList = ({items,type,numberOfItems,getAllItems}) => {

    //const [ session, loading ] = useSession()

    console.log('items :::', items,type)
    console.log('items length:::', items.length)
    if (items.length === 0) return null

    const ItemRow = (item,index) => {

        return(
              <tr key = {index} className={index%2 === 0?'odd':'even'}>
                  {/*<td>{index + 1}</td>*/}
                  {Object.keys(item).map(key => (
                    <td>{item[key]}</td>
                    ))}
                 {/* <td>{item.name}</td>
                  <td>{item.category}</td>*/}
                  <td>
                    
                      <button 
                      type="button" 
                      onClick= { (e) => {
                        deleteItem(item.id,type)
                        setTimeout(() => {
                          getAllItems()
                        }, 1500);
                        
                          } 
                        } 
                    className="btn btn-danger">Delete</button>
                    </td>
                  
              </tr>
          )
    }

    const itemTable = items.map((item,index) => ItemRow(item,index))

    return(
        <div className="container">
            <h2>Items: {numberOfItems}</h2>
            <div className="table-responsive">
            <table className="table table-sm table-bordered">
                <thead>
                <tr>
                    {/*<th>Id</th>*/}
                    {Object.keys(items[0]).map(key => (
                    <th>{key}</th>
                    ))}
                    {/*<th>Name</th>
                    <th>Category</th>*/}
                    <th>Actions</th>
                    
                </tr>
                </thead>
                <tbody>
                    {itemTable}
                </tbody>
            </table>
            </div>
        </div>
    )
}