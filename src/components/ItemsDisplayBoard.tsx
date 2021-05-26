import React from 'react'
import ExportCSV from './ExportCSV'

export const ItemsDisplayBoard = ({items,numberOfItems, getAllItems, type}) => {
    
    return(
        <div className="display-board">
            <h4>Items {type}</h4>
            <div className="number">
            {numberOfItems}
            </div>
            <div className="btn">
                <button type="button" onClick={(e) => getAllItems()} className="btn btn-warning">Get all Items</button>
                
            </div>
            <div className="btn">
            <ExportCSV csvData={items} fileName={type} />
            </div>
        </div>
    )
}