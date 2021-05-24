import React, { Component } from 'react';

import { ItemList } from './ItemList'
import { ItemsDisplayBoard } from './ItemsDisplayBoard'
import CreateItem from './CreateItem'
import { getAllItems, createItem } from '../services/ItemsService'


class BookManager extends Component {

  state = {
    item: {},
    items: [],
    numberOfItems: 0,
    type: 'books'
  }

  createItem = (e) => {
      createItem(this.state.item,this.state.type)
        .then(response => {
          console.log(response);
          this.setState({numberOfItems: this.state.numberOfItems + 1})
      });
  }

  getAllItems = () => {
    getAllItems(this.state.type)
      .then(items => {
        console.log(items)
        this.setState({items: items, numberOfItems: items.length, type:'books'})
      });
  }

  onChangeForm = (e) => {
      let item = this.state.item
      if (e.target.name === 'firstname') {
          item.firstName = e.target.value;
      } else if (e.target.name === 'lastname') {
          item.lastName = e.target.value;
      } else if (e.target.name === 'email') {
          item.email = e.target.value;
      }
      this.setState({item})
  }

  render() {
      console.log('this.props: ', this.props)
    return (
      <div className="App">
        
        <div className="container mrgnbtm">
          <div className="row">
            <div className="col-md-8">
                <CreateItem 
                  item={this.state.item}
                  onChangeForm={this.onChangeForm}
                  createItem={this.createItem}
                  type={this.state.type}
                  >
                </CreateItem>
            </div>
            <div className="col-md-4">
                <ItemsDisplayBoard

                  numberOfItems={this.state.numberOfItems}
                  getAllItems={this.getAllItems}
                  type={this.state.type}

                >
                </ItemsDisplayBoard>
            </div>
          </div>
        </div>
        <div className="row mrgnbtm">
          <ItemList items={this.state.items} type={this.state.type} numberOfItems={this.state.numberOfItems} getAllItems={this.getAllItems}></ItemList>
        </div>
      </div>
    );
  }
}



export default BookManager;