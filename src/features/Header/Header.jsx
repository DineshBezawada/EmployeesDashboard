import { useEffect } from 'react'
import './header.css'
import { useDispatch, useSelector } from 'react-redux';
import { fetchEmployeesRequest } from '../../redux/actions/employeesDataAction';
const Header = () => {
  const dispatch = useDispatch();
  const {companyData} = useSelector((state) => state.employee);
     useEffect(() => {
        dispatch(fetchEmployeesRequest());
      }, [dispatch]);
      

return (
    <header>
      <h2 className='company_name' data-testid='companyName'>{companyData?.companyName}</h2>
      <div className="header_content">
        <span>{companyData?.companyMotto}</span>
<span>Since {companyData?.companyEst.slice(0,10)}</span>
      </div>
    </header>
  )
}

export default Header;