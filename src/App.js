import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home/Home";
import {List} from "./pages/Home/products/List";
import {Edit} from "./pages/Home/products/Edit";
import {Search} from "./pages/Home/products/Search";
import {Create} from "./pages/Home/products/Create";
import {useSelector} from "react-redux";
import {Login} from "./pages/user/login";
import {Signup} from "./pages/user/signup";

function App() {

    let user = useSelector(({user})=>{
        return user.currentUser
    })
  return (
      <>
        <Routes>
            <Route path={'/login'} element={<Login/>}></Route>
            <Route path={'/signup'}  element={<Signup/>}></Route>
            {user?user.role === 'admin'?
                  // Router dành cho admin
            <>
                <Route path={'/home'} element={<Home/>}>
                    <Route path={'/home/list'} element={<List/>}/>
                    <Route path={'/hom/search'} element={<Search/>}/>
                    <Route path={'/home/create'} element={<Create/>}/>
                    <Route path={'/home/edit/:id'} element={<Edit/>}/>
                </Route>
                <Route path={"*"} element={<Navigate to={'home'}/>}></Route>
            </> :
                    // Router dành cho user
                    <>
                        <Route path={'/homeUser'} >

                        </Route>
                    </>
                :
            <>
                <Route path={'*'} element={<Navigate to={'login'}/>}></Route>
            </>}
        </Routes>
      </>
  );
}

export default App;





// function App() {
//     const userRole = localStorage.getItem('role');
//
//     return (
//         <>
//             <Routes>
//                 {userRole === 'admin' && (
//                     <Route path={'/home'} element={<Home/>}>
//                         <Route path={'/home/list'} element={<List/>}/>
//                         <Route path={'/home/search'} element={<Search/>}/>
//                         <Route path={'/home/create'} element={<Create/>}/>
//                         <Route path={'/home/edit/:id'} element={<Edit/>}/>
//                     </Route>
//                 )}
//                 {userRole === 'user' && (
//                     <Route path={'/user'} element={<HomeUser/>}>
//                         <Route path={'/user/list'} element={<ListUser/>}/>
//                         <Route path={'/user/search'} element={<SearchUser/>}/>
//                         <Route path={'/user/create'} element={<CreateUser/>}/>
//                         <Route path={'/user/edit/:id'} element={<EditUser/>}/>
//                     </Route>
//                 )}
//                 {(userRole !== 'admin' && userRole !== 'user') && (
//                     <Route path={'/general'} element={<General/>}>
//                         <Route path={'/general/list'} element={<List/>}/>
//                     </Route>
//                 )}
//             </Routes>
//         </>
//     );
// }
