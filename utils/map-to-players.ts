import { Player } from "@/models/player";
import { z } from "zod";

const RawPlayerDataItemValidator = z.object({
  age: z.number().nullable().optional(),
  birth_date: z.string().date().nullable().optional(),
  first_name: z.string(),
  height: z.string().nullable().optional(),
  image_url: z.string().nullable(),
  last_name: z.string(),
  number: z.number().nullable().optional(),
  player_id: z.string(),
  position: z.string().nullable().optional(),
});

const RawPlayersDataValidator = z.array(RawPlayerDataItemValidator);

export const mapToPlayer = (data: unknown): Player | null => {
  const validationResult = RawPlayerDataItemValidator.safeParse(data);

  if (!validationResult.success) {
    return null;
  }

  const item = validationResult.data;

  return {
    age: item.age ?? undefined,
    birthDate: item.birth_date ? new Date(item.birth_date) : undefined,
    fullName: `${item.first_name} ${item.last_name}`,
    height: item.height ?? undefined,
    imageUrl: item.image_url,
    number: item.number ?? undefined,
    playerId: item.player_id,
    position: item.position ?? undefined,
  };
};

/**
 * Returns null if given unexpected data structure.
 */
export const mapToPlayers = (data: unknown): Player[] | null => {
  const validationResult = RawPlayersDataValidator.safeParse(data);

  if (!validationResult.success) {
    return null;
  }

  return validationResult.data.map(mapToPlayer).filter((item) => item !== null);
};
