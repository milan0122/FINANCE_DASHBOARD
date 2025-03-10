import DashboardBox from '@/components/DashboardBox';
import FlexBetween from '@/components/FlexBetween';
import Header from '@/components/Header';
import { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } from '@/state/api';
import { Box, Typography, useTheme } from '@mui/material';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
import React, { useMemo } from "react";
import { Cell, Pie, PieChart } from 'recharts';

const Row3 = () => {
  const { data: KpiData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { data: transactionData } = useGetTransactionsQuery();
  const { palette } = useTheme();
  const pieColor = [palette.primary[800],palette.primary[500]]
  const pieChartData= useMemo(()=>{
    if(KpiData){
    const totalExpenses= KpiData[0].totalExpenses;
    return Object.entries(KpiData[0].expensesByCategory).map(
      ([key,value])=>{
        return [
          {
            name:key,
            value:value,
          },{
            name:`${key} of Total`,
            value:totalExpenses-value,
          },
        ];
      }
    )

  }},[KpiData]);
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


      <DashboardBox gridArea="i">
        <Header
          title="Expenses Breakdown By Category"
          sideText='+4%' />
        <FlexBetween mt="0.5rem" gap="0.5rem" textAlign="center">
          {pieChartData?.map((data,i)=>(
            <Box key={`$data[0].name-${i}`}>
            <PieChart
              width={100}
              height={75}
            >
              <Pie
                stroke='none'
                data={data}
                innerRadius={18}
                outerRadius={35}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={pieColor[index]} />
                ))}
              </Pie>
            </PieChart>
     
              <Typography mb="0.5rem" variant="h5"> {data[0].name} </Typography>
           
            </Box>

          ))}
        </FlexBetween>

      </DashboardBox>
      <DashboardBox gridArea="j">
        <Header
        title='Overall Sumamry and Explaination Data'
        sideText='+15%'
        />
        <Box
        height="15px"
        margin="1.25rem 1rem 0.4rem 1rem"
        borderRadius="1rem"
        bgcolor={palette.primary[400]}
        >
          <Box
          height="15px"
          bgcolor={palette.primary[600]}
          borderRadius="1rem"
          width="40%"
          >
          </Box>
          <Typography margin="0.5rem 1rem" variant='h6'>
            Odit, ab ipsa repellendus nulla illo accusamus nesciunt natus maiores animi a fugit iusto incidunt sint, ex aperiam numquam error ad aliquam quod deserunt neque tenetur? Similique, aspernatur! Quod, reiciendis?
          </Typography>

        </Box>
      </DashboardBox>
    </>
  )
}

export default Row3;