import { render, screen } from '@testing-library/react';
import ItemCardLayout from '@/components/layouts/ItemCardLayout';
import renderer from 'react-test-renderer';

describe('ItemCardLayout', () => {
    it('Render children properly', () => {
        render(
            <ItemCardLayout>
                <div>Div Component 1</div>
                <div>Div Component 2</div>
            </ItemCardLayout>,
        );

        expect(screen.getByText('Div Component 1')).toBeInTheDocument();
        expect(screen.getByText('Div Component 2')).toBeInTheDocument();
    });

    it('Apply styles correctly', () => {
        render(
            <ItemCardLayout>
                <div>Div Component 1</div>
            </ItemCardLayout>,
        );

        const layout = screen.getByText('Div Component 1').closest('.relative');
        const container = screen.getByText('Div Component 1').closest('.flex');

        expect(layout).toHaveClass(
            'h-[600px] overflow-y-auto max-w-[600px] py-8 bg-white lg:min-w-[200px] min-w-full mt-0 mx-auto my-0 z-50',
        );
        expect(container).toHaveClass('flex justify-center items-start');
    });

    it('Should render with different number of columns on lg screens', () => {
        render(
            <ItemCardLayout>
                <div>Div Component 1</div>
                <div>Div Component 2</div>
                <div>Div Component 3</div>
            </ItemCardLayout>,
        );

        const grid = screen.getByText('Div Component 1').closest('.grid');

        expect(grid).toHaveClass('grid-cols-2 lg:grid-cols-2 gap-4 py-2');
    });

    it('Should render and match the default snapshot', () => {
        const layout = renderer
            .create(
                <ItemCardLayout>
                    <div>Div Component 1</div>
                </ItemCardLayout>,
            )
            .toJSON();

        expect(layout).toMatchSnapshot();
    });
});
