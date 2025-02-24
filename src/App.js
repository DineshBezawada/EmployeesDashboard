import './App.css';
import EmployeeDashboard from './features/EmployeesDashboard';
import Header from './features/Header';
import ScrollPercentage from './features/ScrollPercentage';

function App() {
 
  return (
    <div className="App">
     <Header/>
     <EmployeeDashboard />
     <ScrollPercentage />
    </div>
  );
}

export default App;