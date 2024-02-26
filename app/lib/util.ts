import { useSearchParams } from 'next/navigation';

export async function useQueryParam(): Promise<string>{
  const searchParams = useSearchParams();
  const paramValue = searchParams.get('participant') || '';

  return paramValue;
}