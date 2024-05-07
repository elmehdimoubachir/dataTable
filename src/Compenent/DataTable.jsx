import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { MantineProvider } from '@mantine/core';

import { Box, Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { jsPDF } from 'jspdf'; 
import autoTable from 'jspdf-autotable'; 
import { mkConfig, generateCsv, download } from 'export-to-csv';
import "../App.css"
import { ChevronDown, Filter } from 'lucide-react';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";


const DataTable = ({data,columns}) => {
    const handleExportRowsPdf = (rows) => {
        // // Check if any rows are selected
        // if (Array.isArray(rows) && rows.length > 0) {
        //   const doc = new jsPDF();
        //   const tableData = rows.map((row) => Object.values(row.original));
        //   const tableHeaders = columns.map((c) => c.header);
      
        //   autoTable(doc, {
        //     head: [tableHeaders],
        //     body: tableData,
        //   });
      
        //   doc.save('mrt-pdf-example.pdf');
        // } else {
        //   // If no rows are selected, export all rows from the original data
        //   const doc = new jsPDF();
        //   const tableData = data.map((row) => Object.values(row));
        //   const tableHeaders = columns.map((c) => c.header);
      
        //   autoTable(doc, {
        //     head: [tableHeaders],
        //     body: tableData,
        //   });
      
        //   doc.save('mrt-pdf-example.pdf');
        // }
      };
      
      const handleExportRowsExcel = (rows) => {
        // // Check if any rows are selected
        // if (Array.isArray(rows) && rows.length > 0) {
        //   const rowData = rows.map((row) => row.original);
        //   const csv = generateCsv(csvConfig)(rowData);
        //   download(csvConfig)(csv);
        // } else {
        //   // If no rows are selected, export all rows from the original data
        //   const csv = generateCsv(csvConfig)(data);
        //   download(csvConfig)(csv);
        // }
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
        
        initialState: {
          columnPinning: {  right: ['action'] },
          showGlobalFilter: true,
          
        },
        mantinePaperProps: {
          style: { '--mrt-base-background-color': '#549433' },
        },
        mantineTableCellProps:{color: '#549433'},
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
      <button class="dropbtn">Export <ChevronDown /></button>
      <div class="dropdown-content">
        <Button
              className='w-[80%] mb-1 mt-1 ml-4 bg-[#5e9643]'
              //only export selected rows
              onClick={() => handleExportRowsPdf(table.getSelectedRowModel().rows)}
              leftIcon={<IconDownload />}
              variant="filled"
            >
              PDF
            </Button>
            <Button
              className='w-[80%] mb-1 mt-1 ml-4 bg-[#5e9643]'
              //only export selected rows
              onClick={() => handleExportRowsExcel(table.getSelectedRowModel().rows)}
              leftIcon={<IconDownload />}
              variant="filled"
            >
              Excel
            </Button>
      </div>
    </div>
            
          </Box>
        ),
      }
    );

      
  return <MantineProvider theme={{ primaryColor: 'green' }}>
            <MantineReactTable table={table} />
          </MantineProvider>;
  
};

export default DataTable;