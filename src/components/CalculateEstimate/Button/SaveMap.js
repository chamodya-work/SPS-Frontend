// SaveMap.js
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const SaveMap = ({ markers = [] }) => {
  const handleSave = async () => {
    const mapArea = document.querySelector(".leaflet-container");
    if (!mapArea) return;

    try {
      // Capture map as canvas
      const canvas = await html2canvas(mapArea, {
        useCORS: true,
        logging: false,
        scale: 2,
      });
      const imgData = canvas.toDataURL("image/png");

      // Use File System Access API if available
      if (window.showSaveFilePicker) {
        const options = {
          suggestedName: "map_capture",
          types: [
            { description: "PNG Image", accept: { "image/png": [".png"] } },
            { description: "PDF Document", accept: { "application/pdf": [".pdf"] } },
            { description: "JSON File", accept: { "application/json": [".json"] } },
          ],
        };

        const handle = await window.showSaveFilePicker(options);
        const writable = await handle.createWritable();
        const fileName = handle.name.toLowerCase();

        if (fileName.endsWith(".pdf")) {
          const pdf = new jsPDF("landscape", "px", "a4");
          const width = pdf.internal.pageSize.getWidth();
          const height = pdf.internal.pageSize.getHeight();
          pdf.addImage(imgData, "PNG", 0, 0, width, height);
          await writable.write(await pdf.output("blob"));
        } else if (fileName.endsWith(".json")) {
          const mapJson = {
            capturedAt: new Date().toISOString(),
            dimensions: { width: canvas.width, height: canvas.height },
            imgData,
            markers: markers.map((m) => ({
              name: m.name,
              src: m.src,
              latLng: {
                lat: m.latLng.lat ?? m.latLng?.lat,
                lng: m.latLng.lng ?? m.latLng?.lng,
              },
            })),
          };
          await writable.write(JSON.stringify(mapJson, null, 2));
        } else {
          const res = await fetch(imgData);
          const blob = await res.blob();
          await writable.write(blob);
        }

        await writable.close();
        alert("File saved successfully!");
      } else {
        // Fallback for browsers without File System Access API
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "map_capture.png";
        link.click();
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("Save failed! Check console for details.");
    }
  };

  return (
    <button onClick={handleSave} type="button" className="app-btn app-btn--primary">
      Save
    </button>
  );
};

export default SaveMap;