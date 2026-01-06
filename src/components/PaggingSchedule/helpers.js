// components/PaggingSchedule/helpers.js
import linePoleIcon from "../../assets/img/pole.png";
import conductorsIcon from "../../assets/img/conductors.png";
import substationsIcon from "../../assets/img/substations.png";
import strutsIcon from "../../assets/img/struts.png";
import staysIcon from "../../assets/img/stays.png";
import bindingIcon from "../../assets/img/binding.png";
import mvhwIcon from "../../assets/img/mvhw.png";
import ddloIcon from "../../assets/img/ddlo.png";
import conversionIcon from "../../assets/img/conversion.png";
import wayleavesIcon from "../../assets/img/wayleaves.png";
import transportIcon from "../../assets/img/transport.png";
import labourIcon from "../../assets/img/labour.png";
import overheadIcon from "../../assets/img/overhead.png";

// Determine icon
export const getIconForItem = (itemName) => {
  if (!itemName) return null;
  const lower = itemName.toLowerCase();
  if (
    lower.includes("substation") ||
    lower.includes("subdp") ||
    lower.includes("subsp") ||
    lower.includes("subplinth") ||
    /.*ps subdp.*/.test(lower)
  )
    return substationsIcon;
  if (lower.includes("strut")) return strutsIcon;
  if (/.*(pole|r\.c\.?|c\.p\.?|wooden|ps |rc ht).*/.test(lower))
    return linePoleIcon;
  if (lower.includes("stay")) return staysIcon;
  if (
    lower.includes("conductor") ||
    lower.includes("s/c") ||
    lower.includes("d/c")
  )
    return conductorsIcon;
  if (lower.includes("binding")) return bindingIcon;
  if (lower.includes("mv/lv")) return mvhwIcon;
  if (lower.includes("ddlo")) return ddloIcon;
  if (lower.includes("conversion")) return conversionIcon;
  if (lower.includes("wayleave")) return wayleavesIcon;
  if (lower.includes("transport")) return transportIcon;
  if (lower.includes("labour")) return labourIcon;
  if (lower.includes("overhead")) return overheadIcon;
  return null;
};

// Helper to extract a unit price from backend item objects
export const extractUnitPrice = (item) => {
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