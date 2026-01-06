import * as React from "react";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MastersModal = ({
  open,
  onClose,
  items = [],
  nodeId = null,
  nodeDept = null,
}) => {
  const [rows, setRows] = React.useState(items || []);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    if (!open) {
      setRows(items || []);
      setError(null);
      setLoading(false);
      return;
    }
    let cancelled = false;
    const load = async () => {
      setError(null);
      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/api/spPeggingDmt`);
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);

        const contentType = res.headers.get("content-type") || "";
        let data;
        if (contentType.includes("application/json")) {
          data = await res.json();
        } else {
          const text = await res.text();
          throw new Error(
            `Expected JSON but received ${
              contentType || "text"
            }. Response preview: ${text.slice(0, 300)}`
          );
        }
        // data expected to be array
        const arr = Array.isArray(data) ? data : data?.data ?? [];
        const filtered = arr.filter((it) => {
          if (nodeId && String(it?.id?.lineSectionTypeId) !== String(nodeId))
            return false;
          if (nodeDept && String(it?.id?.deptId) !== String(nodeDept))
            return false;
          return true;
        });
        if (!cancelled) setRows(filtered);
      } catch (err) {
        const msg = err?.message ?? String(err);
        if (!cancelled) setError(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [open, nodeId, nodeDept, items]);
  if (!open) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-panel">
        <div className="modal-header">
          <h3 style={{ margin: 0 }}>Masters</h3>
          <button className="app-btn app-btn--primary" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal-body">
          {error && (
            <div style={{ color: "#b91c1c", marginBottom: 8 }}>{error}</div>
          )}
          <div className="table-wrapper">
            <table className="masters-table">
              <thead>
                <tr>
                  <th>Res Type</th>
                  <th>Res CD</th>
                  <th>Res Name</th>
                  <th style={{ textAlign: "right" }}>Estimated Quantity</th>
                  <th>UOM</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center" }}>
                      Loading...
                    </td>
                  </tr>
                ) : rows && rows.length ? (
                  rows.map((it, i) => {
                    const resType = it.resType || it.type || "";
                    const resCd = it?.id?.resCd || it.resCd || it.code || "";
                    const resName =
                      it.resName || it.resName || it.description || "";
                    const qty =
                      it.estimateQty != null
                        ? Number(it.estimateQty)
                        : it.estimateQtyOld != null
                        ? Number(it.estimateQtyOld)
                        : 0;
                    const uom = it.uom || it.UOM || "";

                    return (
                      <tr key={i}>
                        <td>{resType}</td>
                        <td>{resCd}</td>
                        <td>{resName}</td>
                        <td style={{ textAlign: "right" }}>{qty}</td>
                        <td>{uom}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: "center" }}>
                      No data
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MastersModal;