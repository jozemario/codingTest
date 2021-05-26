import React from 'react'


const CreateItem = ({item,onChangeForm, createItem ,type}) => {


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Create {type} Item </h2>
                <form>
                    <div className="row">
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
                    </div>
                    {/*<div className="row">
                        <div className="form-group col-md-12">
                            <label htmlFor="exampleInputEmail1">Email</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                    </div>*/}
                    <button type="button" onClick= {(e) => createItem()} className="btn btn-danger">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default CreateItem