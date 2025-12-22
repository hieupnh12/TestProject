import { useMutation, useQuery } from "@apollo/client/react";

import {
  LOGIN_MUTATION,
  SIGNUP_MUTATION,
  LOGOUT_MUTATION,
  GET_CURRENT_USER_QUERY,
  GET_PRODUCTS_QUERY,
  GET_PRODUCT_BY_ID_QUERY,
  GET_CUSTOMERS_QUERY,
  GET_CUSTOMER_BY_ID_QUERY,
  CREATE_CUSTOMER_MUTATION,
  UPDATE_CUSTOMER_MUTATION,
  DELETE_CUSTOMER_MUTATION,
  type LoginMutationResponse,
  type LoginMutationVariables,
  type SignupMutationResponse,
  type SignupMutationVariables,
  type LogoutMutationResponse,
  type CurrentUserQueryResponse,
  type GetProductsQueryResponse,
  type GetProductsQueryVariables,
  type GetProductByIdQueryResponse,
  type GetProductByIdQueryVariables,
  type GetCustomersQueryResponse,
  type GetCustomersQueryVariables,
  type GetCustomerByIdQueryResponse,
  type GetCustomerByIdQueryVariables,
  type CreateCustomerMutationResponse,
  type CreateCustomerMutationVariables,
  type UpdateCustomerMutationResponse,
  type UpdateCustomerMutationVariables,
  type DeleteCustomerMutationResponse,
  type DeleteCustomerMutationVariables,
} from "./operations";

// ============ Auth Hooks ============

export const useGraphQLLogin = () => {
  const [login, { loading, error, data }] = useMutation<
    LoginMutationResponse,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted: (response: LoginMutationResponse) => {
      const { token, user } = response.login;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
  });

  return {
    login: (email: string, password: string) =>
      login({ variables: { email, password } }),
    loading,
    error,
    data,
  };
};

export const useGraphQLSignup = () => {
  const [signup, { loading, error, data }] = useMutation<
    SignupMutationResponse,
    SignupMutationVariables
  >(SIGNUP_MUTATION);

  return {
    signup: (fullName: string, email: string, password: string) =>
      signup({ variables: { fullName, email, password } }),
    loading,
    error,
    data,
  };
};

export const useGraphQLLogout = () => {
  const [logout, { loading, error }] = useMutation<LogoutMutationResponse>(
    LOGOUT_MUTATION,
    {
      onCompleted: () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      },
    }
  );

  return {
    logout,
    loading,
    error,
  };
};

export const useGraphQLCurrentUser = () => {
  const { data, loading, error, refetch } = useQuery<CurrentUserQueryResponse>(
    GET_CURRENT_USER_QUERY
  );

  return {
    user: data?.currentUser,
    loading,
    error,
    refetch,
  };
};

// ============ Product Hooks ============

export const useGraphQLProducts = (limit?: number, offset?: number) => {
  const { data, loading, error, refetch, fetchMore } = useQuery<
    GetProductsQueryResponse,
    GetProductsQueryVariables
  >(GET_PRODUCTS_QUERY, {
    variables: { limit, offset },
  });

  return {
    products: data?.products,
    loading,
    error,
    refetch,
    fetchMore,
  };
};

export const useGraphQLProductById = (id: string) => {
  const { data, loading, error, refetch } = useQuery<
    GetProductByIdQueryResponse,
    GetProductByIdQueryVariables
  >(GET_PRODUCT_BY_ID_QUERY, {
    variables: { id },
    skip: !id,
  });

  return {
    product: data?.product,
    loading,
    error,
    refetch,
  };
};
// ============ Customer Hooks ============

export const useGraphQLCustomers = (page?: number, size?: number) => {
  const { data, loading, error, refetch, fetchMore } = useQuery<
    GetCustomersQueryResponse,
    GetCustomersQueryVariables
  >(GET_CUSTOMERS_QUERY, {
    variables: { page, size },
  });

  return {
    customers: data?.customers,
    loading,
    error,
    refetch,
    fetchMore,
  };
};

export const useGraphQLCustomerById = (customerId: string) => {
  const { data, loading, error, refetch } = useQuery<
    GetCustomerByIdQueryResponse,
    GetCustomerByIdQueryVariables
  >(GET_CUSTOMER_BY_ID_QUERY, {
    variables: { customerId },
    skip: !customerId,
  });

  return {
    customer: data?.customerById,
    loading,
    error,
    refetch,
  };
};

export const useGraphQLCreateCustomer = () => {
  const [createCustomer, { loading, error, data }] = useMutation<
    CreateCustomerMutationResponse,
    CreateCustomerMutationVariables
  >(CREATE_CUSTOMER_MUTATION, {
    refetchQueries: [{ query: GET_CUSTOMERS_QUERY }],
  });

  return {
    createCustomer: (
      fullName: string,
      phoneNumber: string,
      email: string,
      gender?: boolean,
      birthDate?: string,
      address?: string
    ) =>
      createCustomer({
        variables: {
          input: { fullName, phoneNumber, email, gender, birthDate, address },
        },
      }),
    loading,
    error,
    data,
  };
};

export const useGraphQLUpdateCustomer = () => {
  const [updateCustomer, { loading, error, data }] = useMutation<
    UpdateCustomerMutationResponse,
    UpdateCustomerMutationVariables
  >(UPDATE_CUSTOMER_MUTATION, {
    refetchQueries: [{ query: GET_CUSTOMERS_QUERY }],
  });

  return {
    updateCustomer: (
      customerId: string,
      fullName: string,
      phoneNumber: string,
      email: string,
      gender?: boolean,
      isActive?: boolean,
      birthDate?: string,
      address?: string
    ) =>
      updateCustomer({
        variables: {
          customerId,
          input: {
            fullName,
            phoneNumber,
            email,
            gender,
            isActive,
            birthDate,
            address,
          },
        },
      }),
    loading,
    error,
    data,
  };
};

export const useGraphQLDeleteCustomer = () => {
  const [deleteCustomer, { loading, error, data }] = useMutation<
    DeleteCustomerMutationResponse,
    DeleteCustomerMutationVariables
  >(DELETE_CUSTOMER_MUTATION, {
    refetchQueries: [{ query: GET_CUSTOMERS_QUERY }],
  });

  return {
    deleteCustomer: (customerId: string) =>
      deleteCustomer({
        variables: { customerId },
      }),
    loading,
    error,
    data,
  };
};
