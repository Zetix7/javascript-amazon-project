import { formatCurrency } from "../../scripts/utils/money.js";

describe('test suite: formatCurrency', () => {
    it('converts cents into dollars', () => {
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    describe('rounding', () => {
        it('round up to the nearest cent', () => {
            expect(formatCurrency(2005.5)).toEqual('20.06');
        });
        
        it('round down to the nearest cent', () => {
            expect(formatCurrency(2005.4)).toEqual('20.05');
        });
    });
});