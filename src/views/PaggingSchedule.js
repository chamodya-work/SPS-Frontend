// views/PaggingSchedule.js (refactored version)
import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Circle,
  Marker,
} from "react-leaflet";
import { DndContext } from "@dnd-kit/core";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { TreeView, flattenTree, buildTree } from "../components/PaggingSchedule/TreeView";
import EstimationTable from "../components/PaggingSchedule/EstimationTable";
import MapDrop from "../components/PaggingSchedule/MapDrop";
import { getIconForItem, extractUnitPrice } from "../components/PaggingSchedule/helpers";
import AssociatedMaterials from "components/CalculateEstimate/MaterialsTable/AssociatedMaterials";
import ResetMap from "components/CalculateEstimate/Button/ResetMap";
import SaveMap from "components/CalculateEstimate/Button/SaveMap";
import LoadMap from "components/CalculateEstimate/Button/LoadMap";
import MastersModal from "components/CalculateEstimate/MaterialsTable/MastersModal";
import DeleteSelected from "components/CalculateEstimate/Button/DeleteSelected";
import "../assets/styles/index.css";

// Get API base URL from environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const CenterMapTo = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    if (lat != null && lng != null)
      map.setView([lat, lng], 13, { animate: true });
  }, [lat, lng, map]);
  return null;
};

