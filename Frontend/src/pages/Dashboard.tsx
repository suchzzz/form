import React, { useEffect, useState } from 'react'
import BasicLineChart from '../components/BasicLineChart';
import { data } from '../utils/artData'
import { Stack } from '@fluentui/react';
import NightingaleChart from '../components/NightingaleChart';
interface d {
  year: number,
  price: number
}
interface pie{
  value:number,
  name:string
}
const Dashboard = () => {
  const [chartData, setChatData] = useState<number[]>([]);
  const [chartCategories, setChartCategories] = useState<string[]>([]);
 const[pieChartData,setPieChartData]=useState<pie[]>([]);
  const [pr,setPr]=useState<d[]>();
  

  useEffect(() => {
    let myHashMap = new Map();
    let prop: d[] = [];
    data.forEach(e => {
      prop.push({
        year: Number(e.year),
        price: Number(e.price?.$numberDecimal)
      })
      e.tags.forEach(tag=>{
        myHashMap.set(tag,(myHashMap.get(tag)??0)+1)
      })
    });
    // console.log(myHashMap);
    let p:pie[]=[];
    Array.from(myHashMap.entries()).forEach(([key, value]) => {
      p.push({
        value:value,
        name:key
      })
    });

    prop=prop.sort((a, b) => a.year - b.year);
    console.log(prop)
    setPr(prop);
    let a:number[]=[]
    let b:string[]=[]
    prop.forEach(e => {
      a.push(e.price);
      b.push(e.year.toString());
    });
    setChatData(a);
    setChartCategories(b);    
    setPieChartData(p);
  }, [])
  return (
    <Stack>
      <BasicLineChart data={chartData} categories={chartCategories} />
     <NightingaleChart data={pieChartData} />
    </Stack>
  );
};

export default Dashboard
