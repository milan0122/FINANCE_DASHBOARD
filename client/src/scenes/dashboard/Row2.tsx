import DashboardBox from '@/components/DashboardBox'
import { useMemo } from "react";
import React from 'react';
import { useGetKpisQuery, useGetProductsQuery } from '@/state/api';
import Header from '@/components/Header';
import { CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from 'recharts';
import { Box, Typography, useTheme } from '@mui/material';
import FlexBetween from '@/components/FlexBetween';

const piedata = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];

const Row2 = () => {
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { palette } = useTheme();
  const pieColor = [palette.primary[800], palette.primary[300]];
  // console.log("data:",data);
  const OperationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(({ month, operationalExpenses, nonOperationalExpenses }) => {
        return {
          name: month.substring(0, 3),
          "Operational Expenses": operationalExpenses,
          "Non-Operational Expenses": nonOperationalExpenses,
        }
      })
    );
  }
    , [operationalData]);
  const productExpenseRatio = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense

        }
      })
    );
  }
    , [productData]);
  return (
    <>
      <DashboardBox gridArea="d">
        <Header
          title="Operational vs Non-Operational Expenses"
          subtitle="top line represent Non-operational Expenses, bottom line represent Operational Expenses"
          sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={OperationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: - 5,
              bottom: 70,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />

            <XAxis
              dataKey="name"
              tickLine={false}
              syle={{ fontSize: "10px" }}
            />

            <YAxis yAxisId="left" orientation="left"
              tickLine={false}
              syle={{ fontSize: "10px" }}
              axisLine={false}
            />

            <YAxis yAxisId="right" orientation="right"
              tickLine={false}
              syle={{ fontSize: "10px" }}
              axisLine={false}
            />
            <Tooltip />
            {/* <Legend height={20} wrapperStyle={{
              margin: "0px 0px 10px 0px",
            }}/> */}
            <Line yAxisId="left"
              type="monotone"
              dataKey="Non-Operational Expenses"
              fillOpacity={1}
              dot={true}
              stroke={palette.tertiary[500]}
              fill="url(#colorProfit)" />

            <Line yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              dot={true}
              fillOpacity={1}
              stroke={palette.primary.main}
              fill="url(#colorRevenue)" />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="e">
        <Header
          title="Campaigns and Targets"
          sideText='+4%' />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              stroke='none'
              data={piedata}
              innerRadius={18}
              outerRadius={36}
              paddingAngle={2}
              dataKey="value"
            >
              {piedata.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieColor[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.75rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5"> Target Sales </Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}> 83 </Typography>
            <Typography variant="h6" > Finance goals of the Campaign that is desired</Typography>
          </Box>
          <Box ml="-0.75rem" flexBasis="40%" >
            <Typography variant="h5"> Losses in Revenue </Typography>
            <Typography variant="h6" > Losses are down 25%</Typography>
            <Typography variant="h5" mt="1rem" >Profit Margins</Typography>
            <Typography variant="h6" >Margins are up by 30% from last month.</Typography>
          </Box>
        </FlexBetween>

      </DashboardBox>

      <DashboardBox gridArea="f">
        <ResponsiveContainer width="100%">
          <Header
            title="Product Prices  vs Expenses"
            sideText="+4%" />
          <ScatterChart
            margin={{
              top: 20,
              right: 25,
              bottom: 40,
              left: -5,
            }}
          >
            <CartesianGrid stroke={palette.grey[300]} />
            <XAxis
              type="number"
              dataKey="price"
              name="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}

            />
            <YAxis type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />

            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter name="Product Expense Ratio" data={productExpenseRatio}
              fill={palette.tertiary[500]} />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  )
}

export default Row2;