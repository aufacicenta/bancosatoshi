import { renderHook } from 'tests';

import { useCheckoutContext } from './useCheckoutContext';

describe('useCheckoutContext', () => {
  it('returns a value', async () => {
    const { result } = renderHook(() => useCheckoutContext());

    expect(result.current).toEqual('1');
  });
});
