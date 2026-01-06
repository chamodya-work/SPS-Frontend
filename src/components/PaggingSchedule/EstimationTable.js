// components/PaggingSchedule/EstimationTable.js
import React, { useState, useEffect, useCallback } from "react";

// Get API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Helper function
const extractUnitPrice = (item) => {
  if (!item) return 0;
  const candidates = [
    item.unitPrice,
    item.stdRate,
    item.rate,
    item.price,
    item.unit_cost,
    item.unitprice,
    item.unitPriceLkr,
  ];
  for (const c of candidates) {
    if (c != null && !isNaN(Number(c))) return Number(c);
  }
  return 0;
};

const EstimationTable = ({
  materials,
  markers,
  selectedNodeId,
  selectedNodeDept,
  onClosePopup,
}) => {
  const [estimates, setEstimates] = useState([]);
  const [estimateId, setEstimateId] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const onReset = () => {
      setEstimates([]);
      setEstimateId("");
    };
    window.addEventListener("reset-estimates", onReset);
    return () => window.removeEventListener("reset-estimates", onReset);
  }, []);

  const computeEstimateItems = useCallback(
    (srcMaterials, srcMarkers, id = null) => {
      const mats = srcMaterials || materials;
      const marks = srcMarkers || markers;
      const newId = id || estimateId || `EST-${Date.now()}`;
      
      const materialMap = new Map();
      
      (mats || []).forEach((material) => {
        const resCd = (material.resCd || material.code || "").toString().trim();
        const dept = (material.deptId || "4").toString();
        const uniqueKey = `${resCd}_${dept}`;
        
        if (!materialMap.has(uniqueKey)) {
          materialMap.set(uniqueKey, {
            ...material,
            resCd: resCd,
            deptId: dept,
            qty: 0,
            tot: 0
          });
        }
      });

      if (Array.isArray(marks)) {
        marks.forEach((m) => {
          if (m.relatedData && Array.isArray(m.relatedData)) {
            m.relatedData.forEach((item) => {
              const itemResCd = (item?.id?.resCd ?? item?.resCd ?? "").toString().trim();
              const itemDeptId = (item?.id?.deptId ?? item?.DEPT_ID ?? item?.deptId ?? "4").toString();
              const uniqueKey = `${itemResCd}_${itemDeptId}`;
              const qtyToAdd = item.estimateQty != null ? Number(item.estimateQty) : 1;

              if (materialMap.has(uniqueKey)) {
                const material = materialMap.get(uniqueKey);
                material.qty += qtyToAdd;
                material.tot = (Number(material.unitPrice) || 0) * material.qty;
                return;
              }

              let found = null;
              for (const mat of materialMap.values()) {
                try {
                  const matResCd = (mat.resCd ?? "").toString().trim();
                  const matCode = (mat.code ?? "").toString().trim();
                  const matLsId = (mat.lineSectionTypeId ?? "").toString().trim();

                  if (matResCd && itemResCd && matResCd === itemResCd && String(mat.deptId || "4") === itemDeptId) {
                    found = mat;
                    break;
                  }

                  if (matCode && item?.id?.lineSectionTypeId && String(matCode) === String(item.id.lineSectionTypeId)) {
                    found = mat;
                    break;
                  }

                  if (matLsId && item?.id?.lineSectionTypeId && String(matLsId) === String(item.id.lineSectionTypeId)) {
                    found = mat;
                    break;
                  }

                  if (matCode && itemResCd && matCode === itemResCd) {
                    found = mat;
                    break;
                  }
                } catch (e) {}
              }

              if (found) {
                found.qty = (found.qty || 0) + qtyToAdd;
                found.tot = (Number(found.unitPrice) || 0) * found.qty;
              }
            });
          }
        });
      }

      const items = Array.from(materialMap.values()).map((material) => {
        const up =
          typeof material.unitPrice === "number"
            ? material.unitPrice
            : material.unitPrice && !isNaN(Number(material.unitPrice))
            ? Number(material.unitPrice)
            : 0;

        let description =
          material.description ||
          material.resName ||
          material.res_name ||
          material.RES_NAME ||
          "";

        return {
          estimateId: newId,
          code: material.code,
          description: description,
          resCd: material.resCd || material.code,
          resType: material.resType || "",
          estimateQtyOld:
            material.estimateQtyOld != null
              ? material.estimateQtyOld
              : material.estimateQty != null
              ? material.estimateQty
              : 0,
          tolerance: material.tolerance != null ? material.tolerance : "",
          unitPrice: up,
          qty: material.qty,
          tot: material.tot,
          deptId:
            material.deptId || material.DEPT_ID || material.dept || "4",
          uom: material.uom || material.UOM || "NOS",
          lineSectionTypeId: material.lineSectionTypeId,
        };
      });

      const filtered = items.filter((it) => it.qty > 0);
      if (filtered.length === 0) {
        try {
          console.log('DEBUG: computeEstimateItems produced 0 items', {
            materialMap: Array.from(materialMap.entries()).map(([k,v]) => ({ key:k, resCd:v.resCd, deptId:v.deptId, qty:v.qty, unitPrice:v.unitPrice })),
            matsSample: (mats || []).slice(0,5),
            marksSample: (marks || []).slice(0,5),
          });
        } catch (e) {}
      }
      return filtered;
    },
    [materials, markers, estimateId]
  );

  const handleCreateEstimate = () => {
    if (!markers || markers.length === 0) {
      alert("Please drag icon");
      return;
    }

    if (!materials.length) {
      alert("No materials available to create estimate");
      return;
    }
    const newEstimateId = `EST-${Date.now()}`;
    setEstimateId(newEstimateId);
    const estimateItems = computeEstimateItems(
      materials,
      markers,
      newEstimateId
    );
    setEstimates(estimateItems);
  };

  const handleSaveToDB = async () => {
    if (!estimates.length) {
      alert("No estimates to save. Please create an estimate first.");
      return;
    }

    setSaving(true);
    try {
      const estimateNoToUse = estimateId && estimateId.length > 0 ? estimateId : `EST-${Date.now()}`;

      const headerBody = {
        estimateNo: estimateNoToUse,
        nodeId: estimates[0]?.code || estimates[0]?.resCd || estimates[0]?.description || "UNKNOWN",
        noOfItem: estimates.reduce((s, it) => s + (it.qty || 0), 0),
        nodeDes: estimates[0]?.description || "",
        deptId: estimates[0]?.deptId || "4",
      };

      const headers = { "Content-Type": "application/json" };

      // 1. Save header
      const response = await fetch(`${API_BASE_URL}/api/pegschdmt`, {
        method: "POST",
        headers,
        body: JSON.stringify(headerBody),
      });

      if (!response.ok) {
        const t = await response.text().catch(() => "");
        alert(`Failed to save header: ${response.status} ${response.statusText}\n${t}`);
        return;
      }

      let serverHeader = {};
      try {
        serverHeader = await response.json();
      } catch (e) {
        serverHeader = {};
      }

      const finalEstimateNo = serverHeader?.estimateNo || headerBody.estimateNo || estimateNoToUse;

      try {
        const nowIso = new Date().toISOString();
        const pcesthttBody = {
          id: {
            estimateNo: finalEstimateNo,
            revNo: 0,
            deptId: headerBody.deptId || "4",
          },
          projectNo: headerBody.projectNo || null,
          catCd: headerBody.catCd || null,
          etimateDt: headerBody.etimateDt || nowIso,
          entDt: headerBody.entDt || nowIso,
          entBy:
            headerBody.entBy ||
            sessionStorage.getItem("userId") ||
            (() => {
              try {
                const u = JSON.parse(sessionStorage.getItem("user") || localStorage.getItem("user") || "null");
                return u && u.userId ? u.userId : null;
              } catch (e) {
                return null;
              }
            })(),
          confDt: headerBody.confDt || nowIso,
          aprDt1: headerBody.aprDt1 || nowIso,
          aprDt2: headerBody.aprDt2 || nowIso,
          aprDt3: headerBody.aprDt3 || nowIso,
          aprDt4: headerBody.aprDt4 || nowIso,
          aprDt5: headerBody.aprDt5 || nowIso,
          rejctDt: headerBody.rejctDt || nowIso,
          reviseDt: headerBody.reviseDt || nowIso,
          descr: headerBody.nodeDes || "",
        };

        const pcestRes = await fetch(`${API_BASE_URL}/api/pcesthtt`, {
          method: "POST",
          headers,
          body: JSON.stringify(pcesthttBody),
        });
        if (!pcestRes.ok) {
          const txt = await pcestRes.text().catch(() => "");
          console.error("Failed to save pcesthtt header", { status: pcestRes.status, text: txt });
        }
      } catch (err) {
        console.error("Error saving pcesthtt header:", err);
      }

      try {
        const existingRes = await fetch(
          `${API_BASE_URL}/api/pcestdtt/estimate?estimateNo=${encodeURIComponent(finalEstimateNo)}`
        );
        if (existingRes.ok) {
          const existingRows = await existingRes.json();
          
          for (const r of existingRows) {
            const revNo = r.revNo ?? r.id?.revNo ?? 0;
            const deptId = r.deptId ?? r.DEPT_ID ?? r.id?.deptId ?? "";
            const resCd = r.resCd ?? r.id?.resCd ?? "";
            
            try {
              await fetch(
                `${API_BASE_URL}/api/pcestdtt/${encodeURIComponent(finalEstimateNo)}/${encodeURIComponent(revNo)}/${encodeURIComponent(deptId)}/${encodeURIComponent(resCd)}`,
                {
                  method: "DELETE",
                  headers,
                }
              );
            } catch (delErr) {
              console.warn("Delete warning:", delErr);
            }
          }
        }
      } catch (e) {
        console.warn("Could not fetch existing pcestdtt rows:", e);
      }

      const pcFailures = [];
      const spFailures = [];
      const httFailures = [];

      const uniquePcEntries = new Map();
      
      for (const it of estimates) {
        const uniqueKey = `${it.deptId || "4"}_${(it.resCd || it.code || "").toString().trim()}`;
        
        if (uniquePcEntries.has(uniqueKey)) {
          continue;
        }
        uniquePcEntries.set(uniqueKey, true);

        const pcBody = {
          estimateNo: finalEstimateNo,
          revNo: 0,
          deptId: it.deptId || it.DEPT_ID || "4",
          resCd: (it.resCd || it.code || it.description || "").toString().trim(),
          uom: it.uom || it.UOM || "NOS",
          unitPrice: it.unitPrice != null ? Number(it.unitPrice) : 0,
          estimateQty: it.qty != null ? Number(it.qty) : 0,
          estimateCost: it.tot != null ? Number(it.tot) : 0,
          resType: it.resType || null,
        };

        try {
          const pcRes = await fetch(`${API_BASE_URL}/api/pcestdtt`, {
            method: "POST",
            headers,
            body: JSON.stringify(pcBody),
          });

          if (!pcRes.ok) {
            const txt = await pcRes.text().catch(() => "");
            pcFailures.push({ item: pcBody, status: pcRes.status, text: txt });
          }
        } catch (err) {
          pcFailures.push({
            item: pcBody,
            error: err instanceof Error ? err.message : String(err),
          });
        }

        const spBody = {
          id: {
            lineSectionTypeId: finalEstimateNo,
            resCd: (it.resCd || it.code || "").toString().trim(),
            deptId: (it.deptId || "4").toString(),
          },
          poleTypeId: it.poleTypeId || null,
          pointTypeId: finalEstimateNo,
          resType: it.resType || null,
          resCat: it.resCat || null,
          resName: it.description || "",
          uom: it.uom || it.UOM || "NOS",
          estimateQtyOld: it.estimateQtyOld != null ? Number(it.estimateQtyOld) : (it.qty != null ? Number(it.qty) : 0),
          tolerance: it.tolerance != null ? it.tolerance : null,
          unitPrice: it.unitPrice != null ? Number(it.unitPrice) : 0,
          estimateQty: it.qty != null ? Number(it.qty) : 0,
          estimateNo: finalEstimateNo,
        };

        try {
          const spRes = await fetch(`${API_BASE_URL}/api/spPeggingDmt`, {
            method: "POST",
            headers,
            body: JSON.stringify(spBody),
          });

          if (!spRes.ok) {
            const txt = await spRes.text().catch(() => "");
            spFailures.push({ item: spBody, status: spRes.status, text: txt });
          }
        } catch (err) {
          spFailures.push({
            item: spBody,
            error: err instanceof Error ? err.message : String(err),
          });
        }
      }

      if (pcFailures.length === 0 && spFailures.length === 0 && httFailures.length === 0) {
        alert("Successfully saved estimates to all tables!");
        setEstimates([]);
        setEstimateId("");
      } else {
        let errorMessage = "Some saves failed:\n";
        if (pcFailures.length > 0) errorMessage += `- pcestdtt: ${pcFailures.length} failures\n`;
        if (spFailures.length > 0) errorMessage += `- spPeggingDmt: ${spFailures.length} failures\n`;
        if (httFailures.length > 0) errorMessage += `- pcesthtt: ${httFailures.length} failures\n`;
        errorMessage += "Check console for details.";
        
        alert(errorMessage);
      }

    } catch (error) {
      console.error("Fetch error in save flow:", error);
      alert("Network error: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (!estimates || estimates.length === 0) return;
    const updated = computeEstimateItems(materials, markers, estimateId);
    const same =
      updated.length === estimates.length &&
      updated.every(
        (u, i) =>
          u.code === estimates[i].code &&
          u.qty === estimates[i].qty &&
          u.tot === estimates[i].tot
      );
    if (!same) {
      setEstimates(updated);
      if (!updated.length) setEstimateId("");
    }
  }, [markers, materials, computeEstimateItems, estimateId, estimates]);

  const totalCost = estimates.reduce((sum, item) => sum + item.tot, 0);
  const updateEstimateQtyOld = (index, newVal) => {
    const val = Number.isNaN(Number(newVal))
      ? 0
      : Math.max(0, parseInt(Number(newVal), 10));
    setEstimates((prev) => {
      const copy = Array.isArray(prev) ? [...prev] : [];
      if (!copy[index]) return prev;
      copy[index] = { ...copy[index], estimateQtyOld: val };
      return copy;
    });
  };

  return (
    <div style={{ marginTop: 8 }}>
      <div
        className="estimation-actions"
        style={{
          marginBottom: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {estimates && estimates.length > 0 && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ color: "#334155", fontSize: 13 }}>Estimate No:</div>
            <div
              style={{
                background: "#eef2ff",
                padding: "6px 10px",
                borderRadius: 6,
                fontWeight: 600,
                color: "#1e293b",
              }}
            >
              {estimateId || "-"}
            </div>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <button
            className="app-btn app-btn--accent"
            onClick={handleCreateEstimate}
          >
            Estimate
          </button>
          <button
            className="app-btn app-btn--primary"
            onClick={handleSaveToDB}
            disabled={saving || !estimates.length}
          >
            {saving ? "Saving..." : "Save to DB"}
          </button>
          <button
            className="app-btn app-btn--primary"
            onClick={() => {
              if (onClosePopup) onClosePopup();
            }}
            style={{ marginLeft: 6 }}
          >
            Close
          </button>
        </div>
      </div>

      {estimates.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              fontSize: "14px",
            }}
          >
            <thead>
              <tr style={{ background: "#f8fafc" }}>
                <th style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "left" }}>
                  Description
                </th>
                <th style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "left" }}>
                  Res Code
                </th>
                <th style={{ border: "1px solid #e2e8f0", padding: "8px", width: 180, textAlign: "left" }}>
                  Res Type
                </th>
                <th style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "right" }}>
                  Estimate Qty (Old)
                </th>
                <th style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "right" }}>
                  Tolerance
                </th>
                <th style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "right" }}>
                  Unit Price (LKR)
                </th>
                <th style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "right" }}>
                  Qty
                </th>
                <th style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "right" }}>
                  Total (LKR)
                </th>
              </tr>
            </thead>
            <tbody>
              {estimates.map((estimate, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #e2e8f0", padding: "8px" }}>
                    {estimate.description}
                  </td>
                  <td style={{ border: "1px solid #e2e8f0", padding: "8px" }}>
                    {estimate.resCd || "-"}
                  </td>
                  <td style={{ border: "1px solid #e2e8f0", padding: "8px", width: 180 }}>
                    {estimate.resType || "-"}
                  </td>
                  <td style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "right" }}>
                    {/* Read-only: no modification in Estimation table */}
                    {estimate.estimateQtyOld != null ? estimate.estimateQtyOld : 0}
                  </td>
                  <td style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "right" }}>
                    {estimate.tolerance != null && estimate.tolerance !== ""
                      ? estimate.tolerance
                      : "-"}
                  </td>
                  <td style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "right" }}>
                    {estimate.unitPrice.toLocaleString()}
                  </td>
                  <td style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "right" }}>
                    {estimate.qty}
                  </td>
                  <td style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "right" }}>
                    {estimate.tot.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr style={{ background: "#f1f5f9", fontWeight: "bold" }}>
                <td colSpan={7} style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "right" }}>
                  Total Cost:
                </td>
                <td style={{ border: "1px solid #e2e8f0", padding: "8px", textAlign: "right" }}>
                  {totalCost.toLocaleString()} LKR
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      ) : (
        <div style={{ padding: "16px", textAlign: "center", color: "#64748b", background: "#f8fafc", borderRadius: 4 }}>
          No estimates created yet. Click "Estimate" to generate estimation.
        </div>
      )}
    </div>
  );
};

export default EstimationTable;
export { extractUnitPrice };