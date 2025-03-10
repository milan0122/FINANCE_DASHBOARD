import DashboardBox from '@/components/DashboardBox';
import Header from '@/components/Header';
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api';
import { Box, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import React, { useMemo } from "react";
type Props = {};

const Row3 = (props: Props) => {
  const { data: KPIData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  const { palette } = useTheme();

  const productColumns = [
    {
      field: '_id',
      headerName: "id",
      flex: 1,
    },
    {
      field: 'expense',
      headerName: "Expense",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`// this render expense with dollar sign
    },
    {
      field: 'price',
      headerName: "Price",
      flex: 0.5,
      renderCell: (params: GridCellParams) => `$${params.value}`
    }
  ]
  const transactionColumns = [
    {
      field: '_id',
      headerName: "id",
      flex: 1,
    },
    {
      field: 'buyer',
      headerName: "Buyer",
      flex: 0.67,
    },
    {
      field: 'amount',
      headerName: "Amount",
      flex: 0.35,
      renderCell: (params: GridCellParams) => `$${params.value}`
    },
    {
      field: 'productIds',
      headerName: "Count",
      flex: 0.1,
      renderCell: (params: GridCellParams) => (params.value as string[]).length
    }
  ]
  return (
    <>
      <DashboardBox gridArea="g">
        <Header
          title="List of Products"
          sideText={`${productData?.length} Products`}
        />
        <Box
          mt="0.5rem"
          p="0.05rem"
          height="75%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]}`  
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]}`
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden"
            }
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={productData || []}
            columns={productColumns}
          />

        </Box>

      </DashboardBox>
      <DashboardBox gridArea="h">
        <Header
          title="Recent Orders"
          sideText={`${transactionData?.length} latest transactions`}
        />
        <Box
          mt="1rem"
          p="0.05rem"
          height="80%"
          sx={{
            "& .MuiDataGrid-root": {
              color: palette.grey[300],
              border: "none"
            },
            "& .MuiDataGrid-cell": {
              borderBottom: `1px solid ${palette.grey[800]}`  
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: `1px solid ${palette.grey[800]}`
            },
            "& .MuiDataGrid-columnSeparator": {
              visibility: "hidden"
            }
          }}
        >
          <DataGrid
            columnHeaderHeight={25}
            rowHeight={35}
            hideFooter={true}
            rows={transactionData || []}
            columns={transactionColumns}
          />

        </Box>

      </DashboardBox>
      <DashboardBox gridArea="i"></DashboardBox>
      <DashboardBox gridArea="j"></DashboardBox>
    </>
  )
}

export default Row3;