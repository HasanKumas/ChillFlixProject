import { add, subtract, multiply, divide } from './math.helpers';

fdescribe('math helpers', () => {
  describe('add', () => {
    it('should add two numbers correctly', () => {
      expect(add(3, 5)).toBe(8);
    });
  });
  describe('subtract', () => {
    it('should subtract two numbers correctly', () => {
      expect(subtract(13, 4)).toBe(9);
    });
  });
  describe('multiply', () => {
    it('should multiply two numbers correctly', () => {
      expect(multiply(4, 5)).toBe(20);
    });
  });
  describe('division', () => {
    it('should divide two numbers correctly', () => {
      expect(divide(24, 6)).toBe(4);
    });
  });
});

