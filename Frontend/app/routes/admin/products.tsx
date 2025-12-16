import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../state/products";

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    stock: "",
  });
  const navigate = useNavigate();

  function startEdit(pId: string) {
    const p = products.find((x) => x.id === pId);
    if (!p) return;
    setEditing(pId);
    setForm({
      name: p.name,
      price: String(p.price),
      description: p.description || "",
      image: p.image || "",
      stock: String(p.stock ?? 0),
    });
  }

  function submit() {
    const payload = {
      name: form.name,
      price: Number(form.price),
      description: form.description,
      image: form.image,
      stock: Number(form.stock),
    };
    if (editing) {
      updateProduct(editing, payload);
      setEditing(null);
    } else {
      const newP = addProduct(payload);
      navigate(`/admin/products`);
    }
    setForm({ name: "", price: "", description: "", image: "", stock: "" });
  }

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Admin - Products</h1>

      <section className="mb-6">
        <h2 className="font-medium mb-2">Add / Edit Product</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <input
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            placeholder="Name"
            className="border p-2"
          />
          <input
            value={form.price}
            onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
            placeholder="Price"
            className="border p-2"
          />
          <input
            value={form.image}
            onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))}
            placeholder="Image URL"
            className="border p-2 md:col-span-2"
          />
          <input
            value={form.stock}
            onChange={(e) => setForm((s) => ({ ...s, stock: e.target.value }))}
            placeholder="Stock"
            className="border p-2"
          />
          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((s) => ({ ...s, description: e.target.value }))
            }
            placeholder="Description"
            className="border p-2 md:col-span-2"
          />
        </div>
        <div className="mt-2">
          <button
            onClick={submit}
            className="px-3 py-1 bg-green-600 text-white rounded-md mr-2"
          >
            {editing ? "Save" : "Add"}
          </button>
          {editing && (
            <button
              onClick={() => {
                setEditing(null);
                setForm({
                  name: "",
                  price: "",
                  description: "",
                  image: "",
                  stock: "",
                });
              }}
              className="px-3 py-1 bg-gray-300 rounded-md"
            >
              Cancel
            </button>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-medium mb-2">Product List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="border rounded p-3 flex items-start gap-4"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-28 h-20 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-gray-600">
                  ${p.price} • Stock: {p.stock}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => startEdit(p.id)}
                  className="px-2 py-1 bg-yellow-400 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProduct(p.id)}
                  className="px-2 py-1 bg-red-600 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
