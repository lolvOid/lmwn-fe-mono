import { getThaiBaht } from '@/utils/formatCurrency';

describe('getThaiBaht', () => {
    it('Should format the value to Thai Baht currency without digits', () => {
        const formattedValue = getThaiBaht(1000);
        expect(formattedValue).toMatchSnapshot();
    });

    it('Should format the value to Thai Baht currency with specified digits', () => {
        const formattedValue = getThaiBaht(12345.678, 2);
        expect(formattedValue).toMatchSnapshot();
    });

    it('Should be string input for value', () => {
        const formattedValue = getThaiBaht('5000');
        expect(formattedValue).toMatchSnapshot();
    });

    it('Should be invalid input', () => {
        const formattedValue = getThaiBaht('invalid');
        expect(formattedValue).toMatchSnapshot();
    });

    it('Should be undefined digit', () => {
        const formattedValue = getThaiBaht(9876.54321);
        expect(formattedValue).toMatchSnapshot();
    });
});
