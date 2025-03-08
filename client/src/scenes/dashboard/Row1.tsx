import { useMemo } from "react";
import DashboardBox from '@/components/DashboardBox';
import { useGetKpisQuery } from "@/state/api";
import { useTheme } from "@mui/material";
import Header from "@/components/Header";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Rectangle, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";



const Row1 = () => {
  const { data } = useGetKpisQuery();
  const { palette } = useTheme();
  console.log('data:', data);
  const revenue = useMemo(() => {
    return (
      data &&
      data[0].monthlyData.map(({ month, revenue }) => {
        return {
          name: month.substring(0, 3),
          revenue: revenue,
        }
      })
    );
  }
    , [data]);
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
    const revenueProfit = useMemo(() => {
      return (
        data &&
        data[0].monthlyData.map(({ month, revenue, expenses }) => {
          return {
            name: month.substring(0, 3),
            revenue: revenue,
            profit: (revenue-expenses).toFixed(2)
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
            <XAxis 
            dataKey="name" 
            tickLine={false} 
            syle= {{ fontSize:"10px"}}
            />

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

      <DashboardBox gridArea="b">
        <Header
        title="Profit and Revenue"
        subtitle="top line represent profit, bottom line represent revenue"
        sideText="+4%"
        />
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenueProfit}
            margin={{
              top: 20,
              right: 0,
              left:- 5,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />

            <XAxis 
            dataKey="name" 
            tickLine={false} 
            syle= {{ fontSize:"10px"}}
            />

            <YAxis yAxisId="left" orientation="left"
            tickLine={false} 
            syle={{fontSize:"10px"}} 
            axisLine={false}
            />

            <YAxis yAxisId="right" orientation="right"
            tickLine={false} 
            syle={{fontSize:"10px"}} 
            axisLine={false}
            />
            <Tooltip />
            <Legend height={20} wrapperStyle={{
              margin: "0px 0px 10px 0px",
            }}/>
            <Line yAxisId="left"
            type="monotone"
             dataKey="profit" 
            fillOpacity={1}
             dot = {true}
            stroke={palette.tertiary[500]} 
            fill="url(#colorProfit)"/>

          <Line yAxisId="right"
          type="monotone"
             dataKey="revenue" 
             dot = {true}
             fillOpacity={1}
            stroke={palette.primary.main} 
            fill="url(#colorRevenue)"/>
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox gridArea="c">
      <ResponsiveContainer width="100%" height="100%">
      <Header
        title="Revenue Month by Month"
        subtitle="bar chart represent revenue month by month"
        sideText="+4%"
        />

        <BarChart
          width={500}
          height={300}
          data={revenue}
          margin={{
            top: 15,
            right: 15,
            left: -5,
            bottom: 60,
          }}
        >
          <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop 
                offset="5%" 
                stopColor={palette.primary[300]}
                 stopOpacity={0.8}/>
                 <stop 
                offset="95%" 
                stopColor={palette.primary[300]}
                 stopOpacity={0}/>
                 </linearGradient>
              </defs>
          <CartesianGrid vertical={false} stroke={palette.grey[800]}/>
          <XAxis dataKey="name" 
          axisLine={false} tickLine={false} style={{fontSize:"10px"}} 
          />
          <YAxis axisLine={false} tickLine={false} style={{fontSize:"10px"}} />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" 
            fill="url(#colorRevenue)"/>
          {/* <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} /> */}
        </BarChart>
      </ResponsiveContainer>
      </DashboardBox>
    </>
  )
};

export default Row1;