"use client";
import { fetcher } from '@/lib';
import useSWR from 'swr';
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from '@/components/ui/skeleton';

const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

function WeatherNow() {
  const [city, setCity] = useState("westmead");
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const { data: weatherData, error, isLoading } = useSWR(weatherUrl, fetcher);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  // const handleSearch = () => {
  //       const { data: weatherData, error, isLoading } = useSWR(weatherUrl, fetcher);
  //       if (error) return <div>failed to load</div>
  //       if (isLoading) return (
  //           <div className="flex items-center space-x-4 pt-10">
  //           <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
  //           <div className="space-y-2">
  //               <Skeleton className="h-4 w-[250px] bg-gray-400" />
  //               <Skeleton className="h-4 w-[200px] bg-orange-300" />
  //           </div>
  //           </div>
  //       );
  // };

  return (
    <Card className="w-auto shadow-md">
      <CardHeader>
        <CardTitle>Weather Data </CardTitle>
        <CardDescription>Search for weather data.</CardDescription>
      </CardHeader>
      <CardContent>
        {error && <div>Failed to load</div>}
        {isLoading && <div className="flex items-center space-x-4 pt-10">
            <Skeleton className="h-12 w-12 rounded-full bg-gray-400" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-gray-400" />
                <Skeleton className="h-4 w-[200px] bg-orange-300" />
            </div>
            </div>}
        {weatherData && (
          <div className='p-3'>
            <div className='pb-3'><strong>Weather in {weatherData.name}</strong></div>
            <div className="grid w-full items-center gap-4">
              <div className='flex items-center gap-10'>
                  <div key="temp" className="flex flex-col space-y-1.5">
                    <p><strong>Temperature:</strong> {(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
                  </div>
                  <div key="description" className="flex flex-col space-y-1.5">
                    <p><strong>Weather:</strong> {weatherData.weather[0].description}</p>
                  </div>
              </div>
              <div className='flex items-center gap-10'>
                  <div key="humidity" className="flex flex-col space-y-1.5">
                    <p><strong>Humidity:</strong> {weatherData.main.humidity}%</p>
                  </div>
                  <div key="wind" className="flex flex-col space-y-1.5">
                    <p><strong>Wind Speed:</strong> {weatherData.wind.speed} m/s</p>
                  </div>
              </div>
              
              
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <div className='flex items-center w-[300px]'><Input type="text" value={city} onChange={handleCityChange} placeholder="Search your location" /></div>
      </CardFooter>
    </Card>
  );
}

export default WeatherNow;
