// components/CalculateEstimate/Button/LoadMap.js
import React, { useState } from "react";
import L from "leaflet";

const LoadMap = ({ setMarkers, mapInstance, setEstimates, setMaterials }) => {
  const [loading, setLoading] = useState(false);

  const handleLoad = async () => {
    setLoading(true);
    
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.click();

      input.onchange = async (e) => {
        const target = e.target;
        if (!target.files || target.files.length === 0) {
          setLoading(false);
          return;
        }

        const file = target.files[0];
        const text = await file.text();

        try {
          const json = JSON.parse(text);
          console.log("Loaded JSON structure:", json);

          // Check different possible JSON structures from SaveMap
          let markersData = [];
          let estimatesData = [];
          let materialsData = [];

          // Structure 1: Direct markers array (old format)
          if (Array.isArray(json) && json[0] && json[0].latLng) {
            markersData = json;
          }
          // Structure 2: Object with markers property (new format)
          else if (json.markers && Array.isArray(json.markers)) {
            markersData = json.markers;
            
            // Extract estimates if available
            if (json.estimates && Array.isArray(json.estimates)) {
              estimatesData = json.estimates;
            }
            
            // Extract summary info if available
            if (json.summary) {
              console.log("File summary:", json.summary);
            }
          }
          // Structure 3: Object with mapJson property (nested)
          else if (json.mapJson && json.mapJson.markers) {
            markersData = json.mapJson.markers;
            if (json.mapJson.estimates) {
              estimatesData = json.mapJson.estimates;
            }
          }
          // Structure 4: Map capture with imgData (very old format)
          else if (json.imgData && Array.isArray(json.markers)) {
            markersData = json.markers;
          }
          else {
            // Try to find markers anywhere in the object
            const findMarkers = (obj) => {
              if (Array.isArray(obj) && obj.length > 0 && obj[0].latLng) {
                return obj;
              }
              if (typeof obj === 'object') {
                for (const key in obj) {
                  if (Array.isArray(obj[key]) && obj[key].length > 0 && obj[key][0].latLng) {
                    return obj[key];
                  }
                  if (typeof obj[key] === 'object') {
                    const result = findMarkers(obj[key]);
                    if (result) return result;
                  }
                }
              }
              return null;
            };
            
            const foundMarkers = findMarkers(json);
            if (foundMarkers) {
              markersData = foundMarkers;
            } else {
              throw new Error("No valid marker data found in JSON file");
            }
          }

          if (markersData.length === 0) {
            alert("No markers found in the JSON file!");
            setLoading(false);
            return;
          }

          console.log("Found markers:", markersData.length);
          console.log("Found estimates:", estimatesData.length);

          // Rebuild markers with proper Leaflet LatLng
          const rebuiltMarkers = markersData.map((m, index) => {
            try {
              let lat, lng;
              
              // Handle different latLng formats
              if (m.latLng) {
                if (typeof m.latLng.lat === 'number' && typeof m.latLng.lng === 'number') {
                  lat = m.latLng.lat;
                  lng = m.latLng.lng;
                } else if (Array.isArray(m.latLng) && m.latLng.length >= 2) {
                  lat = m.latLng[0];
                  lng = m.latLng[1];
                } else if (m.lat && m.lng) {
                  lat = m.lat;
                  lng = m.lng;
                } else {
                  // Default to Sri Lanka center
                  lat = 7.8731;
                  lng = 80.7718;
                }
              } else if (m.lat && m.lng) {
                lat = m.lat;
                lng = m.lng;
              } else {
                // Default position
                lat = 7.8731 + (index * 0.001);
                lng = 80.7718 + (index * 0.001);
              }

              const marker = {
                id: m.id || Date.now() + index,
                nodeId: m.nodeId || m.name || `marker-${index}`,
                name: m.name || `Marker ${index + 1}`,
                src: m.src || null,
                latLng: L.latLng(lat, lng),
                scale: m.scale || 1,
                rotation: m.rotation || 0,
                relatedData: m.relatedData || [],
                summary: m.summary || { totalCost: 0, itemCount: 0 },
              };

              // Ensure src is a valid string
              if (!marker.src) {
                // Try to determine icon based on name
                if (marker.name.toLowerCase().includes('pole')) {
                  marker.src = '/assets/img/pole.png';
                } else if (marker.name.toLowerCase().includes('substation')) {
                  marker.src = '/assets/img/substations.png';
                } else if (marker.name.toLowerCase().includes('conductor')) {
                  marker.src = '/assets/img/conductors.png';
                }
              }

              return marker;
            } catch (error) {
              console.error("Error processing marker:", m, error);
              // Return a default marker
              return {
                id: Date.now() + index,
                nodeId: `error-marker-${index}`,
                name: `Marker ${index + 1}`,
                src: null,
                latLng: L.latLng(7.8731 + (index * 0.01), 80.7718 + (index * 0.01)),
                scale: 1,
                rotation: 0,
                relatedData: [],
                summary: { totalCost: 0, itemCount: 0 },
              };
            }
          });

          console.log("Rebuilt markers:", rebuiltMarkers);
          setMarkers(rebuiltMarkers);

          // Load estimates if available
          if (estimatesData.length > 0 && setEstimates) {
            console.log("Setting estimates:", estimatesData);
            setEstimates(estimatesData);
          } else if (setEstimates) {
            setEstimates([]);
          }

          // Extract materials from markers
          if (setMaterials) {
            const extractedMaterials = [];
            rebuiltMarkers.forEach((marker) => {
              if (marker.relatedData && Array.isArray(marker.relatedData)) {
                marker.relatedData.forEach((item) => {
                  // Create a unique key for each material
                  const key = `${item.code || item.id || item.name}_${item.deptId || '4'}`;
                  const existingIndex = extractedMaterials.findIndex(m => 
                    `${m.code || m.id || m.name}_${m.deptId || '4'}` === key
                  );
                  
                  if (existingIndex === -1) {
                    extractedMaterials.push({
                      code: item.code || item.id || `mat-${extractedMaterials.length}`,
                      description: item.description || item.resName || item.name || "Material",
                      qty: item.qty || item.estimateQty || 1,
                      unitPrice: item.unitPrice || 0,
                      tot: (item.qty || 1) * (item.unitPrice || 0),
                      uom: item.uom || "NOS",
                      deptId: item.deptId || "4",
                      resCd: item.resCd || item.code,
                      ...item
                    });
                  }
                });
              }
            });
            
            console.log("Extracted materials:", extractedMaterials);
            setMaterials(extractedMaterials);
          }

          // Center map on loaded markers
          if (mapInstance && rebuiltMarkers.length > 0) {
            if (rebuiltMarkers.length === 1) {
              // Single marker: zoom in
              mapInstance.setView(rebuiltMarkers[0].latLng, 16, { animate: true });
            } else {
              // Multiple markers: fit bounds
              const bounds = L.latLngBounds(rebuiltMarkers.map(m => m.latLng));
              mapInstance.fitBounds(bounds, { padding: [50, 50], maxZoom: 18, animate: true });
            }
            
            // Show success message
            setTimeout(() => {
              alert(`✅ Successfully loaded map data!\n\n• ${rebuiltMarkers.length} markers loaded\n• ${estimatesData.length} estimates loaded\n\nMap has been centered on the loaded markers.`);
            }, 800);
          } else {
            alert(`✅ Successfully loaded ${rebuiltMarkers.length} markers!`);
          }
          
        } catch (err) {
          console.error("JSON parse/load error:", err);
          alert(`Error loading file: ${err.message}\n\nPlease ensure you're selecting a valid map JSON file exported from this application.`);
        } finally {
          setLoading(false);
        }
      };

      // Handle cancel
      input.oncancel = () => {
        setLoading(false);
      };
      
    } catch (error) {
      console.error("Load failed:", error);
      alert("Load failed! " + (error.message || "Check console for details."));
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleLoad} 
      type="button" 
      className="app-btn app-btn--primary"
      disabled={loading}
      title="Load saved map data from JSON file"
    >
      {loading ? "Loading..." : "Load"}
    </button>
  );
};

export default LoadMap;