import { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import { useNavigate } from 'react-router-dom';
import { fetchCafes, deleteCafe } from '../services/api';
import ConfirmModal from '../components/ConfirmModal';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function CafesPage() {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState('');
  const [delId, setDelId] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCafes(filter).then((res) => setData(res.data));
  }, [filter]);

  const cols = [
    { field: 'logo_url', headerName: 'Logo', cellRenderer: (p: any) => <img src={p.value} width={40} /> },
    { field: 'name' },
    { field: 'description' },
    { field: 'employees', headerName: '# Employees' },
    { field: 'location' },
    {
      headerName: 'Actions',
      cellRenderer: (p: any) => (
        <> 
          <Button size="small" onClick={() => navigate(`/cafes/edit/${p.data.id}`)}>Edit</Button>
          <Button size="small" danger onClick={() => setDelId(p.data.id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Input.Search
        placeholder="Filter by location"
        onSearch={setFilter}
        style={{ width: 200, marginBottom: 16 }}
      />
      <Button type="primary" onClick={() => navigate('/cafes/new')} style={{ marginBottom: 16 }}>
        Add New Café
      </Button>
      <div className="ag-theme-alpine" style={{ height: 400 }}>
        <AgGridReact rowData={data} columnDefs={cols} />
      </div>
      <ConfirmModal
        visible={!!delId}
        title="Delete this café?"
        onConfirm={() => delId && deleteCafe(delId).then(() => setFilter(''))}
        onCancel={() => setDelId(null)}
      />
    </>
  );
}