import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import RestaurantPage from './RestaurantPage';
import ErrorPage from './pages/ErrorPage';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from 'react';

function App() {

    return (
        <QueryClientProvider client={new QueryClient()}>
            <BrowserRouter>
                <Routes>
                    <Route path="/restaurants/:id" element={<RestaurantPage />} />
                    <Route path="*" element={<ErrorPage errorMessage='404 Not Found' />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
