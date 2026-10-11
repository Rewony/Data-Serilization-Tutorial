/**
 * FormatMaster - Main Application Logic
 * Navigation, Challenge Runner, Live Sandbox, Storage, and Audio FX
 */

document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // State
  // ==========================================
  const state = {
    activeTab: "challenges",
    currentChallengeIndex: 0,
    solvedChallenges: new Set(JSON.parse(localStorage.getItem("fm_solved") || "[]")),
    filterCategory: "all",
    filterLevel: "all",
    sandboxSourceFormat: "json",
    sandboxTargetFormat: "yaml",
    autoConvert: true,
    activeGuide: "json"
  };

  // Preset Templates for Sandbox
  const templates = {
    api_user: {
      name: "🚀 REST API Kullanıcı Profili",
      json: `{\n  "status": "success",\n  "code": 200,\n  "data": {\n    "user_id": "usr_94821",\n    "name": "Selin Kaya",\n    "roles": ["admin", "editor"],\n    "settings": {\n      "theme": "dark",\n      "notifications": true,\n      "max_sessions": 5\n    }\n  }\n}`
    },
    docker: {
      name: "🐳 Docker Compose Servisi",
      yaml: `version: "3.9"\nservices:\n  api:\n    build: .\n    container_name: backend_app\n    ports:\n      - "8080:8080"\n    environment:\n      - NODE_ENV=production\n      - DB_HOST=postgres\n    depends_on:\n      - postgres\n  postgres:\n    image: postgres:15-alpine\n    restart: always\n    environment:\n      POSTGRES_PASSWORD: secretpassword`
    },
    ecommerce: {
      name: "📦 E-Ticaret Siparişi",
      json: `{\n  "order": {\n    "id": 10852,\n    "currency": "TRY",\n    "total_price": 2450.00,\n    "customer": {\n      "name": "Mert Aksoy",\n      "email": "mert@example.com"\n    },\n    "items": [\n      {\n        "sku": "KB-RGB-01",\n        "title": "Mekanik Klavye",\n        "quantity": 1,\n        "unit_price": 1850.00\n      },\n      {\n        "sku": "MS-WL-02",\n        "title": "Kablosuz Mouse",\n        "quantity": 1,\n        "unit_price": 600.00\n      }\n    ]\n  }\n}`
    },
    xml_rss: {
      name: "📰 RSS / XML Haber Beslemesi",
      xml: `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>Teknoloji Bülteni</title>\n    <link>https://tech.example.com</link>\n    <description>Güncel yazılım ve teknoloji haberleri</description>\n    <item>\n      <title>YAML 1.2 Yenilikleri</title>\n      <author>deniz@example.com</author>\n      <pubDate>Sun, 11 Oct 2026</pubDate>\n    </item>\n  </channel>\n</rss>`
    }
  };

  // ==========================================
  // Audio Synthesis FX (Web Audio API)
  // ==========================================
  function playSound(type = "success") {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === "success") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, ctx.currentTime + 0.1); // E5
        osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.2); // G5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
      } else if (type === "error") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(140, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      // Audio not permitted or supported
    }
  }

  // ==========================================
  // Line Number Editor Synchronization
  // ==========================================
  function setupEditor(textareaId, lineNumbersId) {
    const textarea = document.getElementById(textareaId);
    const lineNumbers = document.getElementById(lineNumbersId);
    if (!textarea || !lineNumbers) return;

    function updateLineNumbers() {
      const lines = textarea.value.split("\n").length;
      let lineStr = "";
      for (let i = 1; i <= lines; i++) {
        lineStr += i + "\n";
      }
      lineNumbers.textContent = lineStr;
    }

    textarea.addEventListener("input", updateLineNumbers);
    textarea.addEventListener("scroll", () => {
      lineNumbers.scrollTop = textarea.scrollTop;
    });

    // Intercept Tab key
    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + "  " + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 2;
        updateLineNumbers();
        textarea.dispatchEvent(new Event("input"));
      }
    });

    updateLineNumbers();
  }

  // ==========================================
  // Tab Navigation
  // ==========================================
  const navTabs = document.querySelectorAll("[data-nav-tab]");
  const tabPanels = document.querySelectorAll("[data-tab-panel]");

  navTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.navTab;
      switchTab(target);
    });
  });

  function switchTab(tabId) {
    state.activeTab = tabId;
    navTabs.forEach(b => {
      if (b.dataset.navTab === tabId) {
        b.classList.add("bg-cyan-500/10", "text-cyan-400", "border-cyan-500/40");
        b.classList.remove("text-slate-400", "border-transparent");
      } else {
        b.classList.remove("bg-cyan-500/10", "text-cyan-400", "border-cyan-500/40");
        b.classList.add("text-slate-400", "border-transparent");
      }
    });

    tabPanels.forEach(panel => {
      if (panel.dataset.tabPanel === tabId) {
        panel.classList.remove("hidden");
      } else {
        panel.classList.add("hidden");
      }
    });

    if (tabId === "tree") {
      updateTreeViewFromSandbox();
    }
    if (tabId === "guides") {
      switchGuideFormat(state.activeGuide);
    }
  }

  // ==========================================
  // Challenges System
  // ==========================================
  const challengeListContainer = document.getElementById("challenge-list");
  const challengeTitleEl = document.getElementById("challenge-title");
  const challengeLevelEl = document.getElementById("challenge-level");
  const challengeCategoryEl = document.getElementById("challenge-category");
  const challengeDescEl = document.getElementById("challenge-desc");
  const challengeHintsEl = document.getElementById("challenge-hints");
  const challengeEditor = document.getElementById("challenge-code");
  const challengeFeedbackEl = document.getElementById("challenge-feedback");
  const btnRunChallenge = document.getElementById("btn-run-challenge");
  const btnShowSolution = document.getElementById("btn-show-solution");
  const btnResetChallenge = document.getElementById("btn-reset-challenge");
  const btnNextChallenge = document.getElementById("btn-next-challenge");
  const totalSolvedEl = document.getElementById("stat-solved-count");
  const totalScoreEl = document.getElementById("stat-score");

  function renderChallengeList() {
    if (!challengeListContainer) return;
    challengeListContainer.innerHTML = "";

    const challenges = window.FormatChallenges;
    challenges.forEach((ch, index) => {
      // Filtering
      if (state.filterCategory !== "all" && ch.category !== state.filterCategory) return;
      if (state.filterLevel !== "all" && ch.level !== state.filterLevel) return;

      const isSolved = state.solvedChallenges.has(ch.id);
      const isActive = index === state.currentChallengeIndex;

      const item = document.createElement("div");
      item.className = `p-3 rounded-lg cursor-pointer transition border text-sm flex items-center justify-between ${
        isActive
          ? "bg-slate-800 border-cyan-500/50 shadow-sm"
          : "hover:bg-slate-800/40 border-slate-800"
      }`;

      let catBadgeColor = "text-sky-400 bg-sky-500/10 border-sky-500/20";
      if (ch.category === "yaml") catBadgeColor = "text-emerald-400 bg-emerald-500/10 border-emerald-500/20";
      if (ch.category === "xml") catBadgeColor = "text-amber-400 bg-amber-500/10 border-amber-500/20";
      if (ch.category === "multi") catBadgeColor = "text-purple-400 bg-purple-500/10 border-purple-500/20";

      let statusBadge = isSolved
        ? `<span class="flex items-center text-emerald-400 text-xs font-semibold gap-1"><i data-lucide="check-circle-2" class="w-4 h-4"></i> Çözüldü</span>`
        : `<span class="text-slate-500 text-xs">${index + 1}. Görev</span>`;

      item.innerHTML = `
        <div class="flex items-center gap-2 overflow-hidden">
          <span class="px-1.5 py-0.5 rounded text-[10px] font-mono border uppercase ${catBadgeColor}">${ch.category}</span>
          <span class="truncate font-medium text-slate-200">${ch.title}</span>
        </div>
        <div>${statusBadge}</div>
      `;

      item.addEventListener("click", () => {
        loadChallenge(index);
      });

      challengeListContainer.appendChild(item);
    });

    if (window.lucide) lucide.createIcons();
    updateStats();
  }

  function updateStats() {
    const solvedCount = state.solvedChallenges.size;
    const total = window.FormatChallenges.length;
    if (totalSolvedEl) totalSolvedEl.textContent = `${solvedCount} / ${total}`;
    if (totalScoreEl) totalScoreEl.textContent = `${solvedCount * 100} XP`;
  }

  function loadChallenge(index) {
    state.currentChallengeIndex = index;
    const ch = window.FormatChallenges[index];
    if (!ch) return;

    challengeTitleEl.textContent = ch.title;
    challengeDescEl.textContent = ch.description;

    // Badges
    challengeLevelEl.textContent = ch.level.toUpperCase();
    if (ch.level === "beginner") {
      challengeLevelEl.className = "px-2 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30";
    } else if (ch.level === "intermediate") {
      challengeLevelEl.className = "px-2 py-0.5 rounded text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30";
    } else {
      challengeLevelEl.className = "px-2 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30";
    }

    challengeCategoryEl.textContent = ch.category.toUpperCase();

    // Hints
    challengeHintsEl.innerHTML = ch.hints.map(h => `<li class="text-slate-300">${h}</li>`).join("");

    // Code
    const savedUserCode = localStorage.getItem(`fm_code_${ch.id}`) || ch.initialCode;
    challengeEditor.value = savedUserCode;
    challengeEditor.dispatchEvent(new Event("input"));

    // Reset feedback
    challengeFeedbackEl.className = "hidden p-4 rounded-lg text-sm";
    btnNextChallenge.classList.add("hidden");

    renderChallengeList();
  }

  // Validate Challenge Code
  if (btnRunChallenge) {
    btnRunChallenge.addEventListener("click", () => {
      const ch = window.FormatChallenges[state.currentChallengeIndex];
      const code = challengeEditor.value;

      // Save user scratchpad
      localStorage.setItem(`fm_code_${ch.id}`, code);

      const result = ch.validate(code);

      challengeFeedbackEl.classList.remove("hidden");
      if (result.passed) {
        playSound("success");
        state.solvedChallenges.add(ch.id);
        localStorage.setItem("fm_solved", JSON.stringify([...state.solvedChallenges]));

        challengeFeedbackEl.className = "p-4 rounded-lg text-sm bg-emerald-950/60 border border-emerald-500/40 text-emerald-200 flex flex-col gap-2";
        challengeFeedbackEl.innerHTML = `
          <div class="flex items-center gap-2 font-bold text-base text-emerald-300">
            <i data-lucide="party-popper" class="w-5 h-5"></i> Tebrikler! Görev Başarıyla Tamamlandı!
          </div>
          <div>${result.message}</div>
          <div class="text-xs text-emerald-400/80 bg-emerald-900/30 p-2.5 rounded border border-emerald-800/40 mt-1">
            <strong>💡 Öğrenilen Ders:</strong> ${ch.explanation}
          </div>
        `;

        btnNextChallenge.classList.remove("hidden");

        if (typeof confetti === "function") {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      } else {
        playSound("error");
        challengeFeedbackEl.className = "p-4 rounded-lg text-sm bg-rose-950/60 border border-rose-500/40 text-rose-200 flex flex-col gap-2";
        challengeFeedbackEl.innerHTML = `
          <div class="flex items-center gap-2 font-bold text-base text-rose-300">
            <i data-lucide="alert-circle" class="w-5 h-5"></i> Henüz Tamamlanmadı
          </div>
          <div>${result.message}</div>
          <div class="text-xs text-rose-300/80">İpuçlarını kontrol edin ve sözdizim kurallarına dikkat edin.</div>
        `;
      }

      if (window.lucide) lucide.createIcons();
      updateStats();
    });
  }

  // Next Challenge
  if (btnNextChallenge) {
    btnNextChallenge.addEventListener("click", () => {
      if (state.currentChallengeIndex < window.FormatChallenges.length - 1) {
        loadChallenge(state.currentChallengeIndex + 1);
      }
    });
  }

  // Solution Modal Logic
  const solutionModal = document.getElementById("solution-modal");
  const modalSolutionCode = document.getElementById("modal-solution-code");
  const modalSolutionTitle = document.getElementById("modal-solution-title");
  const modalSolutionBadge = document.getElementById("modal-solution-badge");
  const modalSolutionExplanation = document.getElementById("modal-solution-explanation");
  const btnCloseModal = document.getElementById("btn-close-modal");
  const btnModalCloseFooter = document.getElementById("btn-modal-close-footer");
  const btnModalCopySolution = document.getElementById("btn-modal-copy-solution");
  const btnModalApplySolution = document.getElementById("btn-modal-apply-solution");

  function openSolutionModal() {
    const ch = window.FormatChallenges[state.currentChallengeIndex];
    if (!ch || !solutionModal) return;

    modalSolutionBadge.textContent = ch.category.toUpperCase();
    modalSolutionTitle.textContent = ch.title;
    modalSolutionCode.value = ch.solutionCode;
    modalSolutionCode.dispatchEvent(new Event("input"));
    modalSolutionExplanation.textContent = ch.explanation;

    solutionModal.classList.remove("hidden");
    if (window.lucide) lucide.createIcons();
  }

  function closeSolutionModal() {
    if (solutionModal) solutionModal.classList.add("hidden");
  }

  if (btnShowSolution) {
    btnShowSolution.addEventListener("click", openSolutionModal);
  }

  if (btnCloseModal) btnCloseModal.addEventListener("click", closeSolutionModal);
  if (btnModalCloseFooter) btnModalCloseFooter.addEventListener("click", closeSolutionModal);

  // Close when clicking outside dialog
  if (solutionModal) {
    solutionModal.addEventListener("click", (e) => {
      if (e.target === solutionModal) closeSolutionModal();
    });
  }

  // Copy solution to clipboard
  if (btnModalCopySolution) {
    btnModalCopySolution.addEventListener("click", () => {
      const ch = window.FormatChallenges[state.currentChallengeIndex];
      navigator.clipboard.writeText(ch.solutionCode).then(() => {
        const origHtml = btnModalCopySolution.innerHTML;
        btnModalCopySolution.innerHTML = `<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400"></i> Kopyalandı!`;
        if (window.lucide) lucide.createIcons();
        setTimeout(() => {
          btnModalCopySolution.innerHTML = origHtml;
          if (window.lucide) lucide.createIcons();
        }, 1500);
      });
    });
  }

  // Apply solution directly to editor
  if (btnModalApplySolution) {
    btnModalApplySolution.addEventListener("click", () => {
      const ch = window.FormatChallenges[state.currentChallengeIndex];
      challengeEditor.value = ch.solutionCode;
      challengeEditor.dispatchEvent(new Event("input"));
      closeSolutionModal();
      playSound("success");
    });
  }

  // Reset Challenge
  if (btnResetChallenge) {
    btnResetChallenge.addEventListener("click", () => {
      const ch = window.FormatChallenges[state.currentChallengeIndex];
      challengeEditor.value = ch.initialCode;
      challengeEditor.dispatchEvent(new Event("input"));
      challengeFeedbackEl.classList.add("hidden");
    });
  }

  // Filter Buttons
  const filterCatBtns = document.querySelectorAll("[data-filter-cat]");
  filterCatBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterCatBtns.forEach(b => b.classList.remove("bg-cyan-500", "text-slate-900"));
      btn.classList.add("bg-cyan-500", "text-slate-900");
      state.filterCategory = btn.dataset.filterCat;
      renderChallengeList();
    });
  });

  const filterLvlBtns = document.querySelectorAll("[data-filter-lvl]");
  filterLvlBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterLvlBtns.forEach(b => b.classList.remove("bg-cyan-500", "text-slate-900"));
      btn.classList.add("bg-cyan-500", "text-slate-900");
      state.filterLevel = btn.dataset.filterLvl;
      renderChallengeList();
    });
  });

  // ==========================================
  // Live Sandbox & Universal Converter
  // ==========================================
  const sandboxSource = document.getElementById("sandbox-source");
  const sandboxTarget = document.getElementById("sandbox-target");
  const sourceFormatSelect = document.getElementById("source-format-select");
  const targetFormatSelect = document.getElementById("target-format-select");
  const btnSwapFormats = document.getElementById("btn-swap-formats");
  const btnConvertNow = document.getElementById("btn-convert-now");
  const btnPrettifySource = document.getElementById("btn-prettify-source");
  const btnMinifySource = document.getElementById("btn-minify-source");
  const btnCopyTarget = document.getElementById("btn-copy-target");
  const btnDownloadTarget = document.getElementById("btn-download-target");
  const syntaxDoctorEl = document.getElementById("syntax-doctor-panel");
  const templateSelect = document.getElementById("template-select");

  function runSandboxConversion() {
    const srcText = sandboxSource.value;
    const srcFmt = sourceFormatSelect.value;
    const tgtFmt = targetFormatSelect.value;

    if (!srcText.trim()) {
      sandboxTarget.value = "";
      sandboxTarget.dispatchEvent(new Event("input"));
      syntaxDoctorEl.classList.add("hidden");
      return;
    }

    // Diagnose source
    const diagnosis = window.ConverterEngine.diagnose(srcText, srcFmt);

    if (!diagnosis.valid) {
      syntaxDoctorEl.classList.remove("hidden");
      syntaxDoctorEl.className = "p-3 rounded-lg text-xs bg-rose-950/70 border border-rose-500/40 text-rose-200 flex flex-col gap-1";
      syntaxDoctorEl.innerHTML = `
        <div class="flex items-center gap-1.5 font-bold text-rose-300">
          <i data-lucide="stethoscope" class="w-4 h-4"></i> Sözdizim Doktoru: Hata Tespit Edildi ${diagnosis.line ? `(Satır: ${diagnosis.line})` : ''}
        </div>
        <div class="font-mono text-slate-300">${diagnosis.error}</div>
        ${diagnosis.tip ? `<div class="text-amber-300/90 font-medium mt-1">${diagnosis.tip}</div>` : ''}
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    // If valid
    syntaxDoctorEl.classList.remove("hidden");
    syntaxDoctorEl.className = "p-2.5 rounded-lg text-xs bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 flex items-center gap-2";
    syntaxDoctorEl.innerHTML = `
      <i data-lucide="check" class="w-4 h-4 text-emerald-400"></i>
      <span>Sözdizimi geçerli ve kusursuz (${srcFmt.toUpperCase()}).</span>
    `;
    if (window.lucide) lucide.createIcons();

    try {
      const converted = window.ConverterEngine.convert(srcText, srcFmt, tgtFmt);
      sandboxTarget.value = converted;
      sandboxTarget.dispatchEvent(new Event("input"));
    } catch (e) {
      sandboxTarget.value = `// Dönüştürme Hatası: ${e.message}`;
      sandboxTarget.dispatchEvent(new Event("input"));
    }
  }

  if (sandboxSource) {
    sandboxSource.addEventListener("input", () => {
      if (state.autoConvert) {
        runSandboxConversion();
      }
    });
  }

  if (sourceFormatSelect) {
    sourceFormatSelect.addEventListener("change", () => {
      runSandboxConversion();
    });
  }

  if (targetFormatSelect) {
    targetFormatSelect.addEventListener("change", () => {
      runSandboxConversion();
    });
  }

  if (btnConvertNow) {
    btnConvertNow.addEventListener("click", runSandboxConversion);
  }

  // Swap Formats
  if (btnSwapFormats) {
    btnSwapFormats.addEventListener("click", () => {
      const oldSrcFmt = sourceFormatSelect.value;
      const oldTgtFmt = targetFormatSelect.value;
      const oldTargetText = sandboxTarget.value;

      sourceFormatSelect.value = oldTgtFmt;
      targetFormatSelect.value = oldSrcFmt;

      if (oldTargetText.trim() && !oldTargetText.startsWith("//")) {
        sandboxSource.value = oldTargetText;
        sandboxSource.dispatchEvent(new Event("input"));
      }

      runSandboxConversion();
    });
  }

  // Prettify / Format Source
  if (btnPrettifySource) {
    btnPrettifySource.addEventListener("click", () => {
      const fmt = sourceFormatSelect.value;
      const text = sandboxSource.value;
      try {
        if (fmt === "json") {
          const obj = window.ConverterEngine.JSON.parse(text);
          sandboxSource.value = window.ConverterEngine.JSON.format(obj, 2);
        } else if (fmt === "yaml") {
          const obj = window.ConverterEngine.YAML.parse(text);
          sandboxSource.value = window.ConverterEngine.YAML.format(obj, 2);
        } else if (fmt === "xml") {
          const obj = window.ConverterEngine.XML.parse(text);
          sandboxSource.value = window.ConverterEngine.XML.format(obj);
        }
        sandboxSource.dispatchEvent(new Event("input"));
      } catch (e) {
        alert("Biçimlendirilemedi: Sözdizim hatası var!\n" + e.message);
      }
    });
  }

  // Minify Source
  if (btnMinifySource) {
    btnMinifySource.addEventListener("click", () => {
      const fmt = sourceFormatSelect.value;
      const text = sandboxSource.value;
      try {
        if (fmt === "json") {
          sandboxSource.value = window.ConverterEngine.JSON.minify(text);
        } else {
          alert("Minify özelliği şu an sadece JSON için geçerlidir (YAML ve XML yapısal boşluk gerektirir).");
          return;
        }
        sandboxSource.dispatchEvent(new Event("input"));
      } catch (e) {
        alert("Sıkıştırılamadı: " + e.message);
      }
    });
  }

  // Copy Target
  if (btnCopyTarget) {
    btnCopyTarget.addEventListener("click", () => {
      navigator.clipboard.writeText(sandboxTarget.value).then(() => {
        const originalText = btnCopyTarget.innerHTML;
        btnCopyTarget.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-emerald-400"></i> Kopyalandı!`;
        if (window.lucide) lucide.createIcons();
        setTimeout(() => {
          btnCopyTarget.innerHTML = originalText;
          if (window.lucide) lucide.createIcons();
        }, 1500);
      });
    });
  }

  // Download Target
  if (btnDownloadTarget) {
    btnDownloadTarget.addEventListener("click", () => {
      const text = sandboxTarget.value;
      const fmt = targetFormatSelect.value;
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `data-export.${fmt}`;
      a.click();
    });
  }

  // Template select
  if (templateSelect) {
    templateSelect.addEventListener("change", () => {
      const key = templateSelect.value;
      if (!key || !templates[key]) return;
      const t = templates[key];

      if (t.json) {
        sourceFormatSelect.value = "json";
        targetFormatSelect.value = "yaml";
        sandboxSource.value = t.json;
      } else if (t.yaml) {
        sourceFormatSelect.value = "yaml";
        targetFormatSelect.value = "json";
        sandboxSource.value = t.yaml;
      } else if (t.xml) {
        sourceFormatSelect.value = "xml";
        targetFormatSelect.value = "json";
        sandboxSource.value = t.xml;
      }

      sandboxSource.dispatchEvent(new Event("input"));
      runSandboxConversion();
      templateSelect.value = "";
    });
  }

  // ==========================================
  // Visual Tree Viewer Tab
  // ==========================================
  const treeSourceInput = document.getElementById("tree-source-input");
  const treeFormatSelect = document.getElementById("tree-format-select");
  const treeSearchInput = document.getElementById("tree-search-input");
  const btnTreeExpandAll = document.getElementById("btn-tree-expand");
  const btnTreeCollapseAll = document.getElementById("btn-tree-collapse");

  function updateTreeViewFromSandbox() {
    // If tree input is empty, copy from sandbox
    if (treeSourceInput && !treeSourceInput.value.trim() && sandboxSource.value.trim()) {
      treeSourceInput.value = sandboxSource.value;
      treeFormatSelect.value = sourceFormatSelect.value;
    }
    renderTree();
  }

  function renderTree() {
    if (!treeSourceInput) return;
    const text = treeSourceInput.value;
    const fmt = treeFormatSelect.value;

    try {
      let data;
      if (fmt === "json") data = window.ConverterEngine.JSON.parse(text);
      if (fmt === "yaml") data = window.ConverterEngine.YAML.parse(text);
      if (fmt === "xml") data = window.ConverterEngine.XML.parse(text);

      window.TreeViewer.render("visual-tree-container", data, `Root (${fmt.toUpperCase()})`);
      document.getElementById("tree-error-banner").classList.add("hidden");
    } catch (e) {
      document.getElementById("tree-error-banner").classList.remove("hidden");
      document.getElementById("tree-error-banner").textContent = "Ayrıştırma Hatası: " + e.message;
    }
  }

  if (treeSourceInput) {
    treeSourceInput.addEventListener("input", renderTree);
  }
  if (treeFormatSelect) {
    treeFormatSelect.addEventListener("change", renderTree);
  }
  if (treeSearchInput) {
    treeSearchInput.addEventListener("input", (e) => {
      window.TreeViewer.filterTree("visual-tree-container", e.target.value);
    });
  }
  if (btnTreeExpandAll) {
    btnTreeExpandAll.addEventListener("click", () => {
      window.TreeViewer.expandAll("visual-tree-container");
    });
  }
  if (btnTreeCollapseAll) {
    btnTreeCollapseAll.addEventListener("click", () => {
      window.TreeViewer.collapseAll("visual-tree-container");
    });
  }

  // ==========================================
  // Learning Guides System (Konu Anlatımı)
  // ==========================================
  function switchGuideFormat(format) {
    state.activeGuide = format;
    const panelJson = document.getElementById("guide-panel-json");
    const panelYaml = document.getElementById("guide-panel-yaml");
    const panelXml = document.getElementById("guide-panel-xml");

    const btnJson = document.getElementById("guide-btn-json");
    const btnYaml = document.getElementById("guide-btn-yaml");
    const btnXml = document.getElementById("guide-btn-xml");

    if (!panelJson || !panelYaml || !panelXml) return;

    panelJson.classList.add("hidden");
    panelYaml.classList.add("hidden");
    panelXml.classList.add("hidden");

    const defaultBtnClass = "guide-nav-tab px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent";
    if (btnJson) btnJson.className = defaultBtnClass;
    if (btnYaml) btnYaml.className = defaultBtnClass;
    if (btnXml) btnXml.className = defaultBtnClass;

    if (format === "json") {
      panelJson.classList.remove("hidden");
      if (btnJson) btnJson.className = "guide-nav-tab px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/20";
    } else if (format === "yaml") {
      panelYaml.classList.remove("hidden");
      if (btnYaml) btnYaml.className = "guide-nav-tab px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm shadow-emerald-500/20";
    } else if (format === "xml") {
      panelXml.classList.remove("hidden");
      if (btnXml) btnXml.className = "guide-nav-tab px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm shadow-amber-500/20";
    }

    if (window.lucide) lucide.createIcons();
  }

  // Bind clicks
  const guideBtnJson = document.getElementById("guide-btn-json");
  const guideBtnYaml = document.getElementById("guide-btn-yaml");
  const guideBtnXml = document.getElementById("guide-btn-xml");

  if (guideBtnJson) guideBtnJson.addEventListener("click", () => switchGuideFormat("json"));
  if (guideBtnYaml) guideBtnYaml.addEventListener("click", () => switchGuideFormat("yaml"));
  if (guideBtnXml) guideBtnXml.addEventListener("click", () => switchGuideFormat("xml"));

  // Global helper to navigate from guide to challenge
  window.FormatNavigateToChallenge = (index) => {
    switchTab("challenges");
    loadChallenge(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ==========================================
  // Initialize Editors & First Load
  // ==========================================
  setupEditor("challenge-code", "challenge-lines");
  setupEditor("sandbox-source", "sandbox-source-lines");
  setupEditor("sandbox-target", "sandbox-target-lines");
  setupEditor("modal-solution-code", "modal-solution-lines");

  // Load default challenge & guide
  loadChallenge(0);
  switchGuideFormat("json");

  // Set default sandbox source
  sandboxSource.value = templates.api_user.json;
  sandboxSource.dispatchEvent(new Event("input"));
  runSandboxConversion();

  // Lucide icons
  if (window.lucide) {
    lucide.createIcons();
  }
});
