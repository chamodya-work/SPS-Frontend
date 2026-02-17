// components/PaggingSchedule/MapDrop.js
import React, { useRef, useState, useEffect, useCallback } from "react";
import { Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import linePoleIcon from "../../assets/img/pole.png";
import substationsIcon from "../../assets/img/substations.png";
import conductorsIcon from "../../assets/img/conductors.png";

// Get API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const MapDrop = ({
  markers,
  setMarkers,
  setMaterials,
  selectedMarkerId,
  setSelectedMarkerId,
  getIconForItem,
  extractUnitPrice,
  flatTreeNodes = [],
  // UI-only: show a small layer toggle button below the Zoom '-' control
  showLayerToggleUI = false,
  onBaseLayerChange,
  // When Hybrid (Satellite + Roads) is active, icons should appear white
  isHybridBase = false,
}) => {
  const map = useMap();
  const draggingMarkerRef = useRef(null);
  const startRef = useRef(null);
  const [selectedLineIndex, setSelectedLineIndex] = useState(null);
  const [selectedLineInfo, setSelectedLineInfo] = useState(null);
  const [zoomScale, setZoomScale] = useState(1);
  const layerToggleControlRef = useRef(null);

  // Store conductor-to-line mappings for dynamic recalculation
  const conductorLineMappingsRef = useRef({});

  // Add a lightweight UI control for base layer switching (UI only)
  useEffect(() => {
    if (!map || !showLayerToggleUI) return;
    if (layerToggleControlRef.current) return; // already added

    const LayerToggle = L.Control.extend({
      options: { position: "topleft" },
      onAdd: function () {
        // Make the control look like Leaflet +/- buttons
        const container = L.DomUtil.create("div", "leaflet-control leaflet-bar maptype-control");
        container.style.borderRadius = "4px";
        container.style.marginTop = "2px"; 
        const btn = L.DomUtil.create("a", "", container);
        btn.setAttribute("href", "#");
        btn.setAttribute("role", "button");
        btn.setAttribute("title", "Layers");
        btn.style.width = "30px";
        btn.style.height = "30px";
        btn.style.lineHeight = "30px";
        btn.style.textAlign = "center";
        btn.style.fontSize = "18px";
        btn.style.background = "#ffffff";
        btn.style.color = "#111827";
        btn.style.borderRadius = "4px";
        btn.textContent = "⋯"; // three-dot layers glyph

        const menu = L.DomUtil.create("div", "layer-toggle-menu", container);
        menu.style.position = "absolute";
        menu.style.left = "40px"; // to the right of the button
        menu.style.top = "0";
        menu.style.background = "#ffffff";
        menu.style.border = "none";
        menu.style.borderRadius = "6px";
        menu.style.padding = "6px";
        menu.style.boxShadow = "0 6px 20px rgba(0,0,0,0.12)";
        menu.style.display = "none";
        menu.style.zIndex = "1000";

        const options = [
          { key: "Map", label: "Map" },
          { key: "Satellite", label: "Satellite" },
          { key: "Hybrid", label: "Hybrid (Satellite + Roads)" },
          { key: "Topographic", label: "Topographic" },
        ];

        options.forEach((opt) => {
          const item = L.DomUtil.create("div", "layer-toggle-item", menu);
          item.textContent = opt.label;
          item.style.padding = "6px 10px";
          item.style.borderRadius = "6px";
          item.style.cursor = "pointer";
          item.onmouseenter = () => (item.style.background = "#f1f5f9");
          item.onmouseleave = () => (item.style.background = "transparent");
          item.onclick = () => {
            menu.style.display = "none";
            try {
              if (typeof onBaseLayerChange === "function") {
                onBaseLayerChange(opt.key);
              }
            } catch {}
          };
        });

        L.DomEvent.disableClickPropagation(container);
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          menu.style.display = menu.style.display === "none" ? "block" : "none";
        });

        return container;
      },
    });

    const control = new LayerToggle();
    layerToggleControlRef.current = control;
    map.addControl(control);

    return () => {
      try {
        map.removeControl(control);
      } catch {}
      layerToggleControlRef.current = null;
    };
  }, [map, showLayerToggleUI, onBaseLayerChange]);

  const fetchRelatedData = async (nodeId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/spPeggingDmt/lineSectionType/${nodeId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch related data: ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "";
      if (!contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(
          `Expected JSON but got ${
            contentType || "text"
          }. Preview: ${text.slice(0, 300)}`
        );
      }

      const relatedData = await response.json();
      return relatedData;
    } catch (error) {
      console.error("Error fetching related data:", error);
      return [];
    }
  };

  const calculateConductorScale = (marker, currentZoomScale = zoomScale) => {
    // Only calculate for conductors that are matched to a line
    if (!marker.matchedLine) return marker.scale || 1;
    
    try {
      const { a, b } = marker.matchedLine;
      if (!a || !b || !a.lat || !a.lng || !b.lat || !b.lng) return marker.scale || 1;
      
      // Calculate current pixel distance between endpoints
      const p1 = map.latLngToContainerPoint(L.latLng(a.lat, a.lng));
      const p2 = map.latLngToContainerPoint(L.latLng(b.lat, b.lng));
      const dxPx = p2.x - p1.x;
      const dyPx = p2.y - p1.y;
      const pixelLen = Math.sqrt(dxPx * dxPx + dyPx * dyPx);
      
      // Base width of conductor icon
      const BASE_WIDTH = 36;
      
      // Calculate required scale factor
      const requiredScale = pixelLen / (BASE_WIDTH * (currentZoomScale || 1));
      
      // Return scale, ensuring minimum value
      return Math.max(0.2, requiredScale);
    } catch (error) {
      console.warn("Failed to calculate conductor scale:", error);
      return marker.scale || 1;
    }
  };

  const calculateConductorRotation = (marker) => {
    // Only calculate for conductors that are matched to a line
    if (!marker.matchedLine) return marker.rotation || 0;
    
    try {
      const { a, b } = marker.matchedLine;
      if (!a || !b || !a.lat || !a.lng || !b.lat || !b.lng) return marker.rotation || 0;
      
      // Calculate current angle in screen space
      const p1 = map.latLngToContainerPoint(L.latLng(a.lat, a.lng));
      const p2 = map.latLngToContainerPoint(L.latLng(b.lat, b.lng));
      const dxPx = p2.x - p1.x;
      const dyPx = p2.y - p1.y;
      const angleDeg = (Math.atan2(dyPx, dxPx) * 180) / Math.PI;
      
      return angleDeg;
    } catch (error) {
      console.warn("Failed to calculate conductor rotation:", error);
      return marker.rotation || 0;
    }
  };

  const handleDrop = async (e) => {
    const dragData = e.dataTransfer.getData("text/plain");
    let nodeName, nodeId;
    try {
      const parsedData = JSON.parse(dragData);
      nodeName = parsedData.name;
      nodeId = parsedData.id;
    } catch {
      nodeName = dragData;
      nodeId = flatTreeNodes.find((n) => n.name === nodeName)?.id ?? "Unknown";
    }

    const src = getIconForItem(nodeName);
    if (!src) return;

    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const latLng = map.containerPointToLatLng([x, y]);

    const relatedData = await fetchRelatedData(nodeId);
    const relatedFiltered = Array.isArray(relatedData)
      ? relatedData.filter((it) => {
          const dept = it?.id?.deptId ?? it?.DEPT_ID ?? it?.deptId ?? null;
          return String(dept) === "4" || Number(dept) === 4;
        })
      : [];

    let markerTotal = 0;
    if (relatedFiltered && Array.isArray(relatedFiltered)) {
      relatedFiltered.forEach((item) => {
        const qty = item.estimateQty != null ? Number(item.estimateQty) : 1;
        const up = extractUnitPrice(item);
        markerTotal += up * qty;
      });
    }

    const newMarker = {
      id: Date.now(),
      nodeId: nodeId,
      name: nodeName,
      src,
      latLng,
      scale: 1,
      rotation: 0,
      relatedData: relatedFiltered,
      summary: {
        totalCost: markerTotal,
        itemCount:
          relatedFiltered && Array.isArray(relatedFiltered)
            ? relatedFiltered.length
            : 0,
      },
    };

    // If a line segment is selected and a conductor is being dropped,
    // store the line endpoints and calculate initial scale/rotation
    try {
      if (src === conductorsIcon && selectedLineInfo) {
        const { lat1, lng1, lat2, lng2, midLat, midLng, distanceKm, index } = selectedLineInfo;

        // Store the line endpoints for dynamic recalculation
        newMarker.matchedLine = {
          distanceKm,
          a: {
            name: (linePoleMarkers[index]?.name) || null,
            lat: lat1,
            lng: lng1,
          },
          b: {
            name: (linePoleMarkers[index + 1]?.name) || null,
            lat: lat2,
            lng: lng2,
          },
        };

        // Calculate initial position, rotation and scale
        newMarker.latLng = L.latLng(midLat, midLng);
        newMarker.rotation = calculateConductorRotation(newMarker);
        newMarker.scale = calculateConductorScale(newMarker);
        
        // Store mapping for this conductor
        conductorLineMappingsRef.current[newMarker.id] = {
          a: { lat: lat1, lng: lng1 },
          b: { lat: lat2, lng: lng2 }
        };
      }
    } catch (err) {
      // Non-blocking: if anything fails, keep the default drop behavior.
      console.warn("Conductor auto-align failed:", err);
    }
    setMarkers([...markers, newMarker]);

    setMaterials((prev) => {
      const updatedMaterials = [...prev];
      const existingMaterialIndex = updatedMaterials.findIndex(
        (material) => material.code === nodeId
      );
      if (existingMaterialIndex !== -1) {
        const existing = updatedMaterials[existingMaterialIndex];
        const unitPrice = existing.unitPrice || 0;
        updatedMaterials[existingMaterialIndex] = {
          ...existing,
          qty: (existing.qty || 0) + 1,
          tot: (existing.tot || 0) + unitPrice,
        };
      } else {
        let mainUnitPrice = 0;
        let mainEstimateQtyOld = 0;
        let mainTolerance = "";
        let mainUom = "NOS";
        let mainResCd = null;
        let mainDeptId = null;
        let mainLineSectionTypeId = null;
        let mainResType = null;
        let mainDesc = nodeName;

        let _matchedRelatedIndex = null;

        if (
          relatedFiltered &&
          Array.isArray(relatedFiltered) &&
          relatedFiltered.length > 0
        ) {
          const matchIndex = relatedFiltered.findIndex((it) => {
            try {
              const pole = (it.poleTypeId || "").toString();
              const resName = (it.resName || "").toString();
              if (
                nodeName &&
                pole &&
                pole.toLowerCase().includes(nodeName.toLowerCase())
              )
                return true;
              if (
                nodeName &&
                resName &&
                resName.toLowerCase().includes(nodeName.toLowerCase())
              )
                return true;
            } catch (e) {
              return false;
            }
            return false;
          });
          const match =
            matchIndex >= 0 ? relatedFiltered[matchIndex] : relatedFiltered[0];

          mainDesc = match.resName || match.res_name || nodeName;
          mainUnitPrice = extractUnitPrice(match);
          mainEstimateQtyOld =
            match.estimateQtyOld != null
              ? match.estimateQtyOld
              : match.estimateQty != null
              ? match.estimateQty
              : 0;
          mainTolerance = match.tolerance != null ? match.tolerance : "";
          mainUom = match.uom || mainUom;
          mainResCd = match.id?.resCd ?? null;
          mainDeptId = match.id?.deptId ?? null;
          mainLineSectionTypeId = match.id?.lineSectionTypeId ?? null;
          mainResType = match.resType || null;
          _matchedRelatedIndex = matchIndex >= 0 ? matchIndex : null;
        }

        updatedMaterials.push({
          code: nodeId,
          description: mainDesc || nodeName,
          qty: 1,
          unitPrice: mainUnitPrice,
          tot: (Number(mainUnitPrice) || 0) * 1,
          uom: mainUom,
          resCd: mainResCd,
          resType: mainResType,
          deptId: mainDeptId,
          lineSectionTypeId: mainLineSectionTypeId,
          estimateQtyOld: mainEstimateQtyOld,
          tolerance: mainTolerance,
        });
      }

      if (relatedFiltered && Array.isArray(relatedFiltered)) {
        const mainIndex = updatedMaterials.findIndex(
          (material) => material.code === nodeId
        );
        const relatedToProcess =
          typeof _matchedRelatedIndex !== "undefined" &&
          _matchedRelatedIndex != null
            ? relatedFiltered.filter((_, i) => i !== _matchedRelatedIndex)
            : relatedFiltered;
        relatedToProcess.forEach((item) => {
          const itemDeptStr = (item?.id?.deptId ?? item?.DEPT_ID ?? item?.deptId ?? "").toString();
          if (itemDeptStr !== "4") return;
          const relatedCode = `${item.id?.lineSectionTypeId ?? nodeId}_${
            item.id?.resCd ?? ""
          }_${item.id?.deptId ?? ""}`;
          const existingRelatedIndex = updatedMaterials.findIndex(
            (material) => material.code === relatedCode
          );
          const qty = item.estimateQty != null ? Number(item.estimateQty) : 1;
          const unitPrice = extractUnitPrice(item);
          const tot = unitPrice * qty;

          const itemResCd = String(item.id?.resCd ?? "").trim();
          const itemLsId = item.id?.lineSectionTypeId ?? null;
          const itemDept = item.id?.deptId ?? null;

          let mergedToMain = false;
          if (mainIndex !== -1) {
            const mainMat = updatedMaterials[mainIndex];
            const mainResCd = String(mainMat.resCd ?? "").trim();
            const mainLsId = mainMat.lineSectionTypeId ?? null;
            const mainDept = mainMat.deptId ?? null;
            if (
              mainResCd &&
              itemResCd &&
              mainResCd === itemResCd &&
              (mainLsId == null ||
                itemLsId == null ||
                String(mainLsId) === String(itemLsId)) &&
              (mainDept == null ||
                itemDept == null ||
                String(mainDept) === String(itemDept))
            ) {
              const addEstimateQtyOld =
                item.estimateQtyOld != null
                  ? Number(item.estimateQtyOld)
                  : item.estimateQty != null
                  ? Number(item.estimateQty)
                  : 0;
              updatedMaterials[mainIndex] = {
                ...mainMat,
                qty: (mainMat.qty || 0) + qty,
                tot: (mainMat.tot || 0) + tot,
                estimateQtyOld:
                  (mainMat.estimateQtyOld || 0) + addEstimateQtyOld,
                tolerance:
                  mainMat.tolerance ||
                  (item.tolerance != null ? item.tolerance : ""),
              };
              mergedToMain = true;
            }
          }

          if (mergedToMain) return;

          if (existingRelatedIndex !== -1) {
            const existing = updatedMaterials[existingRelatedIndex];
            const addEstimateQtyOld =
              item.estimateQtyOld != null
                ? Number(item.estimateQtyOld)
                : item.estimateQty != null
                ? Number(item.estimateQty)
                : 0;
            const newEstimateQtyOld =
              (existing.estimateQtyOld || 0) + addEstimateQtyOld;
            const newTolerance =
              existing.tolerance ||
              (item.tolerance != null ? item.tolerance : "");

            updatedMaterials[existingRelatedIndex] = {
              ...existing,
              qty: (existing.qty || 0) + qty,
              unitPrice,
              tot: (existing.tot || 0) + tot,
              estimateQtyOld: newEstimateQtyOld,
              tolerance: newTolerance,
            };
          } else {
            updatedMaterials.push({
              code: relatedCode,
              description: item.resName || `Related item for ${nodeName}`,
              qty: qty,
              unitPrice: unitPrice,
              tot: tot,
              uom: item.uom || "NOS",
              resCd: item.id?.resCd,
              resType: item.resType || null,
              deptId: item.id?.deptId,
              lineSectionTypeId: item.id?.lineSectionTypeId,
              estimateQtyOld:
                item.estimateQtyOld != null
                  ? item.estimateQtyOld
                  : item.estimateQty != null
                  ? item.estimateQty
                  : 0,
              tolerance: item.tolerance != null ? item.tolerance : "",
            });
          }
        });
      }
      return updatedMaterials;
    });
  };

  const handleMouseDown = (e, id) => {
    e.originalEvent.stopPropagation();
    draggingMarkerRef.current = id;
    startRef.current = {
      x: e.originalEvent.clientX,
      y: e.originalEvent.clientY,
      latLng: markers.find((m) => m.id === id)?.latLng,
    };
    setSelectedMarkerId(id);
    setSelectedLineIndex(null);
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (draggingMarkerRef.current != null && startRef.current?.latLng) {
        const dx = e.clientX - startRef.current.x;
        const dy = e.clientY - startRef.current.y;
        setMarkers((prev) =>
          prev.map((m) => {
            if (m.id === draggingMarkerRef.current) {
              const point = map.latLngToContainerPoint(startRef.current.latLng);
              const newPoint = [point.x + dx, point.y + dy];
              return { ...m, latLng: map.containerPointToLatLng(newPoint) };
            }
            return m;
          })
        );
      }
    },
    [map, setMarkers]
  );

  const handleMouseUp = useCallback(() => {
    draggingMarkerRef.current = null;
    startRef.current = null;
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  // Update all conductor markers when zoom changes
  // const updateConductorMarkersOnZoom = useCallback(() => {
  //   setMarkers(prevMarkers => 
  //     prevMarkers.map(marker => {
  //       if (marker.src === conductorsIcon && marker.matchedLine) {
  //         // Recalculate scale and rotation based on current zoom
  //         const newScale = calculateConductorScale(marker);
  //         const newRotation = calculateConductorRotation(marker);
          
  //         // Only update if changed (to avoid unnecessary re-renders)
  //         if (Math.abs(newScale - (marker.scale || 1)) > 0.001 || 
  //             Math.abs(newRotation - (marker.rotation || 0)) > 0.1) {
  //           return {
  //             ...marker,
  //             scale: newScale,
  //             rotation: newRotation
  //           };
  //         }
  //       }
  //       return marker;
  //     })
  //   );
  // }, [map, zoomScale, markers]);

  useEffect(() => {
  if (!map) return;

  const updateScale = () => {
    const z = map.getZoom();
    let factor = 1;

    if (z >= 13) factor = 1;
    else if (z <= 4) factor = 0.12;
    else factor = 0.12 + ((z - 4) * (1 - 0.12)) / (13 - 4);

    factor = Math.pow(factor, 1.25);
    setZoomScale(Number(factor.toFixed(3)));
  };

  updateScale();
  map.on("zoomend", updateScale);

  return () => map.off("zoomend", updateScale);
}, [map]);


  const handleResize = (id, delta) => {
    setMarkers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, scale: Math.max(0.2, m.scale + delta) } : m
      )
    );
  };

  const handleRotate = (id, delta) => {
    setMarkers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, rotation: m.rotation + delta } : m
      )
    );
  };

  const linePoleMarkers = markers.filter(
    (m) => m.src === linePoleIcon || m.src === substationsIcon
  );
  const linePoleCoords = linePoleMarkers.map((m) => [
    m.latLng.lat,
    m.latLng.lng,
  ]);

  const handleLineClick = (index) => {
    const a = linePoleMarkers[index];
    const b = linePoleMarkers[index + 1];
    if (!a || !b) {
      setSelectedLineIndex(null);
      setSelectedLineInfo(null);
      return;
    }
    const lat1 = a.latLng.lat;
    const lng1 = a.latLng.lng;
    const lat2 = b.latLng.lat;
    const lng2 = b.latLng.lng;
    const midLat = (lat1 + lat2) / 2;
    const midLng = (lng1 + lng2) / 2;
    const dist = map.distance(a.latLng, b.latLng) / 1000;
    setSelectedLineIndex(index);
    setSelectedMarkerId(null);
    setSelectedLineInfo({ index, lat1, lng1, lat2, lng2, midLat, midLng, distanceKm: dist });
  };

  return (
    <div
      style={{ height: "100%", width: "100%" }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => {
        setSelectedMarkerId(null);
        setSelectedLineIndex(null);
        setSelectedLineInfo(null);
      }}
    >
      {markers.map((m) => {
        const isSelected =
          m.id === selectedMarkerId ||
          (selectedLineIndex !== null &&
            linePoleMarkers[selectedLineIndex]?.id === m.id) ||
          (selectedLineIndex !== null &&
            linePoleMarkers[selectedLineIndex + 1]?.id === m.id);

        const isConductor = m.src === conductorsIcon;
        
        // Calculate dynamic scale and rotation for conductors
        const dynamicScale = isConductor && m.matchedLine ? 
          calculateConductorScale(m) : 
          (m.scale || 1);
        
        const dynamicRotation = isConductor && m.matchedLine ?
          calculateConductorRotation(m) :
          (m.rotation || 0);

        // Reduce the initial height of the conductor so it appears thinner
        // Poles/Substations remain larger, others default; conductor uses a wide-but-thin base
        let baseWidth, baseHeight;
        if (m.src === linePoleIcon || m.src === substationsIcon) {
          baseWidth = 56;
          baseHeight = 56;
        } else if (isConductor) {
          baseWidth = 36; // width of the conductor icon
          baseHeight = 12; // thinner initial height
        } else {
          baseWidth = 32;
          baseHeight = 32;
        }
        
        const scaleFactor = Number((zoomScale * dynamicScale).toFixed(3));
        const scaleFactorX = Number((zoomScale * dynamicScale).toFixed(3));
        const scaleFactorY = Number((zoomScale).toFixed(3));
        const computedWidth = Math.max(8, Math.round(baseWidth * (isConductor ? scaleFactorX : scaleFactor)));
        const computedHeight = Math.max(8, Math.round(baseHeight * (isConductor ? scaleFactorY : scaleFactor)));
        const containerSize = isConductor ? Math.max(computedWidth, computedHeight) : null;

        // For conductors: keep height constant; scale only in X regardless of rotation.
        // Achieve this by using an outer wrapper that scales on X and an inner wrapper that rotates.
        const iconHtml = isConductor
          ? `<div style="
              position: relative;
              width: ${containerSize}px;
              height: ${containerSize}px;
              display: flex;
              justify-content: center;
              align-items: center;
            ">
              <div style="
                width: ${baseWidth}px;
                height: ${baseHeight}px;
                display: flex;
                justify-content: center;
                align-items: center;
                transform: rotate(${dynamicRotation}deg) scaleX(${scaleFactorX});
                transform-origin: center center;
              ">
                <img src="${m.src}" style="width:${baseWidth}px; height:${baseHeight}px; ${isHybridBase ? 'filter: invert(1) brightness(2);' : ''} pointer-events:none;" />
              </div>
              ${
                isSelected && selectedMarkerId === m.id
                  ? `<div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); display:flex; gap:4px;">
                      <button data-action="rotate-left" style="cursor:pointer;">⟲</button>
                      <button data-action="rotate-right" style="cursor:pointer;">⟳</button>
                    </div>
                    <div style="position:absolute; bottom:-12px; left:50%; transform:translateX(-50%); display:flex; gap:4px;">
                      <button data-action="scale-down" style="cursor:pointer;">➖</button>
                      <button data-action="scale-up" style="cursor:pointer;">➕</button>
                    </div>`
                  : ""
              }
            </div>`
          : `<div style="
              position: relative;
              width: ${computedWidth}px;
              height: ${computedHeight}px;
              display: flex;
              justify-content: center;
              align-items: center;
            ">
              <div style="
                width: ${baseWidth}px;
                height: ${baseHeight}px;
                display: flex;
                justify-content: center;
                align-items: center;
                transform: scale(${scaleFactor}) rotate(${dynamicRotation}deg);
                transform-origin: center center;
              ">
                <img src="${m.src}" style="width:${baseWidth}px; height:${baseHeight}px; ${isHybridBase ? 'filter: invert(1) brightness(2);' : ''} pointer-events:none;" />
              </div>
              ${
                isSelected && selectedMarkerId === m.id
                  ? `<div style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); display:flex; gap:4px;">
                      <button data-action="rotate-left" style="cursor:pointer;">⟲</button>
                      <button data-action="rotate-right" style="cursor:pointer;">⟳</button>
                    </div>
                    <div style="position:absolute; bottom:-12px; left:50%; transform:translateX(-50%); display:flex; gap:4px;">
                      <button data-action="scale-down" style="cursor:pointer;">➖</button>
                      <button data-action="scale-up" style="cursor:pointer;">➕</button>
                    </div>`
                  : ""
              }
            </div>`;

        return (
          <Marker
            key={m.id}
            position={m.latLng}
            icon={L.divIcon({
              className: "",
              html: iconHtml,
              iconSize: isConductor ? [containerSize, containerSize] : [computedWidth, computedHeight],
              iconAnchor: isConductor
                ? [Math.floor(containerSize / 2), Math.floor(containerSize / 2)]
                : [Math.floor(computedWidth / 2), Math.floor(computedHeight / 2)],
            })}
            eventHandlers={{
              click: () => setSelectedMarkerId(m.id),
              mousedown: (e) => {
                const domEvent = e.originalEvent;
                const target = domEvent.target.closest("[data-action]");
                if (target) {
                  const actionType = target.getAttribute("data-action");
                  if (actionType === "rotate-left") handleRotate(m.id, -5);
                  if (actionType === "rotate-right") handleRotate(m.id, 5);
                  // Resize steps: conductors ±0.5, others ±0.1
                  if (actionType === "scale-up") handleResize(m.id, isConductor ? 0.5 : 0.1);
                  if (actionType === "scale-down") handleResize(m.id, isConductor ? -0.5 : -0.1);
                } else {
                  handleMouseDown(e, m.id);
                }
              },
            }}
          >
            <Popup>
              <div>
                <strong>{m.name}</strong>
                <br />
                ID: {m.nodeId}
                <br />
                {m.latLng.lat.toFixed(4)}° N, {m.latLng.lng.toFixed(4)}° E
                {isConductor && m.matchedLine && (
                  <>
                    <br />
                    <br />
                    <strong>Aligned Line:</strong>
                    <div style={{ marginLeft: 8 }}>
                      <div>
                        <em>Distance:</em> {Number(m.matchedLine.distanceKm).toFixed(3)} km
                      </div>
                      <div>
                        <em>Endpoint A:</em> {m.matchedLine.a?.name || "(unknown)"}
                        {" "}({Number(m.matchedLine.a?.lat).toFixed(6)}, {Number(m.matchedLine.a?.lng).toFixed(6)})
                      </div>
                      <div>
                        <em>Endpoint B:</em> {m.matchedLine.b?.name || "(unknown)"}
                        {" "}({Number(m.matchedLine.b?.lat).toFixed(6)}, {Number(m.matchedLine.b?.lng).toFixed(6)})
                      </div>
                      <div>
                        <em>Dynamic Scale:</em> {dynamicScale.toFixed(3)}
                      </div>
                      <div>
                        <em>Dynamic Rotation:</em> {dynamicRotation.toFixed(1)}°
                      </div>
                    </div>
                  </>
                )}
                {m.relatedData && m.relatedData.length > 0 && (
                  <>
                    <br />
                    <br />
                    <strong>Related Materials:</strong>
                    <ul
                      style={{
                        margin: 0,
                        paddingLeft: "16px",
                        fontSize: "12px",
                      }}
                    >
                      {m.relatedData.slice(0, 3).map((item, index) => (
                        <li key={index}>
                          {item.resName} - {item.estimateQty} {item.uom}
                        </li>
                      ))}
                      {m.relatedData.length > 3 && (
                        <li>... and {m.relatedData.length - 3} more</li>
                      )}
                    </ul>
                  </>
                )}
              </div>
            </Popup>
          </Marker>
        );
      })}

      {linePoleCoords.length >= 2 &&
        linePoleMarkers.slice(0, -1).map((m, i) => {
          const nextM = linePoleMarkers[i + 1];
          const lineLatLngs = [m.latLng, nextM.latLng];
          const isLineSelected = i === selectedLineIndex;

          return (
            <React.Fragment key={`line-${i}`}>
              <Polyline
                positions={lineLatLngs}
                color="transparent"
                weight={isLineSelected ? 5 : 3}
                eventHandlers={{
                  click: () => handleLineClick(i),
                }}
              />
            </React.Fragment>
          );
        })}

      {selectedLineInfo && (
        <Marker
          key={`line-popup-${selectedLineInfo.index}`}
          position={[selectedLineInfo.midLat, selectedLineInfo.midLng]}
          icon={L.divIcon({ className: "line-popup-marker", html: `<div></div>` })}
        >
          <Popup>
            <div style={{ fontSize: 12, maxWidth: 320 }}>
              <div style={{ marginBottom: 6 }}>
                <strong>Distance:</strong> {selectedLineInfo.distanceKm.toFixed(3)} km
              </div>
              <div style={{ marginBottom: 6 }}>
                <strong>Endpoint A:</strong>
                <div style={{ marginLeft: 8 }}>
                  <div>
                    <em>Name:</em>{" "}
                    {linePoleMarkers[selectedLineInfo.index]?.name || "(unknown)"}
                  </div>
                  <div>
                    <em>Coordinates:</em>{" "}
                    {selectedLineInfo.lat1.toFixed(6)}, {selectedLineInfo.lng1.toFixed(6)}
                  </div>
                </div>
              </div>
              <div>
                <strong>Endpoint B:</strong>
                <div style={{ marginLeft: 8 }}>
                  <div>
                    <em>Name:</em>{" "}
                    {linePoleMarkers[selectedLineInfo.index + 1]?.name || "(unknown)"}
                  </div>
                  <div>
                    <em>Coordinates:</em>{" "}
                    {selectedLineInfo.lat2.toFixed(6)}, {selectedLineInfo.lng2.toFixed(6)}
                  </div>
                </div>
              </div>
            </div>
          </Popup>
        </Marker>
      )}
    </div>
  );
};

// icons are imported at top of file

export default MapDrop;