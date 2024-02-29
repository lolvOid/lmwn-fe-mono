import { render, screen } from '@testing-library/react';
import ErrorPage from '@/pages/ErrorPage';

describe('ErrorPage', () => {
    it('Render the correct title and error message', () => {
        const errorMessage = 'An unexpected error occurred.';
        render(<ErrorPage errorMessage={errorMessage} />);

        expect(screen.getByText('Oops!')).toBeInTheDocument();
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('Render a different message for a specific error code', () => {
        const errorMessage = '404: Page not found';
        render(<ErrorPage errorMessage={errorMessage} />);
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });

    it('Render a default message for an unknown error status', () => {
        const unknownErrorMessage = 'An unknown error occurred.';
        const { rerender } = render(<ErrorPage status={500} errorMessage={unknownErrorMessage} />);
        rerender(<ErrorPage status={999} errorMessage={unknownErrorMessage} />);

        expect(screen.getByText('Oops!')).toBeInTheDocument();
        expect(screen.getByText(unknownErrorMessage)).toBeInTheDocument();
    });

    it('Render a custom message for a specific error status', () => {
        const customErrorMessage = 'Custom error message for status 403';
        render(<ErrorPage status={403} errorMessage={customErrorMessage} />);
        expect(screen.getByText(customErrorMessage)).toBeInTheDocument();
    });
});
