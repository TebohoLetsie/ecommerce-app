import React,{useState,useEffect} from 'react'
import {LinkContainer} from 'react-router-bootstrap'
import { Button, Table} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listUsers,deleteUser } from '../actions/userAction'


const UserListScreen = ({history}) =>{
    
    const dispatch = useDispatch()

    const userList = useSelector(state=>state.userList)
    const {loading, error, users} = userList

    const userLogin = useSelector(state=>state.userLogin)
    const {userInfo} = userLogin

    const userDelete = useSelector(state=>state.userDelete)
    const {success} = userDelete

    const deleteHandler = (id) =>{
        if(window.confirm('Are you sure?')){
            dispatch(deleteUser(id))
        }
       
        
    }

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        }
        else{
            history.push('/login')
        }
    },[dispatch,history,success,userInfo])

    return (
        <>
        {/* striped boardered hover responsive className="table-sm" */}
            <h1>Users</h1>
            {loading ? <Loader />: error ? <Message variant="danger">{error}</Message>:(
                <Table striped boardered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user=>(
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.admin}</td>
                                <td>
                                    {user.isAdmin ? (<li className="fas fa-check" style={{color:'green'}}></li>):(
                                        <li className="fas fa-times" style={{color:'red'}}></li>
                                    )}
                                </td>
                                <td>
                                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <li className="fas fa-edit"></li>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={()=>{
                                        deleteHandler(user._id)
                                    }}>
                                        <li className="fas fa-trash"></li>
                                    </Button>
                                </td>
                            </tr>
                        )

            )}
                    </tbody>
                </Table>
            )}
        </>
    )

}

export default UserListScreen;