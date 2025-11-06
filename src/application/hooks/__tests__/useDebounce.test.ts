import { renderHook, act } from '@testing-library/react-native';
import { useDebounce } from '../useDebounce';

describe('useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it('should return initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300));
    expect(result.current).toBe('initial');
  });

  it('should not update value before delay expires', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    expect(result.current).toBe('initial');

    act(() => {
      rerender({ value: 'updated', delay: 300 });
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(299);
    });
    expect(result.current).toBe('initial');
  });

  it('should update value after delay expires', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    act(() => {
      rerender({ value: 'updated', delay: 300 });
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('updated');
  });

  it('should reset timer on rapid changes', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    act(() => {
      rerender({ value: 'first', delay: 300 });
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      rerender({ value: 'second', delay: 300 });
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    act(() => {
      rerender({ value: 'third', delay: 300 });
    });
    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('third');
  });

  it('should handle different delay values', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 500 },
    });

    act(() => {
      rerender({ value: 'updated', delay: 500 });
    });

    act(() => {
      jest.advanceTimersByTime(499);
    });
    expect(result.current).toBe('initial');

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.current).toBe('updated');
  });

  it('should handle multiple sequential updates', () => {
    const { result, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    act(() => {
      rerender({ value: 'first', delay: 300 });
    });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('first');

    act(() => {
      rerender({ value: 'second', delay: 300 });
    });
    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('second');
  });

  it('should cleanup timer on unmount', () => {
    const { unmount, rerender } = renderHook(({ value, delay }) => useDebounce(value, delay), {
      initialProps: { value: 'initial', delay: 300 },
    });

    act(() => {
      rerender({ value: 'updated', delay: 300 });
      unmount();
      jest.advanceTimersByTime(300);
    });
  });
});
