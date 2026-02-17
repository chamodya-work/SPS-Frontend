// components/CalculateEstimate/Button/SaveMap.js
import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SaveMap = ({ markers = [], estimates = [] }) => {
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // 1. Capture the map area
      const mapArea = document.querySelector(".leaflet-container");
      if (!mapArea) {
        alert("Map area not found!");
        setSaving(false);
        return;
      }

      // 2. Try to get the Work Estimate Number from the DOM or estimates
      let workEstimateNo = "";
      
      // Try to get from DOM first
      const estimateNoElement = document.querySelector(".estimation-actions .estimation-no");
      if (estimateNoElement) {
        workEstimateNo = estimateNoElement.textContent.trim();
      }
      
      // If not found in DOM, get from estimates array (first item's estimateId)
      if (!workEstimateNo && estimates.length > 0) {
        workEstimateNo = estimates[0]?.estimateId || "";
      }
      
      // If still not found, generate a default
      if (!workEstimateNo) {
        workEstimateNo = `WEST-${Date.now()}`;
      }

      // 3. Capture the estimation table
      const estimateTable = document.querySelector(".estimation-table-container");
      let estimateCanvas = null;
      let estimateData = null;
      
      // Create a temporary table if not found in DOM
      let estimateTableHtml = "";
      if (estimateTable) {
        estimateCanvas = await html2canvas(estimateTable, {
          useCORS: true,
          logging: false,
          scale: 2,
        });
      } else if (estimates.length > 0) {
        // Generate HTML for estimation table if not in DOM
        const totalCost = estimates.reduce((sum, item) => sum + item.tot, 0);
        
        estimateTableHtml = `
          <div style="padding: 20px; font-family: Arial, sans-serif;">
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid #e2e8f0;">
              <h2 style="color: #2c3e50; margin: 0 0 10px 0; border-bottom: 2px solid #3498db; padding-bottom: 10px;">
                Estimation Details
              </h2>
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <strong style="color: #475569;">Work Estimate Number:</strong>
                  <span style="margin-left: 10px; font-weight: bold; color: #1e40af; background: #e0e7ff; padding: 5px 10px; border-radius: 4px;">
                    ${workEstimateNo}
                  </span>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 12px; color: #64748b;">
                    Generated: ${new Date().toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 20px;">
              <thead>
                <tr style="background: #f1f5f9; border: 1px solid #e2e8f0;">
                  <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-weight: bold;">Description</th>
                  <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-weight: bold;">Res Code</th>
                  <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: left; font-weight: bold;">Res Type</th>
                  <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: right; font-weight: bold;">Estimate Qty (Old)</th>
                  <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: right; font-weight: bold;">Tolerance</th>
                  <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: right; font-weight: bold;">Unit Price (LKR)</th>
                  <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: right; font-weight: bold;">Qty</th>
                  <th style="border: 1px solid #e2e8f0; padding: 10px; text-align: right; font-weight: bold;">Total (LKR)</th>
                </tr>
              </thead>
              <tbody>
                ${estimates.map((estimate, index) => `
                  <tr key="${index}" style="border: 1px solid #e2e8f0; ${index % 2 === 0 ? 'background: #f8fafc;' : 'background: white;'}">
                    <td style="border: 1px solid #e2e8f0; padding: 8px;">${estimate.description || "-"}</td>
                    <td style="border: 1px solid #e2e8f0; padding: 8px;">${estimate.resCd || "-"}</td>
                    <td style="border: 1px solid #e2e8f0; padding: 8px;">${estimate.resType || "-"}</td>
                    <td style="border: 1px solid #e2e8f0; padding: 8px; text-align: right;">${estimate.estimateQtyOld != null ? estimate.estimateQtyOld : 0}</td>
                    <td style="border: 1px solid #e2e8f0; padding: 8px; text-align: right;">${estimate.tolerance != null && estimate.tolerance !== "" ? estimate.tolerance : "-"}</td>
                    <td style="border: 1px solid #e2e8f0; padding: 8px; text-align: right;">${estimate.unitPrice.toLocaleString()}</td>
                    <td style="border: 1px solid #e2e8f0; padding: 8px; text-align: right;">${estimate.qty}</td>
                    <td style="border: 1px solid #e2e8f0; padding: 8px; text-align: right;">${estimate.tot.toLocaleString()}</td>
                  </tr>
                `).join('')}
              </tbody>
              <tfoot>
                <tr style="background: #e0f2fe; font-weight: bold; border: 1px solid #e2e8f0;">
                  <td colspan="7" style="border: 1px solid #e2e8f0; padding: 12px; text-align: right; font-size: 13px;">Total Cost:</td>
                  <td style="border: 1px solid #e2e8f0; padding: 12px; text-align: right; font-size: 13px; color: #1e40af;">
                    ${totalCost.toLocaleString()} LKR
                  </td>
                </tr>
              </tfoot>
            </table>
            
            <div style="margin-top: 20px; padding: 15px; background: #f8fafc; border-radius: 6px; border: 1px solid #e2e8f0;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                  <div style="font-size: 11px; color: #64748b;">
                    <strong>Summary:</strong>
                  </div>
                  <div style="font-size: 11px; color: #475569;">
                    Total Items: ${estimates.length} | Total Markers: ${markers.length}
                  </div>
                </div>
                <div style="text-align: right;">
                  <div style="font-size: 11px; color: #475569;">
                    <strong>Total Estimated Cost:</strong> ${totalCost.toLocaleString()} LKR
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        
        // Create a temporary div to render the HTML
        const tempDiv = document.createElement('div');
        tempDiv.style.cssText = `
          position: absolute;
          left: -9999px;
          top: -9999px;
          width: 1000px;
          background: white;
          padding: 10px;
        `;
        tempDiv.innerHTML = estimateTableHtml;
        document.body.appendChild(tempDiv);
        
        estimateCanvas = await html2canvas(tempDiv, {
          useCORS: true,
          logging: false,
          scale: 2,
          width: 1000,
          height: tempDiv.scrollHeight,
        });
        
        document.body.removeChild(tempDiv);
      }

      // 4. Capture the map
      const mapCanvas = await html2canvas(mapArea, {
        useCORS: true,
        logging: false,
        scale: 2,
      });
      
      const mapImgData = mapCanvas.toDataURL("image/png");
      
      // Prepare data for JSON export
      const mapJson = {
        capturedAt: new Date().toISOString(),
        dimensions: { width: mapCanvas.width, height: mapCanvas.height },
        workEstimateNo: workEstimateNo,
        mapImageData: mapImgData,
        markers: markers.map((m) => ({
          id: m.id,
          name: m.name,
          nodeId: m.nodeId,
          src: m.src,
          latLng: {
            lat: m.latLng?.lat ?? m.latLng?.lat,
            lng: m.latLng?.lng ?? m.latLng?.lng,
          },
          scale: m.scale,
          rotation: m.rotation,
          summary: m.summary,
        })),
        estimates: estimates.map((e) => ({
          estimateId: e.estimateId,
          code: e.code,
          description: e.description,
          resCd: e.resCd,
          resType: e.resType,
          estimateQtyOld: e.estimateQtyOld,
          tolerance: e.tolerance,
          unitPrice: e.unitPrice,
          qty: e.qty,
          tot: e.tot,
          deptId: e.deptId,
          uom: e.uom,
          lineSectionTypeId: e.lineSectionTypeId,
        })),
        summary: {
          totalMarkers: markers.length,
          totalEstimates: estimates.length,
          totalCost: estimates.reduce((sum, item) => sum + item.tot, 0),
          workEstimateNo: workEstimateNo,
        }
      };

      // Prepare estimate image data if available
      let estimateImgData = null;
      if (estimateCanvas) {
        estimateImgData = estimateCanvas.toDataURL("image/png");
      }

      // Use File System Access API if available
      if (window.showSaveFilePicker) {
        const options = {
          suggestedName: `${workEstimateNo}_${new Date().toISOString().slice(0, 10)}`,
          types: [
            { description: "PDF Document", accept: { "application/pdf": [".pdf"] } },
            { description: "PNG Image", accept: { "image/png": [".png"] } },
            { description: "JSON File", accept: { "application/json": [".json"] } },
          ],
        };

        try {
          const handle = await window.showSaveFilePicker(options);
          const writable = await handle.createWritable();
          const fileName = handle.name.toLowerCase();

          if (fileName.endsWith(".pdf")) {
            // Create PDF with both map and estimates
            const pdf = new jsPDF("landscape", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            
            // Add header with Work Estimate Number
            pdf.setFontSize(16);
            pdf.setTextColor(30, 64, 175);
            pdf.text(`Work Estimate: ${workEstimateNo}`, pdfWidth / 2, 15, { align: 'center' });
            
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Generated: ${new Date().toLocaleString()}`, pdfWidth - 20, 10, { align: 'right' });
            
            // Add map capture to PDF
            const mapImgWidth = pdfWidth - 20;
            const mapImgHeight = (mapCanvas.height * mapImgWidth) / mapCanvas.width;
            pdf.addImage(mapImgData, "PNG", 10, 20, mapImgWidth, Math.min(mapImgHeight, pdfHeight * 0.6));
            
            let currentY = 20 + Math.min(mapImgHeight, pdfHeight * 0.6) + 15;
            
            // Add estimation table to PDF if exists
            if (estimateCanvas) {
              const estimateImgWidth = pdfWidth - 20;
              const estimateImgHeight = (estimateCanvas.height * estimateImgWidth) / estimateCanvas.width;
              
              // Check if we need a new page
              if (currentY + estimateImgHeight > pdfHeight - 10) {
                pdf.addPage();
                currentY = 10;
                // Add header on new page too
                pdf.setFontSize(16);
                pdf.setTextColor(30, 64, 175);
                pdf.text(`Work Estimate: ${workEstimateNo} (continued)`, pdfWidth / 2, 15, { align: 'center' });
                currentY = 20;
              }
              
              pdf.addImage(estimateImgData, "PNG", 10, currentY, estimateImgWidth, estimateImgHeight);
              currentY += estimateImgHeight + 10;
            }
            
            // Add footer with summary
            pdf.setFontSize(10);
            pdf.setTextColor(100, 100, 100);
            pdf.text(`Markers: ${markers.length} | Estimates: ${estimates.length} | Total Cost: ${estimates.reduce((sum, item) => sum + item.tot, 0).toLocaleString()} LKR`, 10, currentY);
            
            const pdfBlob = pdf.output("blob");
            await writable.write(pdfBlob);
            alert("Map and estimation saved successfully as PDF!");
            
          } else if (fileName.endsWith(".json")) {
            // Save as JSON
            const jsonContent = JSON.stringify(mapJson, null, 2);
            await writable.write(jsonContent);
            alert("Map data saved successfully as JSON!");
            
          } else if (fileName.endsWith(".png")) {
            // Save as PNG (just the map image)
            const response = await fetch(mapImgData);
            const blob = await response.blob();
            await writable.write(blob);
            alert("Map saved successfully as PNG!");
          }

          await writable.close();
          
        } catch (error) {
          if (error.name !== 'AbortError') {
            // User cancelled or error occurred
            throw error;
          }
        }
      } else {
        // Fallback for browsers without File System Access API
        // Show format selection dialog
        const format = prompt("Select format to save:\n1. PDF (with estimates)\n2. PNG (map only)\n3. JSON (data only)\n\nEnter 1, 2, or 3:", "1");
        
        if (format === "1") {
          // Create and download PDF
          const pdf = new jsPDF("landscape", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          
          // Add header with Work Estimate Number
          pdf.setFontSize(16);
          pdf.setTextColor(30, 64, 175);
          pdf.text(`Work Estimate: ${workEstimateNo}`, pdfWidth / 2, 15, { align: 'center' });
          
          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          pdf.text(`Generated: ${new Date().toLocaleString()}`, pdfWidth - 20, 10, { align: 'right' });
          
          // Add map capture to PDF
          const mapImgWidth = pdfWidth - 20;
          const mapImgHeight = (mapCanvas.height * mapImgWidth) / mapCanvas.width;
          pdf.addImage(mapImgData, "PNG", 10, 20, mapImgWidth, Math.min(mapImgHeight, pdfHeight * 0.6));
          
          let currentY = 20 + Math.min(mapImgHeight, pdfHeight * 0.6) + 15;
          
          // Add estimation table to PDF if exists
          if (estimateCanvas) {
            const estimateImgWidth = pdfWidth - 20;
            const estimateImgHeight = (estimateCanvas.height * estimateImgWidth) / estimateCanvas.width;
            
            if (currentY + estimateImgHeight > pdfHeight - 10) {
              pdf.addPage();
              currentY = 10;
              // Add header on new page too
              pdf.setFontSize(16);
              pdf.setTextColor(30, 64, 175);
              pdf.text(`Work Estimate: ${workEstimateNo} (continued)`, pdfWidth / 2, 15, { align: 'center' });
              currentY = 20;
            }
            
            pdf.addImage(estimateImgData, "PNG", 10, currentY, estimateImgWidth, estimateImgHeight);
            currentY += estimateImgHeight + 10;
          }
          
          // Add footer with summary
          pdf.setFontSize(10);
          pdf.setTextColor(100, 100, 100);
          pdf.text(`Markers: ${markers.length} | Estimates: ${estimates.length} | Total Cost: ${estimates.reduce((sum, item) => sum + item.tot, 0).toLocaleString()} LKR`, 10, currentY);
          
          const pdfBlob = pdf.output("blob");
          const link = document.createElement("a");
          link.href = URL.createObjectURL(pdfBlob);
          link.download = `${workEstimateNo}_${new Date().toISOString().slice(0, 10)}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
          alert("Map and estimation downloaded as PDF!");
          
        } else if (format === "2") {
          // Download PNG
          const link = document.createElement("a");
          link.href = mapImgData;
          link.download = `${workEstimateNo}_map_${new Date().toISOString().slice(0, 10)}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          alert("Map downloaded as PNG!");
          
        } else if (format === "3") {
          // Download JSON
          const jsonContent = JSON.stringify(mapJson, null, 2);
          const blob = new Blob([jsonContent], { type: "application/json" });
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = `${workEstimateNo}_data_${new Date().toISOString().slice(0, 10)}.json`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(link.href);
          alert("Map data downloaded as JSON!");
        } else {
          alert("Invalid selection or cancelled.");
        }
      }
      
    } catch (error) {
      console.error("Save failed:", error);
      alert("Save failed! " + (error.message || "Check console for details."));
    } finally {
      setSaving(false);
    }
  };

  return (
    <button 
      onClick={handleSave} 
      type="button" 
      className="app-btn app-btn--primary"
      disabled={saving}
      title="Save as PDF, PNG, or JSON"
    >
      {saving ? "Saving..." : "Save"}
    </button>
  );
};

export default SaveMap;