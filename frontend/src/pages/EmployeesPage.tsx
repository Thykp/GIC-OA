import { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { fetchEmployees, deleteEmployee } from '../services/api';
import ConfirmModal from '../components/ConfirmModal';

export default function EmployeesPage() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [delId, setDelId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees(filter).then((res) => setData(res.data));
  }, [filter]);

  const cols = [
    { field: 'id' },
    { field: 'name' },
    { field: 'email_address', headerName: 'Email' },
    { field: 'phone_number', headerName: 'Phone' },
    { field: 'days_worked', headerName: 'Days Worked' },
    { field: 'cafe', headerName: 'Café' },
    {
      headerName: 'Actions',
      cellRenderer: (p: any) => (
        <>
          <Button size="small" onClick={() => navigate(`/employees/edit/${p.data.id}`)}>Edit</Button>
          <Button size="small" danger onClick={() => setDelId(p.data.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Input.Search
        placeholder="Filter by café"
        onSearch={setFilter}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Button type="primary" onClick={() => navigate('/employees/new')} style={{ marginBottom: 16 }}>
        Add New Employee
      </Button>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact rowData={data} columnDefs={cols} />
      </div>
      <ConfirmModal
        visible={!!delId}
        title="Delete this employee?"
        onConfirm={() => delId && deleteEmployee(delId).then(() => setFilter(''))}
        onCancel={() => setDelId(null)}
      />
    </>
  );
}