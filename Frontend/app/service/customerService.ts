import { useGraphQLCustomers } from "../api/graphql/hooks";

export class CustomerService {
  // Lấy danh sách khách hàng với phân trang
  static useCustomers(page?: number, size?: number) {
    const { customers, loading, error, refetch, fetchMore } =
      useGraphQLCustomers(page, size);
    return {
      customers: customers || {
        content: [],
        totalElements: 0,
        totalPages: 0,
        pageNumber: 0,
        pageSize: 0,
      },
      loading,
      error,
      refetch,
      fetchMore,
    };
  }
}
