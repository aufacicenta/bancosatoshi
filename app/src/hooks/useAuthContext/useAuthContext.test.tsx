import { renderHook } from 'tests';

import { useAuthContext } from './useAuthContext';

describe('useAuthContext', () => {
  it('returns a value', async () => {
    const { result } = renderHook(() => useAuthContext());

    expect(result.current).toEqual('1');
  });
});
