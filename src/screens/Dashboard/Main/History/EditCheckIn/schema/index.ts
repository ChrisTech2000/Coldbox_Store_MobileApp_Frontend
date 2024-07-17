import { z } from 'zod';

export type Schema = {
  produces: Array<{
    id: number;
    crop: string;
    plannedDays?: string;
  }>;
};

export const EditCheckInSchema = () =>
  z.object({
    produces: z
      .object({
        id: z.number(),
        crop: z.string(),
        plannedDays: z.string().nullable(),
      })
      .array(),
  });
