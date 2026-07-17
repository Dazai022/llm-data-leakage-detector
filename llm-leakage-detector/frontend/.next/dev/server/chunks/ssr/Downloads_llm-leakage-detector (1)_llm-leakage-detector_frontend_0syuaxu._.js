module.exports = [
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/lib/api.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "analyzePrompt",
    ()=>analyzePrompt,
    "scanText",
    ()=>scanText
]);
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
}),
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RiskDial",
    ()=>RiskDial
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "dial-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                viewBox: "0 0 160 110",
                width: "100%",
                height: "auto",
                role: "img",
                "aria-label": `Risk score ${clamped} out of 100, ${level}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
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
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("g", {
                        style: {
                            transform: `rotate(${angle}deg)`,
                            transformOrigin: "80px 95px",
                            transition: "transform 0.5s cubic-bezier(.2,.8,.2,1)"
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("line", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
}),
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "EvidenceLog",
    ()=>EvidenceLog
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "log-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
            leaks.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "log-empty",
                children: "No leaks found yet. Nothing to redact."
            }, void 0, false, {
                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx",
                lineNumber: 29,
                columnNumber: 9
            }, this) : leaks.map((leak, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "log-row",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "stamp-badge",
                            "data-risk": riskKey(leak.risk),
                            children: leak.risk
                        }, void 0, false, {
                            fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx",
                            lineNumber: 33,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "log-type",
                                    children: TYPE_LABEL[leak.type] || leak.type
                                }, void 0, false, {
                                    fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx",
                                    lineNumber: 37,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
}),
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RedactedPane.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RedactedPane",
    ()=>RedactedPane
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
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
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
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
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "redacted-pane empty",
            children: "Redacted copy will appear here."
        }, void 0, false, {
            fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RedactedPane.tsx",
            lineNumber: 30,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "redacted-pane",
        children: renderRedacted(text)
    }, void 0, false, {
        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RedactedPane.tsx",
        lineNumber: 32,
        columnNumber: 10
    }, this);
}
}),
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/lib/api.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$components$2f$RiskDial$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RiskDial.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$components$2f$EvidenceLog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/EvidenceLog.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$components$2f$RedactedPane$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/components/RedactedPane.tsx [app-ssr] (ecmascript)");
"use client";
;
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
    const [mode, setMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("scan");
    const [input, setInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [sanitized, setSanitized] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [leaks, setLeaks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [score, setScore] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(0);
    const [level, setLevel] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Low");
    const [original, setOriginal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [caseId, setCaseId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("——");
    const debounceRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const now = new Date();
        setCaseId(`${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}-${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`);
    }, []);
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
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (mode !== "scan") return;
        if (debounceRef.current) clearTimeout(debounceRef.current);
        if (!input.trim()) {
            reset();
            return;
        }
        debounceRef.current = setTimeout(async ()=>{
            setLoading(true);
            setError(null);
            try {
                const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["scanText"])(input);
                setSanitized(result.sanitized_text);
                setLeaks(result.leaks_detected);
                setScore(result.risk_score);
                setLevel(result.risk_level);
            } catch (e) {
                setError(e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? e.message : "Something went wrong.");
            } finally{
                setLoading(false);
            }
        }, 450);
        return ()=>{
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        input,
        mode
    ]);
    async function runAnalysis() {
        if (!input.trim()) return;
        setLoading(true);
        setError(null);
        try {
            const result = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["analyzePrompt"])(input);
            setOriginal(result.original_response);
            setSanitized(result.sanitized_response);
            setLeaks(result.leaks_detected);
            setScore(result.risk_score);
            setLevel(result.risk_level);
        } catch (e) {
            setError(e instanceof __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$lib$2f$api$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ApiError"] ? e.message : "Something went wrong.");
        } finally{
            setLoading(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ledger",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "ledger-title",
                                children: "Data Leakage Detector"
                            }, void 0, false, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "case-id",
                        children: [
                            "CASE FILE ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                children: [
                                    "#",
                                    caseId
                                ]
                            }, void 0, true, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 118,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tabs",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "panels",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel-label",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                className: "intake-textarea",
                                placeholder: mode === "scan" ? SCAN_PLACEHOLDER : "Ask for something that might come back with realistic-looking (fake) credentials, e.g. \"give me a sample .env file for a Postgres app\".",
                                value: input,
                                onChange: (e)=>setInput(e.target.value)
                            }, void 0, false, {
                                fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                lineNumber: 148,
                                columnNumber: 11
                            }, this),
                            mode === "analyze" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "btn",
                                        onClick: runAnalysis,
                                        disabled: loading || !input.trim(),
                                        children: loading ? "Generating…" : "Generate & analyze"
                                    }, void 0, false, {
                                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                                        lineNumber: 156,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            mode === "scan" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "actions",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            mode === "analyze" && original && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "panel-label",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$components$2f$RedactedPane$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RedactedPane"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "findings-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$components$2f$RiskDial$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["RiskDial"], {
                        score: score,
                        level: level
                    }, void 0, false, {
                        fileName: "[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/app/page.tsx",
                        lineNumber: 188,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$Downloads$2f$llm$2d$leakage$2d$detector__$28$1$292f$llm$2d$leakage$2d$detector$2f$frontend$2f$app$2f$components$2f$EvidenceLog$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["EvidenceLog"], {
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
}),
"[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Downloads/llm-leakage-detector (1)/llm-leakage-detector/frontend/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=Downloads_llm-leakage-detector%20%281%29_llm-leakage-detector_frontend_0syuaxu._.js.map