const PaggingSchedule = ({ onClosePopup }) => {
  const baseUrl = `${API_BASE_URL}/api/sppeg`;
  const [selectedNode, setSelectedNode] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchLatLng, setSearchLatLng] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [selectedMarkerId, setSelectedMarkerId] = useState(null);
  const [showEstimatePopup, setShowEstimatePopup] = useState(false);
  const [mastersOpen, setMastersOpen] = useState(false);
  const [showModifyPopup, setShowModifyPopup] = useState(false);
  const [modifyEstimateNo, setModifyEstimateNo] = useState("");
  const [modifyLoading, setModifyLoading] = useState(false);
  const [modifyError, setModifyError] = useState(null);
  const [modifyData, setModifyData] = useState(null);
  const [modifyValidation, setModifyValidation] = useState({});
  const [flatTreeNodes, setFlatTreeNodes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showInlineSearch, setShowInlineSearch] = useState(false);
  const [showComponentsTree, setShowComponentsTree] = useState(true);
  const [userLocation, setUserLocation] = useState(null);
  const [isWatchingLocation, setIsWatchingLocation] = useState(false);
  const watchIdRef = useRef(null);
  const [mapType, setMapType] = useState('map'); // 'map' | 'satellite' | 'hybrid' | 'topo'
  const [showMapTypeMenu, setShowMapTypeMenu] = useState(false);
  const [showEstimationMenu, setShowEstimationMenu] = useState(false);
  const [isNarrow, setIsNarrow] = useState(false); // tablet/mobile breakpoint
  // Inline search suggestions (Sri Lanka locations)
  const [suggestions, setSuggestions] = useState([]);
  const suggestTimerRef = useRef(null);

  // MapDrop's lightweight layer toggle (small map) -> update our base layer
  const handleBaseLayerChange = (key) => {
    try {
      const k = String(key || '').toLowerCase();
      const next =
        k === 'map' ? 'map' :
        k === 'satellite' ? 'satellite' :
        k === 'hybrid' ? 'hybrid' :
        k === 'topographic' ? 'topo' : null;
      if (next) setMapType(next);
    } catch {}
  };

  const userPulseIcon = useMemo(
    () =>
      L.divIcon({
        className: "",
        html: '<div class="pulse-marker"></div>',
        iconSize: [14, 14],
        iconAnchor: [7, 7],
      }),
    []
  );
  const mapWrapperRef = useRef(null);

  const selLat =
    selectedNode?.lat != null ? Number(selectedNode.lat) : undefined;
  const selLng =
    selectedNode?.lng != null ? Number(selectedNode.lng) : undefined;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/sppeg`)
      .then((res) => res.json())
      .then((data) => setFlatTreeNodes(flattenTree(buildTree(data))))
      .catch(console.error);
    const onResize = () => setIsNarrow(window.innerWidth <= 1024);
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Ensure map resizes correctly when toggling expanded-in-page
  useEffect(() => {
    if (!mapInstance) return;
    const t = setTimeout(() => {
      try { mapInstance.invalidateSize(); } catch (e) {}
    }, 250);
    return () => clearTimeout(t);
  }, [isExpanded, mapInstance]);

  // Also react to container size changes (width/height) to reflow tiles
  useEffect(() => {
    if (!mapInstance || !mapWrapperRef.current) return;
    const el = mapWrapperRef.current;
    const obs = new ResizeObserver(() => {
      try { mapInstance.invalidateSize(); } catch (e) {}
    });
    obs.observe(el);
    return () => {
      try { obs.disconnect(); } catch (e) {}
    };
  }, [mapInstance]);

  // Allow Escape to exit expanded mode
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && isExpanded) setIsExpanded(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isExpanded]);

  // Restore Components Tree visibility when exiting expanded map
  useEffect(() => {
    if (!isExpanded) setShowComponentsTree(true);
  }, [isExpanded]);

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&countrycodes=lk&limit=8&q=${encodeURIComponent(
          searchText
        )}`
      );
      const data = await res.json();
      if (data && data.length > 0)
        setSearchLatLng({
          lat: parseFloat(data[0].lat),
          lng: parseFloat(data[0].lon),
        });
      else alert("Location not found!");
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // Debounced suggestions while typing (Sri Lanka only)
  useEffect(() => {
    // clear pending timer
    if (suggestTimerRef.current) {
      clearTimeout(suggestTimerRef.current);
      suggestTimerRef.current = null;
    }
    if (!showInlineSearch) { setSuggestions([]); return; }
    const q = (searchText || '').trim();
    if (q.length < 2) { setSuggestions([]); return; }
    suggestTimerRef.current = setTimeout(async () => {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&countrycodes=lk&limit=8&q=${encodeURIComponent(q)}`;
        const res = await fetch(url, { headers: { 'Accept-Language': 'en' } });
        const data = await res.json();
        const items = Array.isArray(data) ? data.map(d => ({
          label: d.display_name,
          lat: parseFloat(d.lat),
          lng: parseFloat(d.lon),
        })) : [];
        setSuggestions(items);
      } catch (e) {
        setSuggestions([]);
      }
    }, 250);
    return () => {
      if (suggestTimerRef.current) {
        clearTimeout(suggestTimerRef.current);
        suggestTimerRef.current = null;
      }
    };
  }, [searchText, showInlineSearch]);

  const handleSuggestionSelect = (s) => {
    if (!s) return;
    try {
      setSearchText(s.label);
      setSearchLatLng({ lat: s.lat, lng: s.lng });
      setSuggestions([]);
    } catch {}
  };

  const stopLocationWatch = () => {
    try {
      if (watchIdRef.current != null && navigator.geolocation?.clearWatch) {
        navigator.geolocation.clearWatch(watchIdRef.current);
      }
    } catch (e) {}
    watchIdRef.current = null;
    setIsWatchingLocation(false);
  };

  const startLocationWatch = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    try {
      // If Permissions API is available, pre-check and inform user on 'denied'
      if (navigator.permissions && navigator.permissions.query) {
        try {
          const status = await navigator.permissions.query({ name: 'geolocation' });
          if (status.state === 'denied') {
            alert(
              'Location is blocked for this site.\nPlease enable it in your browser\'s Site settings for this origin.'
            );
            return;
          }
        } catch {}
      }
    } catch {}

    // Start watching
    try {
      const id = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude, accuracy } = pos.coords;
          const loc = { lat: latitude, lng: longitude, accuracy: accuracy || 20 };
          setUserLocation(loc);
          try {
            if (mapInstance && !isWatchingLocation) {
              mapInstance.setView([latitude, longitude], Math.max(mapInstance.getZoom(), 17), { animate: true });
            }
          } catch (e) {}
          setIsWatchingLocation(true);
        },
        (err) => {
          console.warn('Locate error', err);
          let msg = 'Unable to get your location.';
          if (err && typeof err.code === 'number') {
            if (err.code === 1) msg = 'Location permission denied. Please allow location access for this site.';
            if (err.code === 2) msg = 'Position unavailable. Try moving to an open area or enabling GPS.';
            if (err.code === 3) msg = 'Location request timed out. Try again.';
          }
          alert(msg);
          stopLocationWatch();
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
      watchIdRef.current = id;
    } catch (e) {
      alert('Failed to start location tracking.');
    }
  };

  const handleLocateMe = () => {
    if (isWatchingLocation) {
      stopLocationWatch();
    } else {
      startLocationWatch();
    }
  };

  useEffect(() => {
    return () => {
      stopLocationWatch();
    };
  }, []);

  // --- Modify estimate handlers ---
  const handleModifySearch = async () => {
    if (!modifyEstimateNo || !modifyEstimateNo.trim()) {
    }
    setModifyLoading(true);
    setModifyError(null);
    setModifyData(null);
    try {
      // First try to fetch material/detail rows from the working endpoint
      let details = [];
      try {
        const dres = await fetch(`${API_BASE_URL}/api/spPeggingDmt/lineSectionType/${encodeURIComponent(modifyEstimateNo)}`);
        if (dres.ok) {
          details = await dres.json();
          // normalize numeric fields for editing
          details = details.map((d) => ({
            ...d,
            estimateQty: d.estimateQty ?? d.estimate_qty ?? d.qty ?? d.quantity ?? 0,
            unitPrice: d.unitPrice ?? d.unit_price ?? extractUnitPrice(d) ?? 0,
          }));
        } else {
          // if details endpoint returns non-OK, log but don't fail completely
          const txt = await dres.text();
          console.warn('Details fetch returned non-ok', dres.status, txt);
        }
      } catch (e) {
        console.warn('Details fetch error', e);
      }

      // Optionally try to fetch header metadata (pcesthtt). If not present, continue with details only.
      let header = null;
      try {
        const hres = await fetch(`${API_BASE_URL}/api/pcesthtt/${encodeURIComponent(modifyEstimateNo)}`);
        if (hres.ok) header = await hres.json();
      } catch (e) {
        // ignore header errors
      }

      setModifyData({ header, details });
    } catch (err) {
      console.error(err);
      setModifyError(err instanceof Error ? err.message : String(err));
    } finally {
      setModifyLoading(false);
    }
  };

  const handleModifySave = async () => {
    if (!modifyData || !modifyData.header) return;
    // Basic validation example
    const hdr = { ...modifyData.header };
    const issues = {};
    if (!hdr.estimateNo) issues.estimateNo = "Estimate Number is required";
    if (!hdr.costCenter) issues.costCenter = "Cost Center is required";
    setModifyValidation(issues);
    if (Object.keys(issues).length) return;

    try {
      const putRes = await fetch(`${API_BASE_URL}/api/pcesthtt/${encodeURIComponent(hdr.estimateNo)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hdr),
      });
      if (!putRes.ok) {
        const txt = await putRes.text();
        throw new Error(`Save failed: ${putRes.status} ${putRes.statusText} ${txt}`);
      }
      alert('Estimate header updated successfully');
      setShowModifyPopup(false);
    } catch (e) {
      console.error(e);
      alert('Failed to save changes: ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  // Detail row helpers: edit, add, remove, save
  const handleDetailChange = (index, field, value) => {
    setModifyData((prev) => {
      if (!prev) return prev;
      const details = Array.isArray(prev.details) ? [...prev.details] : [];
      details[index] = { ...details[index], [field]: value };
      return { ...prev, details };
    });
  };

  const handleAddDetail = () => {
    const newRow = {
      id: { resCd: '' },
      resName: '',
      uom: '',
      estimateQty: 1,
      unitPrice: 0,
      tolerance: 0,
      _isNew: true,
    };
    setModifyData((prev) => {
      const details = Array.isArray(prev?.details) ? [newRow, ...prev.details] : [newRow];
      return { ...(prev || {}), details };
    });
  };

  const handleRemoveDetail = (index) => {
    setModifyData((prev) => {
      if (!prev) return prev;
      const details = [...(prev.details || [])];
      details.splice(index, 1);
      return { ...prev, details };
    });
  };

  const handleSaveDetails = async () => {
    if (!modifyData || !modifyData.details || modifyData.details.length === 0) {
      alert('No detail rows to save');
      return;
    }
    const estimateNo = modifyData.header?.estimateNo || modifyEstimateNo;
    if (!estimateNo) {
      alert('Estimate number required to save details');
      return;
    }
    try {
      const url = `${API_BASE_URL}/api/spPeggingDmt/estimate?estimateNo=${encodeURIComponent(estimateNo)}`;
      const res = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(modifyData.details),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Save details failed: ${res.status} ${res.statusText} ${txt}`);
      }
      alert('Details saved successfully');
    } catch (e) {
      console.error(e);
      alert('Failed to save details: ' + (e instanceof Error ? e.message : String(e)));
    }
  };

  // Helpers: format currency and compute totals for modify details
  const formatCurrency = (v) => {
    const n = Number(v || 0);
    // no decimals for LKR, use comma grouping
    return n.toLocaleString('en-US');
  };

  const computeDetailsTotal = (details) => {
    if (!Array.isArray(details)) return 0;
    return details.reduce((sum, r) => {
      const q = Number(r.estimateQty || 0);
      const p = Number(r.unitPrice || 0);
      return sum + q * p;
    }, 0);
  };

  return (
    <DndContext>
      {/* Keep Admin layout's background and header; use a simple spacer + full-width card */}
      <div className="w-full px-2 sm:px-3 md:px-4">
        <div className="relative flex flex-row w-full min-w-0 p-4 bg-white rounded shadow-lg">
            {/* Left Sidebar (hidden when expanded) */}
            <div
              className="sidebar"
              style={{
                width: 300,
                minWidth: 240,
                display: isExpanded ? "none" : "flex",
                flexDirection: "column",
                gap: 10,
                paddingRight: 6,
                boxSizing: "border-box",
              }}
            >
              {/* Components Tree Section */}
              <div className="mb-4 sidebar-section components-tree">
                <div className="px-3 py-2 text-center bg-blue-100 rounded-t-lg">
                  <span className="text-sm font-semibold text-blueGray-700">
                    Components Tree
                  </span>
                </div>
                <div
                  className="p-2 bg-white border rounded-b-lg"
                  style={{ height: 260, overflowY: "auto" }}
                >
                  <TreeView 
                    baseUrl={baseUrl} 
                    onSelectNode={setSelectedNode}
                    getIconForItem={getIconForItem}
                    isHybridBase={mapType === 'hybrid'}
                  />
                </div>
              </div>

              {/* Associated Materials Section */}
              <div className="sidebar-section materials-section">
                <div className="px-3 py-2 text-center bg-blue-100 rounded-t-lg">
                  <span className="text-sm font-semibold text-blueGray-700">
                    Associated Materials
                  </span>
                </div>
                <div
                  className="p-2 bg-white border rounded-b-lg"
                  style={{ height: 200, overflowY: "auto" }}
                >
                  <AssociatedMaterials
                    materials={materials}
                    markers={markers}
                  />
                </div>
              </div>
            </div>

            {/* Right Map Area */}
            <div
              className="map-area"
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: 8,
                paddingRight: 8,
                boxSizing: "border-box",
              }}
            >
              <div
                className="header"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  width: "100%",
                }}
              >
                {!isExpanded && (
                  <>
                    <div
                      className="controls"
                      style={{
                        display: "flex",
                        gap: 6,
                        alignItems: "center",
                        flexWrap: "nowrap",
                        overflowX: "auto",
                        WebkitOverflowScrolling: "touch",
                      }}
                    >
                      <ResetMap
                        setMarkers={setMarkers}
                        setMaterials={setMaterials}
                        setSearchText={setSearchText}
                        setSearchLatLng={setSearchLatLng}
                        mapInstance={mapInstance}
                      />
                      <SaveMap markers={markers} />
                      <LoadMap setMarkers={setMarkers} mapInstance={mapInstance} />
                      <DeleteSelected
                        markers={markers}
                        setMarkers={setMarkers}
                        selectedMarkerId={selectedMarkerId}
                        setSelectedMarkerId={setSelectedMarkerId}
                      />
                      {isNarrow ? (
                        <div className="estimation-menu-wrap" style={{ position: 'relative' }}>
                          <button
                            onClick={() => setShowEstimationMenu((v) => !v)}
                            title="Estimation actions"
                            type="button"
                            className="app-btn app-btn--primary"
                          >
                            Estimation ▾
                          </button>
                          {showEstimationMenu && (
                            <div className="estimation-menu">
                              <button
                                onClick={() => { setShowEstimationMenu(false); setShowEstimatePopup(true); }}
                                type="button"
                                className="app-btn app-btn--ghost"
                              >
                                Estimate
                              </button>
                              <button
                                onClick={() => { setShowEstimationMenu(false); setShowModifyPopup(true); }}
                                type="button"
                                className="app-btn app-btn--ghost"
                              >
                                Modify
                              </button>
                              <button
                                onClick={() => {
                                  if (!selectedNode?.id) {
                                    alert("Please click on an icon/node first before opening Masters.");
                                    return;
                                  }
                                  setShowEstimationMenu(false);
                                  setMastersOpen(true);
                                }}
                                type="button"
                                className="app-btn app-btn--ghost"
                              >
                                Masters
                              </button>
                            </div>
                          )}
                        </div>
                      ) : (
                        <>
                          <button
                            onClick={() => setShowModifyPopup(true)}
                            title="Modify Estimate"
                            type="button"
                            className="app-btn app-btn--primary"
                          >
                            Modify
                          </button>
                          <button
                            onClick={() => setShowEstimatePopup(true)}
                            title="Open Estimates"
                            type="button"
                            className="app-btn app-btn--primary"
                          >
                            Estimate
                          </button>
                          <button
                            onClick={() => {
                              if (!selectedNode?.id) {
                                alert("Please click on an icon/node first before opening Masters.");
                                return;
                              }
                              setMastersOpen(true);
                            }}
                            title="Open Masters"
                            type="button"
                            className="app-btn app-btn--primary"
                          >
                            Masters
                          </button>
                        </>
                      )}
                    </div>               
                  </>
                )}
              </div>
              <div
                className="map-container-wrapper"
                style={{
                  height: isExpanded ? "86vh" : "75vh",
                  minHeight: 480,
                  marginTop: 12,
                  position: "relative",
                }}
                ref={mapWrapperRef}
                onClick={(e) => {
                  // Hide inline search when clicking outside its controls (both modes)
                  const t = e.target;
                  const withinSearch = t.closest?.('.inline-search-control') || t.closest?.('.inline-search-input');
                  if (!withinSearch) setShowInlineSearch(false);
                  // Expanded-mode layer menu close
                  if (isExpanded) {
                    const withinLayer = t.closest?.('.maptype-control') || t.closest?.('.maptype-menu');
                    if (!withinLayer) setShowMapTypeMenu(false);
                  }
                }}
              >
                <MapContainer
                  center={[7.8731, 80.7718]}
                  zoom={12}
                  maxZoom={19}
                  style={{ height: "100%", width: "100%" }}
                  whenCreated={(mapInstanceRef) => setMapInstance(mapInstanceRef)}
                >
                  {/* Base layers and overlays controlled by mapType state */}
                  {mapType === 'map' && (
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                      maxZoom={19}
                    />
                  )}
                  {mapType === 'satellite' && (
                    <TileLayer
                      url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                      attribution="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
                      maxZoom={19}
                    />
                  )}
                  {mapType === 'topo' && (
                    <TileLayer
                      url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
                      attribution="Map data © OpenStreetMap contributors, SRTM | Map style © OpenTopoMap (CC-BY-SA)"
                      maxZoom={17}
                    />
                  )}
                  {mapType === 'hybrid' && (
                    <>
                      <TileLayer
                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                        attribution="Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community"
                        maxZoom={19}
                      />
                      <TileLayer
                        url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}"
                        attribution="Roads © Esri — Reference/World_Transportation"
                        opacity={0.9}
                        maxZoom={19}
                      />
                      <TileLayer
                        url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                        attribution="Labels © Esri — Reference/World_Boundaries_and_Places"
                        opacity={0.95}
                        maxZoom={19}
                      />
                    </>
                  )}
                  <MapDrop
                    markers={markers}
                    setMarkers={setMarkers}
                    setMaterials={setMaterials}
                    selectedMarkerId={selectedMarkerId}
                    setSelectedMarkerId={setSelectedMarkerId}
                    getIconForItem={getIconForItem}
                    extractUnitPrice={extractUnitPrice}
                    flatTreeNodes={flatTreeNodes}
                    // Show the small toggle under '-' only in non-expanded mode
                    showLayerToggleUI={!isExpanded}
                    onBaseLayerChange={handleBaseLayerChange}
                    isHybridBase={mapType === 'hybrid'}
                  />
                  {selLat != null && selLng != null && (
                    <CenterMapTo lat={selLat} lng={selLng} />
                  )}
                  {searchLatLng && (
                    <CenterMapTo lat={searchLatLng.lat} lng={searchLatLng.lng} />
                  )}
                  {userLocation && (
                    <Circle
                      center={[userLocation.lat, userLocation.lng]}
                      radius={userLocation.accuracy ? Math.max(15, userLocation.accuracy) : 25}
                      pathOptions={{ color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 0.35 }}
                    />
                  )}
                  {userLocation && (
                    <Marker
                      position={[userLocation.lat, userLocation.lng]}
                      icon={userPulseIcon}
                    />
                  )}
                </MapContainer>

                {/* Expand icon (top-right) and separate Shrink icon (top-left) */}
                {!isExpanded ? (
                  <>
                    <button
                      onClick={() => setIsExpanded(true)}
                      title="Enlarge map in this page"
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        zIndex: 1000,
                        background: "#ffffff",
                        border: "1px solid #cbd5e1",
                        borderRadius: 6,
                        padding: "6px 8px",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                        cursor: "pointer",
                      }}
                    >
                      ⛶
                    </button>

                    {/* Small-map: inline search toggle like Leaflet controls */}
                    <div
                      className="leaflet-control leaflet-bar inline-search-control"
                      style={{ position: "absolute", top: 112, left: 12, zIndex: 1000 }}
                    >
                      <a
                        href="#"
                        role="button"
                        title={showInlineSearch ? "Hide search" : "Show search"}
                        onClick={(e) => { e.preventDefault(); setShowInlineSearch((v) => !v); }}
                        className="leaflet-control-zoom-in"
                        style={{ width: 30, height: 30, lineHeight: "30px", textAlign: "center", fontSize: 16 }}
                      >
                        🔍
                      </a>
                    </div>

                    {/* Small-map: inline search input overlay */}
                    {showInlineSearch && (
                      <div
                        className="inline-search-input"
                        style={{
                          position: "absolute",
                          top: 110,
                          left: 52,
                          zIndex: 1000,
                          background: "#fff",
                          border: "1px solid #cbd5e1",
                          borderRadius: 6,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                          padding: 6,
                          display: 'flex',
                          gap: 6,
                          alignItems: 'center',
                          flexDirection: 'column',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <input
                            type="text"
                            placeholder="Search location..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            style={{
                              width: 280,
                              padding: "6px 10px",
                              border: "1px solid #cbd5e1",
                              borderRadius: 8,
                            }}
                          />
                          <button
                            onClick={handleSearch}
                            type="button"
                            className="app-btn app-btn--primary"
                            style={{ padding: '6px 10px', fontSize: 13 }}
                          >
                            Search
                          </button>
                        </div>
                        {suggestions.length > 0 && (
                          <div className="suggest-list" style={{ width: 100 + '%', maxHeight: 220, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 6 }}>
                            {suggestions.map((s, i) => (
                              <div
                                key={i}
                                className="suggest-item"
                                onClick={() => handleSuggestionSelect(s)}
                                style={{ padding: '8px 10px', cursor: 'pointer' }}
                              >
                                {s.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Shrink icon on the left side styled like Leaflet zoom controls */}
                    <div
                      className="leaflet-control leaflet-bar"
                      style={{
                        position: "absolute",
                        top: 74,
                        left: 12,
                        zIndex: 1000,
                        borderRadius: 4,
                      }}
                    >
                      <a
                        href="#"
                        role="button"
                        title="Back to normal size"
                        onClick={(e) => { e.preventDefault(); setIsExpanded(false); }}
                        className="leaflet-control-zoom-out"
                        style={{
                          borderRadius: 4,
                          width: 30,
                          height: 30,
                          lineHeight: "30px",
                          textAlign: "center",
                          fontSize: 16,
                        }}
                      >
                        ⤡
                      </a>
                    </div>

                    {/* Inline search toggle control under shrink button (expanded only) */}
                    <div
                      className="leaflet-control leaflet-bar inline-search-control"
                      style={{
                        position: "absolute",
                        top: 105,
                        left: 12,
                        zIndex: 1000,
                      }}
                    >
                      <a
                        href="#"
                        role="button"
                        title={showInlineSearch ? "Hide search" : "Show search"}
                        onClick={(e) => { e.preventDefault(); setShowInlineSearch((v) => !v); }}
                        className="leaflet-control-zoom-in"
                        style={{
                          width: 30,
                          height: 30,
                          lineHeight: "30px",
                          textAlign: "center",
                          fontSize: 16,
                        }}
                      >
                        🔍
                      </a>
                    </div>

                    {/* Map type toggle button below the search button (expanded only) */}
                    <div
                      className="leaflet-control leaflet-bar maptype-control"
                      style={{
                        position: "absolute",
                        top: 140,
                        left: 12,
                        zIndex: 1000,
                        borderRadius: 4,
                      }}
                    >
                      <a
                        href="#"
                        role="button"
                        title={`Layers`}
                        onClick={(e) => { e.preventDefault(); setShowMapTypeMenu((v) => !v); }}
                        style={{
                          width: 30,
                          height: 30,
                          lineHeight: "30px",
                          textAlign: "center",
                          fontSize: 18,
                          background: '#ffffff',
                          color: '#111827',
                          border: '1px solid #cbd5e1',
                          borderRadius: 4,
                        }}
                      >
                        ⋯
                      </a>
                    </div>

                    {showMapTypeMenu && (
                      <div
                        className="maptype-menu"
                        style={{
                          position: 'absolute',
                          top: 140,
                          left: 52,
                          zIndex: 1000,
                          background: '#fff',
                          border: '1px solid #cbd5e1',
                          borderRadius: 6,
                          boxShadow: '0 2px 6px rgba(0,0,0,0.12)',
                          padding: 6,
                          width: 210,
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {[
                          { key: 'map', label: 'Map' },
                          { key: 'satellite', label: 'Satellite' },
                          { key: 'hybrid', label: 'Hybrid (Satellite + Roads)' },
                          { key: 'topo', label: 'Topographic' },
                        ].map((opt) => (
                          <div
                            key={opt.key}
                            onClick={() => { setMapType(opt.key); setShowMapTypeMenu(false); }}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              padding: '6px 8px',
                              cursor: 'pointer',
                              background: mapType === opt.key ? '#eff6ff' : 'transparent',
                              borderRadius: 4,
                            }}
                          >
                            <span
                              aria-hidden
                              style={{
                                width: 14,
                                height: 14,
                                borderRadius: 8,
                                border: '2px solid #b91c1c',
                                background: mapType === opt.key ? '#dc2626' : '#fff',
                                display: 'inline-block',
                              }}
                            />
                            <span style={{ fontSize: 13, color: '#111827' }}>{opt.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    
                    {showInlineSearch && (
                      <div
                        className="inline-search-input"
                        style={{
                          position: "absolute",
                          top: 110,
                          left: 52,
                          zIndex: 1000,
                          background: "#fff",
                          border: "1px solid #cbd5e1",
                          borderRadius: 6,
                          boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
                          padding: 6,
                          display: 'flex',
                          gap: 6,
                          alignItems: 'center',
                          flexDirection: 'column',
                        }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                          <input
                            type="text"
                            placeholder="Search location..."
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            style={{
                              width: 280,
                              padding: "6px 10px",
                              border: "1px solid #cbd5e1",
                              borderRadius: 8,
                            }}
                          />
                          <button
                            onClick={handleSearch}
                            type="button"
                            className="app-btn app-btn--primary"
                            style={{ padding: '6px 10px', fontSize: 13 }}
                          >
                            Search
                          </button>
                        </div>
                        {suggestions.length > 0 && (
                          <div className="suggest-list" style={{ width: 100 + '%', maxHeight: 220, overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: 6 }}>
                            {suggestions.map((s, i) => (
                              <div
                                key={i}
                                className="suggest-item"
                                onClick={() => handleSuggestionSelect(s)}
                                style={{ padding: '8px 10px', cursor: 'pointer' }}
                              >
                                {s.label}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Locate me control (shown in both modes) */}
                {/* {(!isExpanded) ? (
                  <div
                    className="leaflet-control leaflet-bar"
                    style={{ position: "absolute", top: 74, left: 12, zIndex: 1000, borderRadius: 4 }}
                  >
                    <a
                      href="#"
                      role="button"
                      title={isWatchingLocation ? "Stop live location" : "Show my location"}
                      onClick={(e) => { e.preventDefault(); handleLocateMe(); }}
                      style={{ width: 30, height: 30, lineHeight: "30px", textAlign: "center", fontSize: 16 }}
                    >
                      {isWatchingLocation ? '🛑' : '📍'}
                    </a>
                  </div>
                ) : (
                  <div
                    className="leaflet-control leaflet-bar"
                    style={{ position: "absolute", top: 136, left: 12, zIndex: 1000, borderRadius: 4 }}
                  >
                    <a
                      href="#"
                      role="button"
                      title={isWatchingLocation ? "Stop live location" : "Show my location"}
                      onClick={(e) => { e.preventDefault(); handleLocateMe(); }}
                      style={{ width: 30, height: 30, lineHeight: "30px", textAlign: "center", fontSize: 16 }}
                    >
                      {isWatchingLocation ? '🛑' : '📍'}
                    </a>
                  </div>
                )} */}

                {/* Three-dot toggle to re-open Components Tree (shown only when hidden) */}
                {isExpanded && !showComponentsTree && (
                  <div
                    className="leaflet-control leaflet-bar"
                    style={{ position: "absolute", top: 8, right: 8, zIndex: 1001, borderRadius: 4 }}
                  >
                    <a
                      href="#"
                      role="button"
                      title="Show components"
                      onClick={(e) => { e.preventDefault(); setShowComponentsTree(true); }}
                      style={{ width: 30, height: 30, lineHeight: "30px", textAlign: "center", fontSize: 18 }}
                    >
                      ⋯
                    </a>
                  </div>
                )}

                {/* Floating component tree when expanded (top-right inside map area) */}
                {isExpanded && showComponentsTree && (
                  <div
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      width: 280,
                      maxHeight: "65vh",
                      overflowY: "auto",
                      background: "rgba(255,255,255,0.95)",
                      border: "1px solid #cbd5e1",
                      borderRadius: 8,
                      boxShadow: "0 4px 10px rgba(0,0,0,0.12)",
                      zIndex: 1000,
                    }}
                  >
                    <div className="px-2 py-1 text-center bg-blue-100 rounded-t-lg" style={{ position: 'relative' }}>
                      <span className="text-xs font-semibold text-blueGray-700">Components Tree</span>
                      {/* In-panel toggle button to hide Components Tree */}
                      <button
                        type="button"
                        title="Hide components"
                        onClick={() => setShowComponentsTree(false)}
                        style={{
                          position: 'absolute',
                          top: 4,
                          right: 6,
                          width: 22,
                          height: 22,
                          lineHeight: '20px',
                          textAlign: 'center',
                          fontSize: 16,
                          background: '#fff',
                          border: '1px solid #cbd5e1',
                          borderRadius: 6,
                          boxShadow: '0 1px 2px rgba(0,0,0,0.08)',
                          cursor: 'pointer',
                        }}
                      >
                        ⋯
                      </button>
                    </div>
                    <div className="p-2 bg-white rounded-b-lg" style={{ height: 240 }}>
                      <div className="text-xs">
                        <TreeView
                          baseUrl={baseUrl}
                          onSelectNode={setSelectedNode}
                          getIconForItem={getIconForItem}
                          isHybridBase={mapType === 'hybrid'}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Modal popup for Estimation Table */}
              {showEstimatePopup && (
                <div
                  className="modal-overlay"
                  onClick={() => setShowEstimatePopup(false)}
                >
                  <div
                    className="modal-panel"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="modal-header">
                      <h3 style={{ margin: 0 }}>Estimation</h3>
                    </div>
                    <div className="modal-body">
                      <EstimationTable
                        materials={materials}
                        markers={markers}
                        selectedNodeId={selectedNode?.id}
                        selectedNodeDept={
                          selectedNode?.deptId ??
                          selectedNode?.dept ??
                          selectedNode?.DEPT_ID ??
                          null
                        }
                        onClosePopup={() => setShowEstimatePopup(false)}
                      />
                    </div>
                  </div>
                </div>
              )}
                      
              {/* Modal popup for Modify Estimate */}
              {showModifyPopup && (
                <div
                  className="modal-overlay"
                  onClick={() => setShowModifyPopup(false)}
                >
                  <div
                    className="modal-panel"
                    onClick={(e) => e.stopPropagation()}
                    style={{ width: 880, maxHeight: '80vh', overflowY: 'auto' }}
                  >
                    <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0 }}>Modify Estimate</h3>
                    </div>
                    <div className="modal-body" style={{ fontSize: 13 }}>
                      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                        <input
                          type="text"
                          placeholder="Enter Estimate No"
                          value={modifyEstimateNo}
                          onChange={(e) => setModifyEstimateNo(e.target.value)}
                          style={{ flex: 1, padding: 6, borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 13 }}
                        />
                        <button className="app-btn app-btn--primary" onClick={handleModifySearch} style={{ fontSize: 13, padding: '6px 10px' }}>Search</button>
                        <button className="app-btn app-btn--primary" onClick={() => { setModifyEstimateNo(''); setModifyData(null); setModifyError(null); }} style={{ fontSize: 13, padding: '6px 10px' }}>Clear</button>
                        <button className="app-btn app-btn--primary" onClick={handleAddDetail} style={{ fontSize: 13, padding: '6px 10px' }}>Add</button>
                        <button className="app-btn app-btn--primary" onClick={handleSaveDetails} style={{ fontSize: 13, padding: '6px 10px' }}>Save Details</button>
                      </div>

                      {modifyLoading && <div style={{ fontSize: 13 }}>Loading...</div>}
                      {modifyError && <div style={{ color: 'red', fontSize: 13 }}>{modifyError}</div>}

                      {modifyData && modifyData.header && (
                        <div>
                          <h4 style={{ marginTop: 0, fontSize: 15 }}>General Information</h4>
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                            <div>
                              <label style={{ fontSize: 11 }}>Estimate No</label>
                              <input value={modifyData.header.estimateNo || ''} onChange={(e) => setModifyData({...modifyData, header: {...modifyData.header, estimateNo: e.target.value}})} style={{ width: '100%', padding: 6, borderRadius: 6, fontSize: 13 }} />
                              {modifyValidation.estimateNo && <div style={{ color: 'red', fontSize: 12 }}>{modifyValidation.estimateNo}</div>}
                            </div>
                            <div>
                              <label style={{ fontSize: 11 }}>Cost Center (Project No)</label>
                              <input value={modifyData.header.costCenter || ''} onChange={(e) => setModifyData({...modifyData, header: {...modifyData.header, costCenter: e.target.value}})} placeholder="Enter Cost Center" style={{ width: '100%', padding: 6, borderRadius: 6, fontSize: 13 }} />
                              {modifyValidation.costCenter && <div style={{ color: 'red', fontSize: 12 }}>{modifyValidation.costCenter}</div>}
                            </div>

                            <div>
                              <label style={{ fontSize: 11 }}>Warehouse</label>
                              <input value={modifyData.header.warehouse || ''} onChange={(e) => setModifyData({...modifyData, header: {...modifyData.header, warehouse: e.target.value}})} style={{ width: '100%', padding: 6, borderRadius: 6, fontSize: 13 }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 11 }}>Estimate Date</label>
                              <input type="date" value={modifyData.header.estimateDate ? (modifyData.header.estimateDate.split && modifyData.header.estimateDate.split('T')[0]) || modifyData.header.estimateDate : ''} onChange={(e) => setModifyData({...modifyData, header: {...modifyData.header, estimateDate: e.target.value}})} style={{ width: '100%', padding: 6, borderRadius: 6, fontSize: 13 }} />
                            </div>

                            <div>
                              <label style={{ fontSize: 11 }}>File Reference</label>
                              <input value={modifyData.header.fileReference || modifyData.header.file_ref || ''} onChange={(e) => setModifyData({...modifyData, header: {...modifyData.header, fileReference: e.target.value}})} style={{ width: '100%', padding: 6, borderRadius: 6, fontSize: 13 }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 11 }}>Reject Reason</label>
                              <input value={modifyData.header.rejectReason || modifyData.header.reject_reason || ''} onChange={(e) => setModifyData({...modifyData, header: {...modifyData.header, rejectReason: e.target.value}})} style={{ width: '100%', padding: 6, borderRadius: 6, fontSize: 13 }} />
                            </div>

                            <div>
                              <label style={{ fontSize: 11 }}>Client Name</label>
                              <input value={modifyData.header.clientName || modifyData.header.client_name || ''} onChange={(e) => setModifyData({...modifyData, header: {...modifyData.header, clientName: e.target.value}})} style={{ width: '100%', padding: 6, borderRadius: 6, fontSize: 13 }} />
                            </div>
                            <div>
                              <label style={{ fontSize: 11 }}>Description</label>
                              <input value={modifyData.header.description || modifyData.header.desc || ''} onChange={(e) => setModifyData({...modifyData, header: {...modifyData.header, description: e.target.value}})} style={{ width: '100%', padding: 6, borderRadius: 6, fontSize: 13 }} />
                            </div>
                          </div>

                          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                            <button className="app-btn app-btn--primary" onClick={handleModifySave} style={{ fontSize: 13, padding: '6px 10px' }}>Save Changes</button>
                            <button className="app-btn" onClick={() => { setModifyData(null); setModifyEstimateNo(''); }} style={{ fontSize: 13, padding: '6px 10px' }}>Clear</button>
                          </div>
                        </div>
                      )}
                      {/* Render details/material rows returned by spPeggingDmt (compact) */}
                      {modifyData && modifyData.details && modifyData.details.length > 0 && (
                        <div style={{ marginTop: 12 }}>
                          <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                              <thead>
                                <tr>
                                  <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #e2e8f0', fontSize: 12 }}>Res Code</th>
                                  <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #e2e8f0', fontSize: 12 }}>Res Name</th>
                                  <th style={{ textAlign: 'left', padding: '6px 8px', borderBottom: '1px solid #e2e8f0', fontSize: 12 }}>UOM</th>
                                  <th style={{ textAlign: 'right', padding: '6px 8px', borderBottom: '1px solid #e2e8f0', fontSize: 12 }}>Qty</th>
                                  <th style={{ textAlign: 'right', padding: '6px 8px', borderBottom: '1px solid #e2e8f0', fontSize: 12 }}>Unit Price</th>
                                  <th style={{ textAlign: 'right', padding: '6px 8px', borderBottom: '1px solid #e2e8f0', fontSize: 12 }}>Tolerance</th>
                                  <th style={{ textAlign: 'right', padding: '6px 8px', borderBottom: '1px solid #e2e8f0', fontSize: 12 }}>Total (LKR)</th>
                                </tr>
                              </thead>
                              <tbody>
                                {modifyData.details.map((row, idx) => (
                                  <tr key={idx}>
                                    <td style={{ padding: '6px 8px', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                                      {row._isNew ? (
                                        <input
                                          type="text"
                                          value={(row.id?.resCd ?? row.resCd ?? row.res_cd ?? row.resCode ?? '')}
                                          onChange={(e) => {
                                            const val = e.target.value;
                                            handleDetailChange(idx, 'id', { ...(row.id || {}), resCd: val });
                                            handleDetailChange(idx, 'resCd', val);
                                          }}
                                          style={{ width: 120, padding: '4px 6px', fontSize: 13 }}
                                          placeholder="Res Code"
                                        />
                                      ) : (
                                        <span>{row.id?.resCd || row.resCd || row.res_cd || row.resCode || ''}</span>
                                      )}
                                    </td>
                                    <td style={{ padding: '6px 8px', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                                      {row._isNew ? (
                                        <input
                                          type="text"
                                          value={(row.resName ?? row.res_name ?? row.res ?? '')}
                                          onChange={(e) => handleDetailChange(idx, 'resName', e.target.value)}
                                          style={{ width: '100%', maxWidth: 260, padding: '4px 6px', fontSize: 13 }}
                                          placeholder="Resource Name"
                                        />
                                      ) : (
                                        <span>{row.resName || row.res_name || row.res || ''}</span>
                                      )}
                                    </td>
                                    <td style={{ padding: '6px 8px', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                                      {row._isNew ? (
                                        <input
                                          type="text"
                                          value={(row.uom ?? row.UOM ?? row.unit ?? '')}
                                          onChange={(e) => handleDetailChange(idx, 'uom', e.target.value)}
                                          style={{ width: 90, padding: '4px 6px', fontSize: 13 }}
                                          placeholder="UOM"
                                        />
                                      ) : (
                                        <span>{row.uom || row.UOM || row.unit || ''}</span>
                                      )}
                                    </td>
                                    <td style={{ padding: '6px 8px', textAlign: 'right', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                                      <input type="number" value={row.estimateQty ?? ''} onChange={(e) => handleDetailChange(idx, 'estimateQty', Number(e.target.value || 0))} style={{ width: 80, padding: '4px 6px', fontSize: 13, textAlign: 'right' }} />
                                    </td>
                                    <td style={{ padding: '6px 8px', textAlign: 'right', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                                      <input type="number" value={row.unitPrice ?? ''} onChange={(e) => handleDetailChange(idx, 'unitPrice', Number(e.target.value || 0))} style={{ width: 110, padding: '4px 6px', fontSize: 13, textAlign: 'right' }} />
                                    </td>
                                      <td style={{ padding: '6px 8px', textAlign: 'right', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>
                                        <input type="number" value={row.tolerance ?? row.tolerancePercentage ?? 0} onChange={(e) => handleDetailChange(idx, 'tolerance', Number(e.target.value || 0))} style={{ width: 80, padding: '4px 6px', fontSize: 13, textAlign: 'right' }} />
                                      </td>
                                      <td style={{ padding: '6px 8px', textAlign: 'right', borderBottom: '1px solid #f1f5f9', fontSize: 13 }}>{formatCurrency((Number(row.estimateQty || 0) * Number(row.unitPrice || 0)).toFixed(0))}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                              <div />
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 700, fontSize: 14 }}>Total Cost: {formatCurrency(computeDetailsTotal(modifyData.details))} LKR</div>
                              </div>
                            </div>
                          </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
              {mastersOpen && (
                <MastersModal
                  open={mastersOpen}
                  onClose={() => setMastersOpen(false)}
                  items={materials}
                  nodeId={selectedNode?.id ?? null}
                  nodeDept={
                    selectedNode?.deptId ??
                    selectedNode?.dept ??
                    selectedNode?.DEPT_ID ??
                    null
                  }
                />
              )}
            </div>
        </div>
      </div>
    </DndContext>
  );
};

export default PaggingSchedule;