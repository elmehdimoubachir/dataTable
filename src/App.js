
import DataTable from './Compenent/DataTable';
import React, { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";

const columns = [
  {
    accessorKey: 'id',
    header: 'ID',
    size: 40,
  },
  {
    accessorKey: 'culture',
    header: 'Culture',
    size: 120,
  },
  {
    accessorKey: 'variety',
    header: 'Variety',
    size: 120,
  },
  {
    accessorKey: 'batch_number',
    header: 'Number Lot',
    size: 300,
  },
  {
    accessorKey: 'N_batch',
    header: 'Number Batch ',
  },
  {
    accessorKey: 'number_of_cells_per_tray',
    header: 'Number of Cells per tray',
  },
  {
    accessorKey: 'days_after_sowing',
    header: 'Day after sowing',
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
  {
    accessorKey: 'action',
    header: 'Action',
    size: 120,
    
  },
];

const App = ({}) => {
  const [dataOfPreduction , setDataOfPreduction] = useState([]);

  useEffect(() => {
    getData();
}, []);

const getData = async () => {
  try {
      const res = await axios.get(`endpoint/predictions`, {
        headers: {
          Authorization: `Bearer token`,
        },
      });
      if (res.status == 200) {
        setDataOfPreduction(res.data.predictions);
      }
    } catch (error) {
      setDataOfPreduction([]);
    }
};
  
  return (
    <div>
      <DataTable data={dataOfPreduction}  columns = {columns}  />
    </div>
  )
  
};

export default App;
//dateCulturevarietenum_de_lotnumber_batchedate_semisActual_agenombre de grainesPlantes commandéesjour_apres_semispourcentage_germinationpourcentage_totaldeviationnumero_commandeclientfournisseur