import { useMemo } from "react";
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from "@/state/api";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from "@mui/material";
import Header from "@/components/Header";

type Props = {};

const Row1 = (props: Props) => {
  const { data } = useGetKpisQuery();
  const { palette } = useTheme();
  console.log('data:', data);
  const revenueExpenses = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue, expenses }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses
        }
      })
    );
  }
    , [data]);
  return (
    <>
      <DashboardBox gridArea="a">
        <Header
        title="Revenue and Expenses"
        subtitle="top line represent revenue, bottom line represent expenses"
        sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={revenueExpenses}
            margin={{
              top: 15,
              right: 25,
              left:5 ,
              bottom: 60,
            }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop 
                offset="5%" 
                stopColor={palette.primary[300]}
                 stopOpacity={0.5}/>
                 <stop 
                offset="95%" 
                stopColor={palette.primary[300]}
                 stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop 
                offset="5%" 
                stopColor={palette.primary[300]}
                 stopOpacity={0.5}/>
                 <stop 
                offset="95%" 
                stopColor={palette.primary[300]}
                 stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" tickLine={false} 
            syle={{fontSize:"10px"}}/>
            <YAxis tickLine={false} 
            syle={{fontSize:"10px"}} 
            axisLine={{strokeWidth:"0"}}
            domain={[8000,23000]}
            />
            <Tooltip />
            <Area type="monotone"
             dataKey="revenue" 
            fillOpacity={1}
             dot = {true}
            stroke={palette.primary.main} 
            fill="url(#colorRevenue)"/>
          <Area type="monotone"
             dataKey="expenses" 
             dot = {true}
             fillOpacity={1}
            stroke={palette.primary.main} 
            fill="url(#colorExpenses)"/>
          </AreaChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="b"></DashboardBox>
      <DashboardBox gridArea="c"></DashboardBox>
    </>
  )
};

export default Row1;