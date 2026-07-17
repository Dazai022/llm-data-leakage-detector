(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/lib/api.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "analyzePrompt",
    ()=>analyzePrompt,
    "scanText",
    ()=>scanText
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_BASE = ("TURBOPACK compile-time value", "http://localhost:8000") || "http://localhost:8000";
class ApiError extends Error {
}
async function post(path, body) {
    let res;
    try {
        res = await fetch(`${API_BASE}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    } catch  {
        throw new ApiError(`Can't reach the backend at ${API_BASE}. Is it running?`);
    }
    if (!res.ok) {
        const detail = await res.json().catch(()=>null);
        throw new ApiError(detail?.detail || `Request failed (${res.status})`);
    }
    return res.json();
}
function scanText(text) {
    return post("/api/scan", {
        text
    });
}
function analyzePrompt(prompt) {
    return post("/api/analyze", {
        prompt
    });
}
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RiskDial",
    ()=>RiskDial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const LEVEL_COLOR = {
    Critical: "var(--critical)",
    High: "var(--high)",
    Medium: "var(--medium)",
    Low: "var(--low)"
};
function RiskDial({ score, level }) {
    const clamped = Math.max(0, Math.min(100, score));
    // Needle sweeps from -120deg (0) to 120deg (100) across the dial face.
    const angle = -120 + clamped / 100 * 240;
    const color = LEVEL_COLOR[level] || "var(--ink-soft)";
    const ticks = Array.from({
        length: 5
    }, (_, i)=>-120 + i / 4 * 240);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "dial-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 160 110",
                width: "100%",
                height: "auto",
                role: "img",
                "aria-label": `Risk score ${clamped} out of 100, ${level}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "M 20 95 A 60 60 0 1 1 140 95",
                        fill: "none",
                        stroke: "var(--hairline-strong)",
                        strokeWidth: "8",
                        strokeLinecap: "round"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx",
                        lineNumber: 27,
                        columnNumber: 9
                    }, this),
                    ticks.map((t, i)=>{
                        const rad = t * Math.PI / 180;
                        const x1 = 80 + Math.sin(rad) * 52;
                        const y1 = 95 - Math.cos(rad) * 52;
                        const x2 = 80 + Math.sin(rad) * 62;
                        const y2 = 95 - Math.cos(rad) * 62;
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: x1,
                            y1: y1,
                            x2: x2,
                            y2: y2,
                            stroke: "var(--ink-soft)",
                            strokeWidth: "2"
                        }, i, false, {
                            fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx",
                            lineNumber: 41,
                            columnNumber: 13
                        }, this);
                    }),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        style: {
                            transform: `rotate(${angle}deg)`,
                            transformOrigin: "80px 95px",
                            transition: "transform 0.5s cubic-bezier(.2,.8,.2,1)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
                            x1: "80",
                            y1: "95",
                            x2: "80",
                            y2: "42",
                            stroke: color,
                            strokeWidth: "3",
                            strokeLinecap: "round"
                        }, void 0, false, {
                            fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx",
                            lineNumber: 53,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "80",
                        cy: "95",
                        r: "5.5",
                        fill: color
                    }, void 0, false, {
                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx",
                        lineNumber: 55,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "dial-level",
                style: {
                    color
                },
                children: level.toUpperCase()
            }, void 0, false, {
                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx",
                lineNumber: 57,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "dial-score",
                children: [
                    clamped,
                    " / 100"
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx",
                lineNumber: 60,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx",
        lineNumber: 25,
        columnNumber: 5
    }, this);
}
_c = RiskDial;
var _c;
__turbopack_context__.k.register(_c, "RiskDial");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EvidenceLog",
    ()=>EvidenceLog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
"use client";
;
const TYPE_LABEL = {
    api_key: "API key",
    email: "Email",
    password: "Password",
    secret_key: "Secret key",
    token: "Token",
    credit_card: "Credit card",
    ssn: "SSN",
    ip_address: "IP address",
    phone_number: "Phone number",
    database_url: "Database URL",
    high_entropy_string: "High-entropy string",
    pii: "Personal info"
};
function riskKey(risk) {
    return risk.toLowerCase();
}
function EvidenceLog({ leaks }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "log-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "log-header",
                children: [
                    "Evidence log — ",
                    leaks.length,
                    " item",
                    leaks.length === 1 ? "" : "s"
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this),
            leaks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "log-empty",
                children: "No leaks found yet. Nothing to redact."
            }, void 0, false, {
                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this) : leaks.map((leak, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "log-row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "stamp-badge",
                            "data-risk": riskKey(leak.risk),
                            children: leak.risk
                        }, void 0, false, {
                            fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx",
                            lineNumber: 33,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "log-type",
                                    children: TYPE_LABEL[leak.type] || leak.type
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "log-value font-mono",
                                    children: leak.masked_value
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx",
                                    lineNumber: 38,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx",
                            lineNumber: 36,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "log-method",
                            children: leak.method || ""
                        }, void 0, false, {
                            fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx",
                            lineNumber: 40,
                            columnNumber: 13
                        }, this)
                    ]
                }, `${leak.type}-${i}`, true, {
                    fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx",
                    lineNumber: 32,
                    columnNumber: 11
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx",
        lineNumber: 26,
        columnNumber: 5
    }, this);
}
_c = EvidenceLog;
var _c;
__turbopack_context__.k.register(_c, "EvidenceLog");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RedactedPane.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RedactedPane",
    ()=>RedactedPane
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
"use client";
;
;
// The backend masks values with literal asterisk runs (e.g. "sk-p****90",
// "********", or the shorter "**" run in "***-**-6789" for SSNs). Rather
// than showing asterisks, render those runs as solid black redaction bars
// - the visual signature of this tool. Threshold is 2+ (not 3+) so the
// short "**" segment in masked SSNs/phone numbers becomes a bar too,
// instead of leaking through as literal asterisk characters.
function renderRedacted(text) {
    const parts = text.split(/(\*{2,})/g);
    return parts.map((part, i)=>{
        if (/^\*{2,}$/.test(part)) {
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "bar",
                style: {
                    width: `${part.length}ch`
                },
                "aria-label": "redacted"
            }, i, false, {
                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RedactedPane.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this);
        }
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: part
        }, i, false, {
            fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RedactedPane.tsx",
            lineNumber: 24,
            columnNumber: 12
        }, this);
    });
}
function RedactedPane({ text }) {
    if (!text) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "redacted-pane empty",
            children: "Redacted copy will appear here."
        }, void 0, false, {
            fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RedactedPane.tsx",
            lineNumber: 30,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "redacted-pane",
        children: renderRedacted(text)
    }, void 0, false, {
        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RedactedPane.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}
_c = RedactedPane;
var _c;
__turbopack_context__.k.register(_c, "RedactedPane");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/lib/api.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$components$2f$RiskDial$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$components$2f$EvidenceLog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$components$2f$RedactedPane$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RedactedPane.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
const SCAN_PLACEHOLDER = `Paste text you suspect contains leaked data — an LLM
response, a log line, a support ticket, anything.

Example:
"Sure, here's the config: api_key: sk-proj-abc123... and
you can reach support at jane@example.com."`;
function Home() {
    _s();
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("scan");
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [sanitized, setSanitized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [leaks, setLeaks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [level, setLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Low");
    const [original, setOriginal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [caseId, setCaseId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("——");
    const debounceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            const now = new Date();
            setCaseId(`${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`);
        }
    }["Home.useEffect"], []);
    function reset() {
        setSanitized("");
        setLeaks([]);
        setScore(0);
        setLevel("Low");
        setOriginal("");
        setError(null);
    }
    function switchMode(next) {
        if (next === mode) return;
        setMode(next);
        setInput("");
        reset();
    }
    // Live scan mode: debounce the request as the person types.
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (mode !== "scan") return;
            if (debounceRef.current) clearTimeout(debounceRef.current);
            if (!input.trim()) {
                reset();
                return;
            }
            debounceRef.current = setTimeout({
                "Home.useEffect": async ()=>{
                    setLoading(true);
                    setError(null);
                    try {
                        const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["scanText"])(input);
                        setSanitized(result.sanitized_text);
                        setLeaks(result.leaks_detected);
                        setScore(result.risk_score);
                        setLevel(result.risk_level);
                    } catch (e) {
                        setError(e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? e.message : "Something went wrong.");
                    } finally{
                        setLoading(false);
                    }
                }
            }["Home.useEffect"], 450);
            return ({
                "Home.useEffect": ()=>{
                    if (debounceRef.current) clearTimeout(debounceRef.current);
                }
            })["Home.useEffect"];
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["Home.useEffect"], [
        input,
        mode
    ]);
    async function runAnalysis() {
        if (!input.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzePrompt"])(input);
            setOriginal(result.original_response);
            setSanitized(result.sanitized_response);
            setLeaks(result.leaks_detected);
            setScore(result.risk_score);
            setLevel(result.risk_level);
        } catch (e) {
            setError(e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ApiError"] ? e.message : "Something went wrong.");
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ledger",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "ledger-title",
                                children: "Data Leakage Detector"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "ledger-sub",
                                children: "Finds secrets and PII before they leave the room, then redacts them on the spot."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 113,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                        lineNumber: 111,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "case-id",
                        children: [
                            "CASE FILE ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: [
                                    "#",
                                    caseId
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 118,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 119,
                                columnNumber: 11
                            }, this),
                            "STATUS: ",
                            leaks.length > 0 ? "FLAGGED" : "CLEAR"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                        lineNumber: 117,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                lineNumber: 110,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tabs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "tab",
                        "data-active": mode === "scan",
                        onClick: ()=>switchMode("scan"),
                        children: "Scan text"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                        lineNumber: 125,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        type: "button",
                        className: "tab",
                        "data-active": mode === "analyze",
                        onClick: ()=>switchMode("analyze"),
                        children: "Prompt an LLM"
                    }, void 0, false, {
                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                        lineNumber: 133,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                lineNumber: 124,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "panels",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel-label",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: mode === "scan" ? "Intake — source text" : "Intake — prompt"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                    lineNumber: 146,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                className: "intake-textarea",
                                placeholder: mode === "scan" ? SCAN_PLACEHOLDER : "Ask for something that might come back with realistic-looking (fake) credentials, e.g. \"give me a sample .env file for a Postgres app\".",
                                value: input,
                                onChange: (e)=>setInput(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            mode === "analyze" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn",
                                        onClick: runAnalysis,
                                        disabled: loading || !input.trim(),
                                        children: loading ? "Generating…" : "Generate & analyze"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "status-line",
                                        "data-tone": error ? "error" : undefined,
                                        children: error || (loading ? "Calling the model, then scanning its response…" : "")
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                        lineNumber: 159,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 155,
                                columnNumber: 13
                            }, this),
                            mode === "scan" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "actions",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "status-line",
                                    "data-tone": error ? "error" : undefined,
                                    children: error || (loading ? "Scanning…" : "Scans automatically as you type.")
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                    lineNumber: 166,
                                    columnNumber: 15
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 165,
                                columnNumber: 13
                            }, this),
                            mode === "analyze" && original && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "compare-note",
                                children: "Original model response is shown redacted on the right. Nothing unredacted ever leaves this pane."
                            }, void 0, false, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 172,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                        lineNumber: 144,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel-label",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "Redacted copy"
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                    lineNumber: 181,
                                    columnNumber: 13
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$components$2f$RedactedPane$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RedactedPane"], {
                                text: sanitized
                            }, void 0, false, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                        lineNumber: 179,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "findings-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$components$2f$RiskDial$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["RiskDial"], {
                        score: score,
                        level: level
                    }, void 0, false, {
                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$components$2f$EvidenceLog$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["EvidenceLog"], {
                        leaks: leaks
                    }, void 0, false, {
                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                        lineNumber: 189,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                lineNumber: 187,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
        lineNumber: 109,
        columnNumber: 5
    }, this);
}
_s(Home, "3ybskBUCPr81v3ZovsYzloBFSlo=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
]);

//# sourceMappingURL=Downloads_llm-leakage-detector%20%281%29_llm-leakage-detector_frontend_1wlg9ar._.js.map