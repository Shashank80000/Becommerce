import { Link } from "react-router-dom";
import { Pencil, Trash2, ExternalLink } from "lucide-react";
import { useState } from "react";
import { getProducts, removeProduct } from "../../utils/storage";
export default function AdminProducts() {
  const [products, setProducts] = useState(getProducts());
  const del = (id) => {
    if (window.confirm("Delete this product?")) setProducts(removeProduct(id));
  };
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <p className="eyebrow">Catalogue management</p>
          <h1>Products</h1>
        </div>
        <Link className="button button-dark" to="/admin/products/add">
          Add Product +
        </Link>
      </div>
      <section className="admin-panel">
        <div className="admin-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Application</th>
                <th>Pack Size</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="table-product">
                    <img
                      src={product.image}
                      alt=""
                      width="40"
                      height="32"
                      loading="lazy"
                      decoding="async"
                    />
                    <span>{product.name}</span>
                  </td>
                  <td>{product.category}</td>
                  <td>{product.application}</td>
                  <td>{product.sizes.join(", ")}</td>
                  <td>
                    <span className="status status-active">
                      {product.status || "Active"}
                    </span>
                  </td>
                  <td className="actions">
                    <Link to={`/product/${product.slug}`} title="View">
                      <ExternalLink size={16} />
                    </Link>
                    <Link
                      to={`/admin/products/edit/${product.id}`}
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </Link>
                    <button onClick={() => del(product.id)} title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
