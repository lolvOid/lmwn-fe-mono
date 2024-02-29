import '@/App.css';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import RestaurantPage from '@/pages/RestaurantPage';
import ErrorPage from '@/pages/ErrorPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
    return (
        <QueryClientProvider client={new QueryClient()}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/restaurants/227018" />} />
                    <Route path="/restaurants/:id" element={<RestaurantPage />} />
                    <Route path="*" element={<ErrorPage errorMessage="404 Not Found" />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
