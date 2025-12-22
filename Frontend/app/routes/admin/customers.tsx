import React, { useState } from "react";
import {
  useGraphQLCustomers,
  useGraphQLCreateCustomer,
  useGraphQLUpdateCustomer,
  useGraphQLDeleteCustomer,
} from "../../api/graphql/hooks";
import type { Customer } from "../../api/graphql/operations";

const STATUS_COLORS = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-red-100 text-red-800",
};

const GENDER_DISPLAY = {
  true: "Nam",
  false: "Nữ",
};

export default function AdminCustomers() {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 7;
  const { customers, loading, error, refetch } = useGraphQLCustomers(
    currentPage,
    pageSize
  );
  const { createCustomer, loading: createLoading } = useGraphQLCreateCustomer();
  const { updateCustomer, loading: updateLoading } = useGraphQLUpdateCustomer();
  const { deleteCustomer, loading: deleteLoading } = useGraphQLDeleteCustomer();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCustomerId, setEditingCustomerId] = useState<string | null>(
    null
  );
  const [form, setForm] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    gender: true,
    birthDate: "",
    address: "",
  });
  console.log("Customers data:", customers);
  const resetForm = () => {
    setForm({
      fullName: "",
      phoneNumber: "",
      email: "",
      gender: true,
      birthDate: "",
      address: "",
    });
    setEditingCustomerId(null);
  };

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const startEdit = (customer: Customer) => {
    setEditingCustomerId(customer.customerId);
    setForm({
      fullName: customer.fullName || "",
      phoneNumber: customer.phoneNumber || "",
      email: customer.email || "",
      gender: customer.gender ?? true,
      birthDate: customer.birthDate || "",
      address: customer.address || "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCustomerId) {
        await updateCustomer(
          editingCustomerId,
          form.fullName,
          form.phoneNumber,
          form.email,
          form.gender,
          true,
          form.birthDate,
          form.address
        );
      } else {
        await createCustomer(
          form.fullName,
          form.phoneNumber,
          form.email,
          form.gender,
          form.birthDate,
          form.address
        );
      }
      closeModal();
      refetch();
    } catch (err) {
      console.error("Error saving customer:", err);
    }
  };

  const handleDelete = async (customerId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      try {
        await deleteCustomer(customerId);
        refetch();
      } catch (err) {
        console.error("Error deleting customer:", err);
      }
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (customers && currentPage < customers.totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (loading) return <div className="container mx-auto p-4">Đang tải...</div>;
  if (error)
    return (
      <div className="container mx-auto p-4 text-red-500">
        Lỗi: {error.message}
      </div>
    );

  const data = customers?.content || [];
  const totalPages = customers?.totalPages || 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Khách Hàng</h1>
          <button
            onClick={openModal}
            className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            + Thêm Khách Hàng
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-6 flex gap-4">
          <input
            type="text"
            placeholder="Tìm kiếm khách hàng..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="px-6 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
            🔍 Lọc
          </button>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    <input type="checkbox" className="w-4 h-4 rounded" />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    HỌ TÊN
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    SĐT
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    EMAIL
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    GIỚI TÍNH
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    NGÀY SINH
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    ĐỊA CHỈ
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    TRẠNG THÁI
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                    HÀNH ĐỘNG
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.length === 0 ? (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      Không có dữ liệu
                    </td>
                  </tr>
                ) : (
                  data.map((customer) => (
                    <tr
                      key={customer.customerId}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input type="checkbox" className="w-4 h-4 rounded" />
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800 font-medium">
                        {customer.fullName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {customer.phoneNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {customer.email}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {customer.gender !== undefined
                          ? GENDER_DISPLAY[customer.gender ? "true" : "false"]
                          : "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {customer.birthDate || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {customer.address || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                            customer.isActive
                              ? STATUS_COLORS.active
                              : STATUS_COLORS.inactive
                          }`}
                        >
                          {customer.isActive ? "Active" : "Disable"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => startEdit(customer)}
                            className="text-blue-600 hover:text-blue-900 font-medium"
                          >
                            ✏️ Sửa
                          </button>
                          <button
                            onClick={() => handleDelete(customer.customerId)}
                            className="text-red-600 hover:text-red-900 font-medium"
                            disabled={deleteLoading}
                          >
                            🗑️ Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center px-6 py-4 border-t border-gray-200 bg-gray-50">
            <span className="text-sm text-gray-600">
              Hiển thị {data.length > 0 ? currentPage * pageSize + 1 : 0} đến{" "}
              {Math.min(
                (currentPage + 1) * pageSize,
                customers?.totalElements || 0
              )}{" "}
              trong {customers?.totalElements || 0} mục
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentPage === 0}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                ←
              </button>
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = currentPage + i;
                if (pageNum >= totalPages) return null;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded ${
                      currentPage === pageNum
                        ? "bg-teal-500 text-white font-medium"
                        : "border border-gray-300 text-gray-700 hover:bg-gray-100"
                    } transition-colors`}
                  >
                    {pageNum + 1}
                  </button>
                );
              })}
              <button
                onClick={handleNext}
                disabled={currentPage >= totalPages - 1}
                className="px-3 py-1 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-800">
                {editingCustomerId
                  ? "Cập Nhật Khách Hàng"
                  : "Thêm Khách Hàng Mới"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 font-bold text-xl"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Họ Tên *
                </label>
                <input
                  type="text"
                  required
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập họ tên"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Số Điện Thoại *
                </label>
                <input
                  type="tel"
                  required
                  value={form.phoneNumber}
                  onChange={(e) =>
                    setForm({ ...form, phoneNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập SĐT"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giới Tính
                </label>
                <select
                  value={form.gender ? "true" : "false"}
                  onChange={(e) =>
                    setForm({ ...form, gender: e.target.value === "true" })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="true">Nam</option>
                  <option value="false">Nữ</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ngày Sinh
                </label>
                <input
                  type="date"
                  value={form.birthDate}
                  onChange={(e) =>
                    setForm({ ...form, birthDate: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Địa Chỉ
                </label>
                <input
                  type="text"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Nhập địa chỉ"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={createLoading || updateLoading}
                  className="flex-1 px-4 py-2 bg-teal-500 hover:bg-teal-600 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
                >
                  {createLoading || updateLoading ? "Đang lưu..." : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
