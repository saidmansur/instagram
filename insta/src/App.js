
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Enter from './components/enter';
import Showpost from './components/showpost';
import Lenta from './components/lenta';
import Search from './components/search';
import Hearts from './components/hearts';
import Profile from './components/profile';
import Chat from './components/chat';
import Statistica from './components/statistica';
import Promotion from './components/promotion';
import Change from './components/change';
import Smain from './components/smain';
import Insidesmain from './components/insidesmain';
import Message from './components/message';
import Newpublic from './components/newpublic';
import Publicchange from './components/publicchange';
import Registrade from './components/registrade';
import Passchange from './components/passchange';
import Userprofile from './components/userprofile';
import $ from 'jquery';
const App = ()=>{
  console.log('local',localStorage.getItem('token'))
    return (
      <div className="container-fluid">
        <Router>
          <Routes>
            <Route path='/showpost/:post_id' element={<Showpost/>}/>
            <Route path='/userprofile/:id' element={<Userprofile/>}/>
            <Route path='/passchange' element={<Passchange />} />
            <Route path="/registrade" element={<Registrade />} />
            <Route path="/publicchange/:id/:photo" element={<Publicchange />} />
            <Route path="/newpublic" element={<Newpublic />} />
            <Route path="/message/:dialog_id/:id" element={<Message />} />
            <Route path="/insidesmain" element={<Insidesmain />} />
            <Route path="/smain" element={<Smain />} />
            <Route path="/change" element={<Change />} />
            <Route path="/promotion" element={<Promotion />} />
            <Route path="/statistica" element={<Statistica />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/hearts" element={<Hearts />} />
            <Route path="/search" element={<Search />} />
            <Route exact path="/lenta" element={<Lenta />} />
            <Route path="/" element={<Enter />} />
          </Routes>
        </Router>
      </div>
    );
}

export default App;
