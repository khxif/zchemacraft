import { useQuery } from '@tanstack/react-query';
import { useBaseLayoutStore } from '@zchemacraft/stores/base-layout-store';

export function useInitApp() {
  const initApp = useBaseLayoutStore(state => state.initApp);

  useQuery({
    queryKey: ['initApp'],
    queryFn: initApp,
  });
}
