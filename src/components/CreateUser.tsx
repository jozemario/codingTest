import React from 'react'


const CreateUser = ({onChangeForm, createUser }) => {


    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Create User</h2>
                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputEmail">Email</label>
                            <input type="text" onChange={(e) => onChangeForm(e)}  className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="exampleInputName">Name</label>
                            <input type="text" onChange={(e) => onChangeForm(e)} className="form-control" name="name" id="name" placeholder="Name" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-12">
                            <label htmlFor="exampleInputPassword">Password</label>
                            <input type="password" onChange={(e) => onChangeForm(e)} className="form-control" name="password" id="password" aria-describedby="emailHelp" placeholder="Password" />
                        </div>
                    </div>
                    <button type="button" onClick= {(e) => createUser()} className="btn btn-danger">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default CreateUser