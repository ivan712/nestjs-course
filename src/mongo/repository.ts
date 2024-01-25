import { Model } from 'mongoose';

export enum SortDirection {
  asc = 'asc',
  desc = 'desc',
}

export interface IPagination {
  dataQuery: any;
  page: number;
  pageSize: number;
  sortBy?: string;
  sortDirection?: SortDirection;
}

export abstract class MongoRepository<T> {
  constructor(protected model: Model<T>) {}

  protected async pagination({
    dataQuery,
    page,
    pageSize,
    sortBy,
    sortDirection,
  }: IPagination): Promise<{
    data: any;
    page: number;
    totalPages: number;
  }> {
    const offset = (page - 1) * pageSize;

    const countQuery = dataQuery.clone();

    if (sortBy && sortDirection) {
      const sortObj = {};
      sortObj[sortBy] = sortDirection;
      dataQuery = dataQuery.sort(sortObj);
    }

    const [docsAmount, data] = await Promise.all([
      countQuery.count(),
      dataQuery.skip(offset).limit(pageSize).exec(),
    ]);

    const totalPages = Math.ceil(docsAmount / pageSize);

    return { data, page, totalPages };
  }
}
