import './App.css';
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_USERS, GET_ONE_USERS} from "./query/user";
import {CREATE_USER} from "./mutation/user";

function App() {
    const {data, loading, error, refetch} = useQuery(GET_ALL_USERS)
    const {data: oneUser} = useQuery(GET_ONE_USERS, {
        variables:{
            id: 1
        }
    })
    const [newUser] = useMutation(CREATE_USER)
    const [users, setUsers] = useState([])
    const [username, setUsername] = useState("")
    const [age, setAge] = useState(0)

    useEffect(() => {
        if (!loading) {
            setUsers(data.getAllUsers)
        }
    }, [data])

    console.log(oneUser);

    const addUser = (e) => {
        e.preventDefault()
        newUser({
            variables: {
                input: {
                    username, age
                }
            }
        }).then(({data}) => {
            setUsername('')
            setAge(0)
            refetch()
        })
    }

    if (loading) {
        return <h1>...Loading</h1>
    }

    return (
        <div className="App">
            <form style={{display: "flex", justifyContent: "center"}} >
                <input value={username} onChange={(e) => setUsername(e.target.value)} type="text"/>
                <input style={{marginLeft: '5px'}} value={age} onChange={(e) => setAge(+e.target.value)} type="number"/>
                <div style={{marginLeft: '10px'}} >
                    <button onClick={(e) => addUser(e)}>Add</button>
                </div>
            </form>
            <div>
                {users.map(user => {
                    return <div style={{
                        height: 25,
                        marginTop: "10px",
                        border: "1px solid black",
                        display: "flex",
                        justifyContent: "space-around"
                    }} key={user.id}>
                        <span>{user.id}</span>
                        <span>{user.username}</span>
                        <span>{user.age}</span>
                    </div>
                })}
            </div>
        </div>
    );
}

export default App;
