import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const { pathname } = useLocation();
  return (
    <Menu mode="horizontal" selectedKeys={[pathname]}>
      <Menu.Item key="/cafes">
        <Link to="/cafes">Cafes</Link>
      </Menu.Item>
      <Menu.Item key="/employees">
        <Link to="/employees">Employees</Link>
      </Menu.Item>
    </Menu>
  );
}