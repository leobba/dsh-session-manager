window.__ModuleLoader__.load({
  id: "dsh-session-manager",
  factory: (require) => {
var __dshImportClientFactory = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name2 in all)
      __defProp(target, name2, { get: all[name2], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/client/index.ts
  var index_exports = {};
  __export(index_exports, {
    apply: () => apply,
    inject: () => inject,
    name: () => name
  });

  // src/client/SyncSettings.tsx
  var import_react = __require("react");
  var import_jsx_runtime = __require("react/jsx-runtime");
  var SOURCE_LABELS = {
    pi: "pi",
    opencode: "opencode",
    codex: "codex",
    "claude-code": "claude-code"
  };
  var styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
      maxWidth: "920px",
      padding: "16px 20px 24px",
      color: "var(--dsw-text, #222)"
    },
    tabs: {
      display: "flex",
      gap: "4px",
      padding: "4px",
      background: "var(--dsw-surface-raised, var(--dsw-surface-subtle, #f0f0f0))",
      borderRadius: "8px",
      width: "fit-content"
    },
    tab: {
      padding: "6px 14px",
      border: "none",
      borderRadius: "6px",
      background: "transparent",
      color: "var(--dsw-text-secondary, #666)",
      cursor: "pointer",
      fontWeight: 500,
      fontSize: "13px"
    },
    tabActive: {
      background: "var(--dsw-surface, #fff)",
      color: "var(--dsw-text, #222)",
      boxShadow: "0 1px 2px rgba(0,0,0,0.08)"
    },
    group: {
      border: "1px solid var(--dsw-border-subtle, #e5e5e5)",
      borderRadius: "8px",
      overflow: "hidden",
      background: "var(--dsw-surface, #fff)"
    },
    groupHeader: {
      padding: "10px 16px",
      background: "var(--dsw-surface-subtle, #f7f7f7)",
      fontWeight: 600,
      fontSize: "13px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    },
    list: {
      maxHeight: "320px",
      overflow: "auto"
    },
    item: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
      padding: "10px 16px",
      borderTop: "1px solid var(--dsw-border-subtle, #efefef)"
    },
    meta: {
      fontSize: "12px",
      color: "var(--dsw-text-secondary, #777)"
    },
    badge: {
      fontSize: "11px",
      padding: "2px 8px",
      borderRadius: "999px",
      background: "var(--dsw-surface-subtle, #eee)",
      color: "var(--dsw-text-secondary, #666)",
      whiteSpace: "nowrap"
    },
    actionRow: {
      display: "flex",
      gap: "8px",
      alignItems: "center"
    },
    button: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "1px solid var(--dsw-border-subtle, #d0d0d0)",
      background: "var(--dsw-surface-raised, #fafafa)",
      color: "var(--dsw-text, #333)",
      cursor: "pointer",
      fontSize: "13px"
    },
    primary: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "1px solid var(--dsw-border-accent, #4a90d9)",
      background: "var(--dsw-surface-accent, #4a90d9)",
      color: "#fff",
      cursor: "pointer",
      fontSize: "13px"
    },
    danger: {
      padding: "6px 12px",
      borderRadius: "6px",
      border: "1px solid var(--dsw-border-danger, #d32f2f)",
      background: "var(--dsw-surface-danger, #d32f2f)",
      color: "#fff",
      cursor: "pointer",
      fontSize: "13px"
    },
    result: {
      whiteSpace: "pre-wrap",
      fontSize: "12px",
      color: "var(--dsw-text-secondary, #666)",
      maxHeight: "200px",
      overflow: "auto",
      padding: "10px 12px",
      border: "1px solid var(--dsw-border-subtle, #eee)",
      borderRadius: "6px",
      background: "var(--dsw-surface-subtle, #fafafa)"
    },
    note: {
      fontSize: "12px",
      color: "var(--dsw-text-secondary, #777)",
      lineHeight: "1.6"
    }
  };
  function parseJson(text) {
    try {
      const data = JSON.parse(text);
      return Array.isArray(data) ? data : [];
    } catch {
      return [];
    }
  }
  function SyncSettings({ close, loadCatalog, importSelected, listImported, deleteSelected }) {
    const [tab, setTab] = (0, import_react.useState)("import");
    const [items, setItems] = (0, import_react.useState)([]);
    const [imported, setImported] = (0, import_react.useState)([]);
    const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
    const [selectedImported, setSelectedImported] = (0, import_react.useState)(/* @__PURE__ */ new Set());
    const [loading, setLoading] = (0, import_react.useState)(false);
    const [result, setResult] = (0, import_react.useState)("");
    const refresh = async () => {
      setLoading(true);
      setResult("");
      try {
        const catalog = await loadCatalog();
        const importedResult = await listImported();
        setItems(catalog.ok ? parseJson(catalog.text) : []);
        setImported(importedResult.ok ? parseJson(importedResult.text) : []);
        if (!catalog.ok) setResult(catalog.text);
        else if (!importedResult.ok) setResult(importedResult.text);
      } finally {
        setLoading(false);
      }
    };
    (0, import_react.useEffect)(() => {
      void refresh();
    }, []);
    const groups = (0, import_react.useMemo)(() => {
      const map = /* @__PURE__ */ new Map();
      for (const item of items) {
        const list = map.get(item.source) ?? [];
        list.push(item);
        map.set(item.source, list);
      }
      return [...map.entries()];
    }, [items]);
    const toggle = (id) => {
      const next = new Set(selected);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setSelected(next);
    };
    const toggleImported = (id) => {
      const next = new Set(selectedImported);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setSelectedImported(next);
    };
    const toggleGroup = (source, all) => {
      const sourceIds = items.filter((item) => item.source === source).map((item) => item.id);
      const next = new Set(selected);
      if (all) {
        for (const id of sourceIds) next.add(id);
      } else {
        for (const id of sourceIds) next.delete(id);
      }
      setSelected(next);
    };
    const doImport = async () => {
      if (selected.size === 0) return;
      setLoading(true);
      setResult("");
      try {
        const outcome = await importSelected([...selected]);
        setResult(outcome.text);
        setSelected(/* @__PURE__ */ new Set());
        await refresh();
      } finally {
        setLoading(false);
      }
    };
    const doDeleteSelected = async () => {
      if (selectedImported.size === 0) return;
      setLoading(true);
      setResult("");
      try {
        const outcome = await deleteSelected([...selectedImported]);
        setResult(outcome.text);
        setSelectedImported(/* @__PURE__ */ new Set());
        await refresh();
      } finally {
        setLoading(false);
      }
    };
    const doDeleteAll = async () => {
      if (imported.length === 0) return;
      setLoading(true);
      setResult("");
      try {
        const outcome = await deleteSelected(imported.map((item) => item.id));
        setResult(outcome.text);
        setSelectedImported(/* @__PURE__ */ new Set());
        await refresh();
      } finally {
        setLoading(false);
      }
    };
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.container, children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "\u4F1A\u8BDD\u7BA1\u7406" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.note, children: "\u5BFC\u5165\u5176\u4ED6 agent \u7684\u5386\u53F2\u4F1A\u8BDD\uFF0C\u6216\u5220\u9664 dsh \u4E2D\u7684\u672C\u5730\u526F\u672C\u3002" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.actionRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.button, onClick: () => void refresh(), disabled: loading, children: "\u5237\u65B0" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.button, onClick: close, children: "\u5173\u95ED" })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.tabs, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.tab, ...tab === "import" ? styles.tabActive : {} }, onClick: () => setTab("import"), children: "\u5BFC\u5165" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: { ...styles.tab, ...tab === "delete" ? styles.tabActive : {} }, onClick: () => setTab("delete"), children: "\u5220\u9664" })
      ] }),
      loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.meta, children: "\u52A0\u8F7D\u4E2D\u2026" }),
      result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", { style: styles.result, children: result }),
      tab === "import" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.note, children: "\u81EA\u52A8\u8DF3\u8FC7\u5DF2\u5BFC\u5165\u4F1A\u8BDD\uFF1B\u518D\u6B21\u5BFC\u5165\u4E0D\u4F1A\u91CD\u590D\u521B\u5EFA id\uFF0C\u53EF\u9009\u62E9\u65B0\u589E\u4F1A\u8BDD\u540E\u540C\u6B65\u5230 dsh\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.actionRow, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: styles.primary, onClick: () => void doImport(), disabled: loading || selected.size === 0, children: [
          "\u5BFC\u5165\u9009\u4E2D (",
          selected.size,
          ")"
        ] }) }),
        items.length === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.meta, children: "\u6CA1\u6709\u53D1\u73B0\u53EF\u5BFC\u5165\u7684\u4F1A\u8BDD\u3002" }),
        groups.map(([source, list]) => {
          const allSelected = list.every((item) => selected.has(item.id));
          const anySelected = list.some((item) => selected.has(item.id));
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { style: styles.group, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.groupHeader, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
                SOURCE_LABELS[source] ?? source,
                " (",
                list.length,
                ")"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "flex", alignItems: "center", gap: "4px", fontSize: 12 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  "input",
                  {
                    type: "checkbox",
                    checked: allSelected,
                    ref: (el) => {
                      if (el) el.indeterminate = !allSelected && anySelected;
                    },
                    onChange: () => toggleGroup(source, !allSelected)
                  }
                ),
                "\u5168\u9009"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.list, children: list.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: styles.item, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: selected.has(item.id), onChange: () => toggle(item.id) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { minWidth: 0 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: item.title || item.id }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.meta, children: [
                  item.id,
                  " \xB7 ",
                  item.cwd || "(\u65E0\u76EE\u5F55)",
                  " \xB7 ",
                  item.messageCount,
                  " \u6761\u6D88\u606F"
                ] })
              ] }),
              item.imported && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: styles.badge, children: "\u5DF2\u5BFC\u5165" })
            ] }, item.id)) })
          ] }, source);
        })
      ] }),
      tab === "delete" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.note, children: "\u8FD9\u91CC\u5220\u9664\u7684\u53EA\u662F dsh \u4E2D\u5BFC\u5165\u7684\u526F\u672C\uFF0C\u4E0D\u4F1A\u5F71\u54CD\u539F agent\uFF08opencode / codex / claude\uFF09\u91CC\u7684\u4F1A\u8BDD\u8BB0\u5F55\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.actionRow, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", { style: styles.danger, onClick: () => void doDeleteSelected(), disabled: loading || selectedImported.size === 0, children: [
            "\u5220\u9664\u9009\u4E2D (",
            selectedImported.size,
            ")"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { style: styles.danger, onClick: () => void doDeleteAll(), disabled: loading || imported.length === 0, children: "\u5220\u9664\u5168\u90E8\u5DF2\u5BFC\u5165" })
        ] }),
        imported.length === 0 && !loading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.meta, children: "\u5F53\u524D\u6CA1\u6709\u5DF2\u5BFC\u5165\u7684\u672C\u5730\u4F1A\u8BDD\u526F\u672C\u3002" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.group, children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.groupHeader, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
              "\u5DF2\u5BFC\u5165\u5230 dsh (",
              imported.length,
              ")"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: { display: "flex", alignItems: "center", gap: "4px", fontSize: 12 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "input",
                {
                  type: "checkbox",
                  checked: imported.length > 0 && selectedImported.size === imported.length,
                  ref: (el) => {
                    if (el) el.indeterminate = selectedImported.size > 0 && selectedImported.size < imported.length;
                  },
                  onChange: () => {
                    if (selectedImported.size === imported.length) setSelectedImported(/* @__PURE__ */ new Set());
                    else setSelectedImported(new Set(imported.map((item) => item.id)));
                  }
                }
              ),
              "\u5168\u9009"
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: styles.list, children: imported.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { style: styles.item, children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "checkbox", checked: selectedImported.has(item.id), onChange: () => toggleImported(item.id) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: item.title || item.id }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: styles.meta, children: [
                item.id,
                " \xB7 ",
                item.cwd || "(\u65E0\u76EE\u5F55)"
              ] })
            ] })
          ] }, item.id)) })
        ] })
      ] })
    ] });
  }

  // src/client/index.ts
  var name = "dsh-session-manager";
  var inject = ["slots", "remote", "remote.commands", "sessions"];
  function apply(ctx) {
    const executeCommand = async (line) => {
      const sessionId = ctx.sessions?.list?.getSnapshot?.()?.current;
      if (sessionId === void 0) {
        return { ok: false, text: "\u5F53\u524D\u6CA1\u6709\u6253\u5F00\u4F1A\u8BDD\uFF0C\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A\u4F1A\u8BDD\u518D\u540C\u6B65" };
      }
      const result = await ctx.remote.commands.execute(sessionId, line, []);
      if (!result.ok) {
        return { ok: false, text: `${result.error.code}: ${result.error.message}` };
      }
      if (result.value === void 0) {
        return { ok: true, text: "\u547D\u4EE4\u672A\u627E\u5230" };
      }
      const outcome = result.value.result;
      return { ok: outcome.kind === "success", text: outcome.text ?? "\u5B8C\u6210" };
    };
    ctx.slots.inject("settings.section", () => ctx.slots.register(
      {
        name: "settings.section",
        id: "dsh-import-sync",
        order: 50,
        label: () => /^zh\b/u.test(navigator.language ?? "") ? "\u4F1A\u8BDD\u7BA1\u7406" : "Session Manager",
        inject: () => ({
          loadCatalog: async () => executeCommand("/import-catalog"),
          importSelected: async (ids) => {
            if (ids.length === 0) return { ok: false, text: "\u6CA1\u6709\u9009\u62E9\u4EFB\u4F55\u4F1A\u8BDD" };
            return executeCommand(`/import-selected --ids ${ids.join(",")}`);
          },
          listImported: async () => executeCommand("/list-imported"),
          deleteSelected: async (ids) => {
            if (ids.length === 0) return { ok: false, text: "\u6CA1\u6709\u9009\u62E9\u4EFB\u4F55\u4F1A\u8BDD" };
            return executeCommand(`/remove-sessions --ids ${ids.join(",")}`);
          }
        })
      },
      SyncSettings
    ));
  }
  return __toCommonJS(index_exports);
})();
//# sourceMappingURL=factory.js.map

    return __dshImportClientFactory;
  },
});
//# sourceMappingURL=client.js.map
