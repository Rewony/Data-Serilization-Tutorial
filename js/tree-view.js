/**
 * FormatMaster - Visual AST / Tree Explorer
 * Renders an interactive collapsible tree view of parsed data
 */

window.TreeViewer = (() => {

  function render(containerId, data, rootLabel = "kök (root)") {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";

    if (data === undefined || data === null) {
      container.innerHTML = `<div class="p-6 text-center text-slate-500 italic">Görüntülenecek veri yok veya boş.</div>`;
      return;
    }

    const rootEl = createNode(rootLabel, data, "", true);
    container.appendChild(rootEl);
  }

  function getType(val) {
    if (val === null) return "null";
    if (Array.isArray(val)) return "array";
    return typeof val;
  }

  function getTypeBadge(type, length = null) {
    switch (type) {
      case "object":
        return `<span class="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">Object</span>`;
      case "array":
        return `<span class="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Array[${length}]</span>`;
      case "string":
        return `<span class="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">string</span>`;
      case "number":
        return `<span class="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">number</span>`;
      case "boolean":
        return `<span class="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">boolean</span>`;
      case "null":
        return `<span class="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-slate-700 text-slate-400 border border-slate-600">null</span>`;
      default:
        return `<span class="px-1.5 py-0.5 text-[10px] font-semibold rounded bg-slate-700 text-slate-300">${type}</span>`;
    }
  }

  function createNode(key, value, path = "", isRoot = false) {
    const type = getType(value);
    const nodeEl = document.createElement("div");
    nodeEl.className = isRoot ? "tree-root font-mono text-sm" : "tree-node font-mono text-sm";
    nodeEl.dataset.path = path || key;

    const isExpandable = type === "object" || type === "array";

    const contentEl = document.createElement("div");
    contentEl.className = "tree-content cursor-pointer select-none rounded hover:bg-slate-800/60 py-1 px-2 flex items-center gap-2 group transition";

    // Toggle Icon
    let toggleIcon = "";
    if (isExpandable) {
      toggleIcon = `<span class="tree-toggle w-4 h-4 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 text-xs transition-transform transform duration-150">▼</span>`;
    } else {
      toggleIcon = `<span class="w-4 h-4 text-center text-slate-600 text-xs">•</span>`;
    }

    // Key styling
    let isAttr = key && key.startsWith("@");
    let keyHtml = "";
    if (key !== null && key !== undefined) {
      if (isAttr) {
        keyHtml = `<span class="text-rose-400 font-semibold">${escapeHtml(key)}:</span>`;
      } else {
        keyHtml = `<span class="text-sky-300 font-semibold">${escapeHtml(key)}:</span>`;
      }
    }

    // Value styling & Badge
    let valueHtml = "";
    if (type === "string") {
      valueHtml = `<span class="text-emerald-300">"${escapeHtml(value)}"</span>`;
    } else if (type === "number") {
      valueHtml = `<span class="text-purple-300 font-bold">${value}</span>`;
    } else if (type === "boolean") {
      valueHtml = `<span class="text-rose-400 font-bold">${value}</span>`;
    } else if (type === "null") {
      valueHtml = `<span class="text-slate-500 italic">null</span>`;
    }

    const badge = getTypeBadge(type, isExpandable ? (type === "array" ? value.length : Object.keys(value).length) : null);

    contentEl.innerHTML = `
      ${toggleIcon}
      <div class="flex items-center gap-1.5 flex-wrap">
        ${keyHtml}
        ${valueHtml}
        ${badge}
      </div>
    `;

    nodeEl.appendChild(contentEl);

    // Children wrapper
    if (isExpandable) {
      const childrenWrapper = document.createElement("div");
      childrenWrapper.className = "tree-children ml-2";

      if (type === "array") {
        value.forEach((item, index) => {
          const childPath = path ? `${path}[${index}]` : `[${index}]`;
          childrenWrapper.appendChild(createNode(`[${index}]`, item, childPath, false));
        });
      } else {
        const keys = Object.keys(value);
        keys.forEach(k => {
          const childPath = path ? `${path}.${k}` : k;
          childrenWrapper.appendChild(createNode(k, value[k], childPath, false));
        });
      }

      nodeEl.appendChild(childrenWrapper);

      // Click to toggle collapse
      contentEl.addEventListener("click", (e) => {
        const toggleSpan = contentEl.querySelector(".tree-toggle");
        if (childrenWrapper.style.display === "none") {
          childrenWrapper.style.display = "block";
          if (toggleSpan) toggleSpan.style.transform = "rotate(0deg)";
        } else {
          childrenWrapper.style.display = "none";
          if (toggleSpan) toggleSpan.style.transform = "rotate(-90deg)";
        }
      });
    }

    return nodeEl;
  }

  function expandAll(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll(".tree-children").forEach(el => el.style.display = "block");
    container.querySelectorAll(".tree-toggle").forEach(el => el.style.transform = "rotate(0deg)");
  }

  function collapseAll(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.querySelectorAll(".tree-children").forEach(el => el.style.display = "none");
    container.querySelectorAll(".tree-toggle").forEach(el => el.style.transform = "rotate(-90deg)");
  }

  function filterTree(containerId, query) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const q = query.trim().toLowerCase();
    const nodes = container.querySelectorAll(".tree-node, .tree-root");

    if (!q) {
      nodes.forEach(n => {
        n.style.display = "";
        const c = n.querySelector(".tree-content");
        if (c) c.classList.remove("bg-yellow-500/20");
      });
      return;
    }

    nodes.forEach(n => {
      const text = n.textContent.toLowerCase();
      const content = n.querySelector(".tree-content");
      if (text.includes(q)) {
        n.style.display = "";
        if (content && content.textContent.toLowerCase().includes(q)) {
          content.classList.add("bg-yellow-500/20");
        }
      } else {
        n.style.display = "none";
      }
    });
  }

  function escapeHtml(str) {
    if (typeof str !== "string") return String(str);
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  return {
    render,
    expandAll,
    collapseAll,
    filterTree
  };
})();
