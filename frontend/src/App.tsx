import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Navbar from './components/Navbar';
import CafesPage from './pages/CafesPage';
import EmployeesPage from './pages/EmployeesPage';
import CafeForm from './pages/CafeForm';
import EmployeeForm from './pages/EmployeeForm';

const { Content } = Layout;

export default function App() {
  return (
    <Layout>
      <Navbar />
      <Content style={{ padding: '24px' }}>
        <Routes>
          <Route path="/cafes" element={<CafesPage />} />
          <Route path="/cafes/new" element={<CafeForm />} />
          <Route path="/cafes/edit/:id" element={<CafeForm />} />
          <Route path="/employees" element={<EmployeesPage />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="/employees/edit/:id" element={<EmployeeForm />} />
        </Routes>
      </Content>
    </Layout>
  );
}