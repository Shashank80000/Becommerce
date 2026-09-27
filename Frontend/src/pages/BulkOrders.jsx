import Button from "../components/common/Button";
export default function BulkOrders() {
  return (
    <section className="page container centered-page">
      <p className="eyebrow">Bulk orders</p>
      <h1>
        More volume.
        <br />
        <em>Less admin.</em>
      </h1>
      <p className="lead">
        From pallet quantities to standing orders, we make large-scale buying
        clear, predictable, and easy to repeat.
      </p>
      <Button to="/request-quote">Start a bulk order</Button>
      <div className="stats">
        <div>
          <strong>24h</strong>
          <span>Typical quote turnaround</span>
        </div>
        <div>
          <strong>1 partner</strong>
          <span>For your recurring needs</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>Clear, upfront pricing</span>
        </div>
      </div>
    </section>
  );
}
