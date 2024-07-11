"use client"
import Header from "./_components/Header";
import useSWR from "swr";
import { fetcher } from "@/lib";
import { Button } from "@/components/ui/button";


//fetch call
export default function Home() {

  const baseApi = `${process.env.NEXT_PUBLIC_API_URL}`;

  const { data: incomes, error } = useSWR(`${baseApi}/income`, fetcher);
  // const { data: income, error } = useSWR(apiUrl, fetcher);
  if (!incomes) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <>
      <div>
        <Header />
        <h1>Fetch Data</h1>
        {/* <pre>{JSON.stringify(income)}</pre> */}
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <ul>
          {incomes.data.map((income) => (
            <li key={income._id}>{income.title}</li>
          ))}
        </ul>

        <Button>Add Income</Button>
      </div>
    </>
  );
}
