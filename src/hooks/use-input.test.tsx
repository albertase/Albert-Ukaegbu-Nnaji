import { renderHook, act } from '@testing-library/react';
import useInput from './use-input';

describe('useInput', () => {
  it('should return the expected initial state', () => {
    const { result } = renderHook(() => useInput((value: string) => value.trim() !== ''));

    expect(result.current.value).toBe('');
    expect(result.current.isValid).toBe(false);
    expect(result.current.hasError).toBe(false);
  });

  it('should update the entered value and validity on change', () => {
    const { result } = renderHook(() => useInput((value: string) => value.trim() !== ''));

    act(() => {
      result.current.valueChangeHandler({ target: { value: '   ' } } as any);
    });

    expect(result.current.value).toBe('   ');
    expect(result.current.isValid).toBe(false);
    expect(result.current.hasError).toBe(false);

    act(() => {
      result.current.valueChangeHandler({ target: { value: 'test' } } as any);
    });

    expect(result.current.value).toBe('test');
    expect(result.current.isValid).toBe(true);
    expect(result.current.hasError).toBe(false);
  });

  it('should set isTouched to true on blur', () => {
    const { result } = renderHook(() => useInput((value: string) => value.trim() !== ''));

    act(() => {
      result.current.inputBlurHandler({} as any);
    });

    expect(result.current.hasError).toBe(false);
    expect(result.current).toBe(true);
  });

  it('should reset the state', () => {
    const { result } = renderHook(() => useInput((value: string) => value.trim() !== ''));

    act(() => {
      result.current.valueChangeHandler({ target: { value: 'test' } } as any);
      result.current.inputBlurHandler({} as any);
      result.current.reset();
    });

    expect(result.current.value).toBe('');
    expect(result.current.isValid).toBe(false);
    expect(result.current.hasError).toBe(false);
    expect(result.current).toBe(false);
  });
});