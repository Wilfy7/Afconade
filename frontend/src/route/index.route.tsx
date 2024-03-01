import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Homepage from '../pages/home/Homepage'
import Navbar from '../components/layouts/navbar/Navbar'
import Leaderboard from '../pages/leaderboard/Leaderboard'
import Gamegroups from '../pages/createGameGroups/Gamegroups'
import Groups from '../pages/gameGroups/Groups'
import AddMember from '../pages/gameGroups/AddMember'
import Admin from '../pages/admin/Admin'
import Prediction from '../pages/prediction/Prediction'
import UpdateMatch from '../pages/matchResults/UpdateMatch'
import SingleUser from '../pages/singleUser/SingleUser'
import Predictions from '../pages/allpredictions/Predictions'
import GameRules from '../pages/gameRules/GameRules'

const IndexRoute = () => {
  return (
    <BrowserRouter>
       <nav>
        <Navbar />
       </nav>

       <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/create-group" element={<Gamegroups />} />
        <Route path= "/groups" element={<Groups />} />
        <Route path= "/group/add-member" element={<AddMember />} />
        <Route path= "/admin" element={<Admin />} />
        <Route path= "/matches/prediction/:matchid" element={<Prediction />} />
        <Route path= "/matches/update/:matchid"  element={<UpdateMatch />} />
        <Route path= "/users/:id" element={<SingleUser />} />
        <Route path= "/matches/predictions" element={<Predictions />} />
        <Route path= "/game-rules" element={<GameRules />} />
        <Route 
           path= "/predictions/edit/:matchid" 
           element={<Groups />} 
        />
         <Route path= "*" element={<h1>404 Not Found</h1>} />
       </Routes>
    </BrowserRouter>
  )
}

export default IndexRoute;