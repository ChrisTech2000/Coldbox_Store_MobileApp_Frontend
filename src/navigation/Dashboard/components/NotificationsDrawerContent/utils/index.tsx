import { useEffect, useState } from 'react';

import ColdtivateService from '#services/ColdtivateService';
import { GetMovementsHistoryResponse } from '#types/api.responses';

type Movement = GetMovementsHistoryResponse[number];

export function useMovementsByCoolingUnit(coolingUnitIds: number[]) {
  const [movementsMap, setMovementsMap] = useState<Map<number, Movement[]>>(new Map());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMovements = async () => {
      setLoading(true);
      setError(null);
      const newMovementsMap = new Map<number, Movement[]>();

      try {
        await Promise.all(
          coolingUnitIds.map(async (id) => {
            try {
              const movements = await ColdtivateService.getMovementsHistory({
                coolingUnit: id,
              });
              newMovementsMap.set(id, movements);
            } catch (e) {
              console.error(`Error fetching movements for cooling unit ${id}:`, e);
            }
          })
        );
        setMovementsMap(newMovementsMap);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };

    if (coolingUnitIds.length > 0) {
      fetchMovements();
    }
  }, [coolingUnitIds]);

  return { movementsMap, loading, error };
}
