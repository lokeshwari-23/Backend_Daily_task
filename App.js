import logo from './logo.svg';
import './App.css';
import {Task} from './task';
import { Filter } from './task';
import FormProduct from'./FormProduct';
import Validation from './Validation';

function App() {
  return (
   <>
    <Task data={"lokeshwariiiii,hi"}/>
     <Filter arr={[1,2,3,4,5,6,7,8,9,10]}/>
     <FormProduct/>
     <Validation/>
    </>
    
    
    
  );
}

export default App;
