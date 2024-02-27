import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import RestaurantPage from './RestaurantPage';

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function App() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <BrowserRouter>
                <Routes>
                    <Route path="/restaurants/:id" element={<RestaurantPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
