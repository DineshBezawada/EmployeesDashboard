import './App.css';
import EmployeeDashboard from './features/EmployeesDashboard';
import Header from './features/Header';

function App() {
 
  return (
    <div className="App">
     <Header/>
     <EmployeeDashboard />
    </div>
  );
}

export default App;