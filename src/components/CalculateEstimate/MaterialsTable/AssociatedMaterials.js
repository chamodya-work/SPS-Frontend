import React from "react";

const AssociatedMaterials = ({ materials, markers }) => {
  const computeQty = (material) => {
    const markersArr = Array.isArray(markers) ? markers : [];

    const mainCount = markersArr.filter((mk) => String(mk.nodeId) === String(material.code)).length;
    if (mainCount > 0) return mainCount;

    let qty = 0;
    for (const mk of markersArr) {
      if (mk.relatedData && Array.isArray(mk.relatedData)) {
        for (const item of mk.relatedData) {
          const relatedCode =
            item.id?.lineSectionTypeId ||
            (mk.nodeId ? `${mk.nodeId}_${item.id?.resCd}` : item.id?.resCd) ||
            item.id?.resCd;
          if (
            String(relatedCode) === String(material.code) ||
            (material && (item.id?.resCd != null) && String(item.id?.resCd) === String(material.resCd))
          ) {
            const add = item.estimateQty != null ? Number(item.estimateQty) : 1;
            qty += add;
          }
        }
      }
    }
    return qty;
  };

  return (
    <div
      style={{
        flex: "0 0 auto",
        paddingTop: "4px",
        paddingBottom: "4px",
        display: "flex",
        flexDirection: "column",
        height: "180px",
      }}
    >
      <div style={{ flex: "1 1 auto", overflowY: "auto", background: "#f8fafc" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "0.85rem",
          }}
        >
          <thead>
            <tr>
              <th>Code</th>
              <th>Description</th>
              <th>Qty</th>
            </tr>
          </thead>
          <tbody>
            {
              // Only show materials that correspond to a dragged marker (main items)
              (() => {
                const filtered = (materials || []).filter((m) =>
                  Array.isArray(markers) && markers.some((mk) => String(mk.nodeId) === String(m.code))
                );
                if (!filtered || filtered.length === 0) {
                  return (
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center", padding: "20px 8px", color: "#6b7280" }}>
                        No icon Drop Yet, please drop icon onto map
                      </td>
                    </tr>
                  );
                }
                return filtered.map((m, i) => (
                  <tr key={i} style={{ verticalAlign: "middle" }}>
                    <td style={{ width: 90, textAlign: "center" }}>
                      <div style={{ display: "inline-block", padding: "4px 8px", background: "#eef2ff", border: "1px solid #dbeafe", borderRadius: 6, fontSize: 12 }}>{m.code}</div>
                    </td>
                    <td>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, padding: "6px 8px", borderRadius: 6, background: "#f8fafc" }}>
                        <span className="tree-label" style={{ textAlign: "center", display: "block" }}>{m.description}</span>
                      </div>
                    </td>
                    <td style={{ width: 60, textAlign: "center", fontWeight: 600 }}>{computeQty(m) || 0}</td>
                  </tr>
                ));
              })()
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssociatedMaterials;