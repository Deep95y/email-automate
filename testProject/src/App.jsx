import Mainmodal from './modal1';
import DropModal from './modal2';
import AddBlocksModal from './emailtemplate';
import WaitBlockModal from './delaymodal';
import DropEmailModal from './modal3';
import {Routes, Route, BrowserRouter} from 'react-router-dom'; 
import Flow from './fun';

const App = () => {
  return(
    <>
   
<main>
  <BrowserRouter>
  <Routes>
    <Route path ="/" element ={<Flow/>}/>
    <Route path ="/Fun" element ={<Flow/>}/>
    <Route path ="/modal3" element ={<DropEmailModal/>}/>
    <Route path ="/delaymodal" element ={<WaitBlockModal/>}/>
    <Route path ="/emailtemplate" element ={<AddBlocksModal/>}/>
    <Route path ="/modal2" element ={<DropModal/>}/>
    <Route path ="/modal1" element ={<Mainmodal/>}/>
    <Route path ="." element ={<h1>404 Route not found</h1>}/>
  </Routes> 
  </BrowserRouter>
  </main>
    </>
  );
}

export default App;