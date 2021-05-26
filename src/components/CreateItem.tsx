import React from 'react'


const CreateItem = ({item,onChangeForm, createItem ,type,getAllItems}) => {


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Create {type} Item </h2>
                <form id="createItemForm">
                    <div className="row">
                        { type=='users' && (
                         <>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputName">Name</label>
                            <input type="text" onChange={(e) => onChangeForm(e)}  className="form-control" name="name" id="name" aria-describedby="Name" placeholder="Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputCategory">Email</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="email" id="email" placeholder="Email" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputIsbn">Password</label>
                            <input type="password" onChange={(e) => onChangeForm(e)} className="form-control" name="pass" id="pass" placeholder="Password" />
                        </div>
                        </>
                        )}
                        { type=='books' && (
                         <>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputName">Name</label>
                            <input type="text" onChange={(e) => onChangeForm(e)}  className="form-control" name="name" id="name" aria-describedby="Name" placeholder="Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputCategory">Category</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="category" id="category" placeholder="Category" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputIsbn">ISBN</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="isbn" id="isbn" placeholder="ISBN" />
                        </div>
                        </>
                        )}
                        { type=='bookCategories' && (
                         <>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputName">Name</label>
                            <input type="text" onChange={(e) => onChangeForm(e)}  className="form-control" name="name" id="name" aria-describedby="Name" placeholder="Name" />
                        </div>
               
                        </>
                        )}
                    </div>
                    {/*<div className="row">
                        <div className="form-group col-md-12">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                    </div>*/}
                    <button type="button" 
                            onClick= {(e) => 
                                        {   createItem(item,type);
                                            setTimeout(() => {
                                              getAllItems()
                                            }, 1500);
                                        } } 
                            className="btn btn-danger">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default CreateItem