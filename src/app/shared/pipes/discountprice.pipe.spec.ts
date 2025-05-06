import { DiscountPricePipe } from './discountprice.pipe';

describe('DiscountPricePipe', () => {
  let pipe: DiscountPricePipe;

  beforeEach(() => {
    pipe = new DiscountPricePipe();
  });

  it('should calculate discounted price correctly', () => {
    expect(pipe.transform(100, 10)).toBe(90);     
    expect(pipe.transform(200, 25)).toBe(150);    
    expect(pipe.transform(50, 0)).toBe(50);       
  });

  it('should handle 100% discount', () => {
    expect(pipe.transform(80, 100)).toBe(0);
  });

  it('should handle invalid discounts gracefully', () => {
    expect(pipe.transform(100, -10)).toBe(110);   
    expect(pipe.transform(100, 200)).toBe(-100);  
  });
});
