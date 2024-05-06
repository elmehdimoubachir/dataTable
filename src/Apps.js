import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Box, Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { jsPDF } from 'jspdf'; 
import autoTable from 'jspdf-autotable'; 
import { mkConfig, generateCsv, download } from 'export-to-csv';
import "./App.css"
const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 40,
  },
  {
    accessorKey: 'firstName',
    header: 'First Name',
    size: 120,
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    size: 120,
  },
  {
    accessorKey: 'company',
    header: 'Company',
    size: 300,
  },
  {
    accessorKey: 'city',
    header: 'City',
  },
  {
    accessorKey: 'eeee',
    header: 'eeee',
  },
  {
    accessorKey: 'ddd',
    header: 'ddd',
  },
  {
    accessorKey: 'hea',
    header: 'hea',
  },
  {
    accessorKey: 'country',
    header: 'Country',
    size: 220,
  },
];
const data = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      company: 'ABC Corporation',
      city: 'New York',
      country: 'USA',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      company: 'XYZ Corp',
      city: 'Los Angeles',
      country: 'USA',
    },
    {
      id: 3,
      firstName: 'Alice',
      lastName: 'Johnson',
      company: 'Acme Ltd',
      city: 'London',
      country: 'UK',
    },
    // Add more sample data as needed...
  ];
const csvConfig = mkConfig({
  fieldSeparator: ',',
  decimalSeparator: '.',
  useKeysAsHeaders: true,
});
const Example = () => {
  
  const handleExportRowsPdf = (rows) => {
    // Check if any rows are selected
    if (Array.isArray(rows) && rows.length > 0) {
      const doc = new jsPDF();
      const tableData = rows.map((row) => Object.values(row.original));
      const tableHeaders = columns.map((c) => c.header);
  
      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
      });
  
      doc.save('mrt-pdf-example.pdf');
    } else {
      // If no rows are selected, export all rows from the original data
      const doc = new jsPDF();
      const tableData = data.map((row) => Object.values(row));
      const tableHeaders = columns.map((c) => c.header);
  
      autoTable(doc, {
        head: [tableHeaders],
        body: tableData,
      });
  
      doc.save('mrt-pdf-example.pdf');
    }
  };
  
  const handleExportRowsExcel = (rows) => {
    // Check if any rows are selected
    if (Array.isArray(rows) && rows.length > 0) {
      const rowData = rows.map((row) => row.original);
      const csv = generateCsv(csvConfig)(rowData);
      download(csvConfig)(csv);
    } else {
      // If no rows are selected, export all rows from the original data
      const csv = generateCsv(csvConfig)(data);
      download(csvConfig)(csv);
    }
  };
  
  const table = useMantineReactTable({
    columns,
    data,
    enableRowSelection: true,
    columnFilterDisplayMode: 'popover',
    paginationDisplayMode: 'pages',
    positionToolbarAlertBanner: 'bottom',
    enableDensityToggle:false,
    enableFullScreenToggle:false,
    positionGlobalFilter:"left",
    color:"#549433",
    initialState: {
      columnPinning: {  right: ['country'] },
      showGlobalFilter: true,

    },
    mantineTableHeadCellProps: {sx: {
      '& .mantine-TableHeadCell-Content': {
          color: '#549433',
          justifyContent: 'space-between',
      },
  }},mantineTableBodyCellProps: {sx: {color: '#549433', 
  textAlign: 'left'}},
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
      sx={{
        display: 'flex',
        gap: '16px',
        padding: '8px',
        flexWrap: 'wrap',
        
      }}
    >
<div class="dropdown">
<button class="dropbtn">Dropdown</button>
<div class="dropdown-content">
  <Button
  
        //only export selected rows
        onClick={() => handleExportRowsPdf(table.getSelectedRowModel().rows)}
        leftIcon={<IconDownload />}
        variant="filled"
      >
        PDF
      </Button>
      <Button
        
        //only export selected rows
        onClick={() => handleExportRowsExcel(table.getSelectedRowModel().rows)}
        leftIcon={<IconDownload />}
        variant="filled"
      >
        Excel
      </Button>
</div>
</div>
      
    </Box>)
  });

  return <MantineReactTable table={table} />;
};

export default Example;