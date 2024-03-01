import { getDiscountedPrice } from '@/utils/helper';

describe('getDiscountedPrice', () => {
  it('Should calculate discounted price when both price and discount are positive numbers', () => {
    const discountedPrice = getDiscountedPrice(100, 20);
    expect(discountedPrice).toMatchSnapshot();
  });

  it('Should handle string input for price and discount and calculate discounted price', () => {
    const discountedPrice = getDiscountedPrice('150', '25');
    expect(discountedPrice).toMatchSnapshot();
  });

  it('Should handle zero price and calculate discounted price', () => {
    const discountedPrice = getDiscountedPrice(0, 15);
    expect(discountedPrice).toMatchSnapshot();
  });

  it('Should handle zero discount and return the full price', () => {
    const discountedPrice = getDiscountedPrice(50, 0);
    expect(discountedPrice).toMatchSnapshot();
  });

  it('Should handle negative price and calculate discounted price', () => {
    const discountedPrice = getDiscountedPrice(-80, 10);
    expect(discountedPrice).toMatchSnapshot();
  });

  it('Should handle invalid input and return NaN', () => {
    const discountedPrice = getDiscountedPrice('invalid', 'invalid');
    expect(discountedPrice).toMatchSnapshot();
  });
});
