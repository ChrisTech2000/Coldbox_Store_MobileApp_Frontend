import { z } from 'zod';

export type Schema = {
  produces: Array<{
    id: number;
    cropId: number;
    plannedDays?: string;
  }>;
};

export const EditCheckInSchema = () =>
  z.object({
    produces: z
      .object({
        id: z.number().positive(),
        cropId: z.number().positive(),
        plannedDays: z.string().nullable(),
      })
      .array(),
  });
