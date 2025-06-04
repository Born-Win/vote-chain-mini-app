import { Prisma } from '@prisma/client';

import { SortOrder } from '@common/sorting/sort-order.enum';

export type ModelScalarFieldEnumMap = {
  UserGadgetToken: Prisma.UserGadgetTokenScalarFieldEnum;
};

type ModelNames = keyof ModelScalarFieldEnumMap;

export interface ISorting<T extends ModelNames> {
  sortBy: ModelScalarFieldEnumMap[T];
  sortOrder: SortOrder;
}
