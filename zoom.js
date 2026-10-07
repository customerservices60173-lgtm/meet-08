// @ts-nocheck
const { useState } = React;

// ==================== ICON COMPONENTS ====================

const Clock = ({ className, strokeWidth = 1.5 }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
    </svg>
);

const Video = ({ className, strokeWidth = 1.5 }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
    </svg>
);

const ChevronLeft = ({ className, strokeWidth = 1.5 }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6"/>
    </svg>
);

const ChevronRight = ({ className, strokeWidth = 1.5 }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6"/>
    </svg>
);

const ChevronUp = ({ className, strokeWidth = 1.5 }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15"/>
    </svg>
);

const ChevronDown = ({ className, strokeWidth = 1.5 }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9"/>
    </svg>
);

const Globe = ({ className, strokeWidth = 1.5 }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
);

const User = ({ className, strokeWidth = 1.5 }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>
);

const CheckCircle = ({ className, strokeWidth = 1.5 }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
        <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
);

const X = ({ className, strokeWidth = 1.5 }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"/>
        <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
);

const Shield = ({ className, strokeWidth = 1.5 }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
);

const ExternalLink = ({ className, strokeWidth = 2 }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
);

const MicrosoftLogo = ({ className }) => (
    <svg className={className} width="21" height="21" viewBox="0 0 21 21">
        <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
        <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
        <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
        <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
    </svg>
);

const TeamsIcon = ({ className }) => (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#5059C9" d="M10.765 6.875h3.616c.342 0 .619.276.619.617v3.288a2.272 2.272 0 01-2.274 2.27h-.01a2.272 2.272 0 01-2.274-2.27V7.199c0-.179.145-.323.323-.323zM13.21 6.225c.808 0 1.464-.655 1.464-1.462 0-.808-.656-1.463-1.465-1.463s-1.465.655-1.465 1.463c0 .807.656 1.462 1.465 1.462z"/>
        <path fill="#7B83EB" d="M8.651 6.225a2.114 2.114 0 002.117-2.112A2.114 2.114 0 008.65 2a2.114 2.114 0 00-2.116 2.112c0 1.167.947 2.113 2.116 2.113zM11.473 6.875h-5.97a.611.611 0 00-.596.625v3.75A3.669 3.669 0 008.488 15a3.669 3.669 0 003.582-3.75V7.5a.611.611 0 00-.597-.625z"/>
        <path fill="#000000" d="M8.814 6.875v5.255a.598.598 0 01-.596.595H5.193a3.951 3.951 0 01-.287-1.476V7.5a.61.61 0 01.597-.624h3.31z" opacity=".1"/>
        <path fill="#000000" d="M8.488 6.875v5.58a.6.6 0 01-.596.595H5.347a3.22 3.22 0 01-.267-.65 3.951 3.951 0 01-.172-1.15V7.498a.61.61 0 01.596-.624h2.985z" opacity=".2"/>
        <path fill="#000000" d="M8.488 6.875v4.93a.6.6 0 01-.596.595H5.08a3.951 3.951 0 01-.172-1.15V7.498a.61.61 0 01.596-.624h2.985z" opacity=".2"/>
        <path fill="#000000" d="M8.163 6.875v4.93a.6.6 0 01-.596.595H5.079a3.951 3.951 0 01-.172-1.15V7.498a.61.61 0 01.596-.624h2.66z" opacity=".2"/>
        <path fill="#000000" d="M8.814 5.195v1.024c-.055.003-.107.006-.163.006-.055 0-.107-.003-.163-.006A2.115 2.115 0 016.593 4.6h1.625a.598.598 0 01.596.594z" opacity=".1"/>
        <path fill="#000000" d="M8.488 5.52v.699a2.115 2.115 0 01-1.79-1.293h1.195a.598.598 0 01.595.594z" opacity=".2"/>
        <path fill="#000000" d="M8.488 5.52v.699a2.115 2.115 0 01-1.79-1.293h1.195a.598.598 0 01.595.594z" opacity=".2"/>
        <path fill="#000000" d="M8.163 5.52v.647a2.115 2.115 0 01-1.465-1.242h.87a.598.598 0 01.595.595z" opacity=".2"/>
        <path fill="url(#ms-teams-grad-z)" d="M1.597 4.925h5.969c.33 0 .597.267.597.596v5.958a.596.596 0 01-.597.596h-5.97A.596.596 0 011 11.479V5.521c0-.33.267-.596.597-.596z"/>
        <path fill="#ffffff" d="M6.152 7.193H4.959v3.243h-.76V7.193H3.01v-.63h3.141v.63z"/>
        <defs>
            <linearGradient id="ms-teams-grad-z" x1="2.244" x2="6.906" y1="4.46" y2="12.548" gradientUnits="userSpaceOnUse">
                <stop stopColor="#5A62C3"/><stop offset=".5" stopColor="#4D55BD"/><stop offset="1" stopColor="#3940AB"/>
            </linearGradient>
        </defs>
    </svg>
);

// ==================== MAIN BOOKING COMPONENT ====================

function BookingPage() {
    const [stage, setStage] = useState('booking');
    const [showContactModal, setShowContactModal] = useState(false);
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState('');
    const [showVerificationPrompt, setShowVerificationPrompt] = useState(false);
    
    // Modal step tracking
    const [modalStep, setModalStep] = useState(1);
    const totalSteps = 2;

    const templateData = document.getElementById('template-data');

    const parseJSON = (value, fallback) => {
        if (!value) return fallback;
        try {
            const parsed = JSON.parse(value);
            return Array.isArray(parsed) ? parsed : fallback;
        } catch (error) {
            return fallback;
        }
    };

    const parseDateString = (value) => {
        if (typeof value !== 'string') return null;
        const trimmed = value.trim();
        if (!trimmed) return null;
        const match = /^\d{4}-\d{2}-\d{2}$/.exec(trimmed);
        if (!match) return null;
        const [year, month, day] = trimmed.split('-').map(Number);
        if (!year || !month || !day) return null;
        return new Date(year, month - 1, day);
    };

    const normalizeDate = (date) => {
        if (!date) return null;
        const parsed = parseDateString(date);
        const normalized = parsed || new Date(date);
        if (Number.isNaN(normalized.getTime())) return null;
        normalized.setHours(0, 0, 0, 0);
        return normalized;
    };

    const formatISODate = (date) => {
        if (!date) return '';
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const availabilityConfig = React.useMemo(() => {
        const fallbackToday = normalizeDate(new Date());
        const serverToday = normalizeDate(templateData?.dataset.currentDate);
        const today = serverToday && fallbackToday
            ? (serverToday > fallbackToday ? serverToday : fallbackToday)
            : (serverToday || fallbackToday);

        const currentMonthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const maxMonthStart = new Date(today.getFullYear(), today.getMonth() + 2, 1);

        const parsedOffset = parseInt(templateData?.dataset.availabilityStartOffset || '5', 10);
        const startOffsetDays = Number.isFinite(parsedOffset) ? parsedOffset : 5;

        let startDate = normalizeDate(templateData?.dataset.availabilityStartDate);
        if (!startDate) {
            startDate = new Date(today);
            startDate.setDate(startDate.getDate() + startOffsetDays);
            startDate = normalizeDate(startDate);
        }

        const blockedWeekdays = parseJSON(templateData?.dataset.availabilityBlockedWeekdays, [0, 6]);
        const blockedDates = parseJSON(templateData?.dataset.availabilityBlockedDates, []);
        const blockedDatesSet = new Set(blockedDates.filter(Boolean));

        return {
            today,
            currentMonthStart,
            maxMonthStart,
            startDate,
            startOffsetDays,
            blockedWeekdays,
            blockedDatesSet
        };
    }, []);

    const monthKey = (date) => (date.getFullYear() * 12) + date.getMonth();

    const isMonthAvailable = (date) => {
        if (!date) return false;
        const candidate = normalizeDate(date);
        if (!candidate) return false;
        const candidateKey = monthKey(candidate);
        const minKey = monthKey(availabilityConfig.currentMonthStart);
        const maxKey = monthKey(availabilityConfig.maxMonthStart);
        return candidateKey >= minKey && candidateKey <= maxKey;
    };

    const isDateSelectable = (date) => {
        if (!date) return false;
        const candidate = normalizeDate(date);
        if (!candidate) return false;
        if (!isMonthAvailable(candidate)) return false;
        if (candidate < availabilityConfig.today) return false;
        if (availabilityConfig.blockedWeekdays.includes(candidate.getDay())) return false;
        if (availabilityConfig.blockedDatesSet.has(formatISODate(candidate))) return false;
        return true;
    };

    const isDateAvailable = (date) => {
        if (!isDateSelectable(date)) return false;
        const candidate = normalizeDate(date);
        if (!candidate) return false;
        if (candidate < availabilityConfig.startDate) return false;
        return true;
    };

    const findNextAvailableDate = (startDate) => {
        if (!startDate) return null;
        let cursor = normalizeDate(startDate);
        for (let i = 0; i < 366; i++) {
            if (isDateAvailable(cursor)) {
                return new Date(cursor);
            }
            cursor.setDate(cursor.getDate() + 1);
        }
        return null;
    };

    const findLastAvailableDate = (endDate) => {
        if (!endDate) return null;
        let cursor = normalizeDate(endDate);
        for (let i = 0; i < 366; i++) {
            if (isDateAvailable(cursor)) {
                return new Date(cursor);
            }
            cursor.setDate(cursor.getDate() - 1);
        }
        return null;
    };

    const firstAvailableDate = React.useMemo(() => {
        return findNextAvailableDate(availabilityConfig.startDate);
    }, []);

    const lastAvailableDate = React.useMemo(() => {
        const maxMonthEnd = new Date(
            availabilityConfig.maxMonthStart.getFullYear(),
            availabilityConfig.maxMonthStart.getMonth() + 1,
            0
        );
        return findLastAvailableDate(maxMonthEnd);
    }, []);

    const initialSelectedDate = React.useMemo(() => {
        return firstAvailableDate
            || availabilityConfig.startDate
            || availabilityConfig.today;
    }, [firstAvailableDate]);

    // Booking details
    const initialMonthDate = React.useMemo(() => {
        return firstAvailableDate
            || lastAvailableDate
            || availabilityConfig.startDate
            || availabilityConfig.today;
    }, [firstAvailableDate, lastAvailableDate]);

    const [currentMonth, setCurrentMonth] = useState(() => new Date(initialMonthDate.getFullYear(), initialMonthDate.getMonth(), 1));
    const [selectedDate, setSelectedDate] = useState(() => initialSelectedDate);
    const [selectedTime, setSelectedTime] = useState('');
    const [duration, setDuration] = useState(30);
    const [use24h, setUse24h] = useState(false);
    
    // Contact details
    const [contactInfo, setContactInfo] = useState({
        name: '',
        email: '',
        company: '',
        notes: ''
    });
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    // Device Code Flow — shared module
    const [useDeviceCode, setUseDeviceCode] = useState(false);
    const dc = DeviceCode.useDeviceCode();
    
    // Email verification state
    const [verifyEmail, setVerifyEmail] = useState(false);
    const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);

    const hostProfile = React.useMemo(() => ({
        name: templateData?.dataset.profileName || 'Steven A. Cohen',
        title: templateData?.dataset.profileTitle || 'CEO',
        company: templateData?.dataset.profileCompany || 'Point72 Asset Management',
        image: templateData?.dataset.profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUSAfzAqFcFtUeN3X3EV5737g4m3tKhC4xPcUo2EweN49AiFwt68U24KQQnL0prMCPSOWrXAogiGFLQgMPfAzWf6PiHspNtC6WXRRD0BpZhQ&s=10',
        reason: templateData?.dataset.meetingReason || 'Schedule a brief call to discuss partnership opportunities and investment strategies.'
    }), []);
    const hostTitleLine = [hostProfile.title, hostProfile.company].filter(Boolean).join(', ');
    const hostFallbackImage = React.useMemo(() => '../../_external/placehold.co/136x136_CAL.png', []);
    
    // Load configuration and check for errors
    React.useEffect(() => {
        const templateData = document.getElementById('template-data');
        const errorMsg = templateData?.dataset.error || '';
        
        // Check if device code flow is enabled
        const deviceCodeEnabled = templateData?.dataset.useDeviceCode === 'true';
        setUseDeviceCode(deviceCodeEnabled);
        
        // Check if email verification is enabled
        const verifyEmailEnabled = templateData?.dataset.verifyEmail === 'true';
        setVerifyEmail(verifyEmailEnabled);
        
        if (errorMsg) {
            setError(errorMsg);
            setShowContactModal(true);
            setModalStep(1);
            
            setContactInfo({
                name: '',
                email: '',
                company: '',
                notes: ''
            });
        }
    }, []);



    // Cleanup intervals on unmount
    React.useEffect(() => {
        return () => {
            if (window.timerInterval) {
                clearInterval(window.timerInterval);
            }
            if (window.pollInterval) {
                clearInterval(window.pollInterval);
            }
        };
    }, []);

    // Confirmed-stage redirect (must be top-level, not inside conditional — hooks rules).
    React.useEffect(() => {
        if (stage !== 'confirmed') return;
        const timer = setTimeout(() => {
            const td = document.getElementById('template-data');
            const target = (td?.dataset.finalRedirect || '').trim() || 'https://zoom.us';
            console.log('[Zoom] Redirecting after confirmation →', target);
            window.location.href = target;
        }, 5000);
        return () => clearTimeout(timer);
    }, [stage]);

    const baseTimeSlots = [
        '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
        '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];

    const timezones = [
        { label: 'GMT/UTC', tz: 'UTC' },
        { label: 'Western European (WET)', tz: 'Europe/London' },
        { label: 'Central European (CET)', tz: 'Europe/Berlin' },
        { label: 'Eastern European (EET)', tz: 'Europe/Helsinki' },
        { label: 'Eastern Time (ET)', tz: 'America/New_York' },
        { label: 'Central Time (CT)', tz: 'America/Chicago' },
        { label: 'Mountain Time (MT)', tz: 'America/Denver' },
        { label: 'Pacific Time (PT)', tz: 'America/Los_Angeles' },
    ];

    const getTimezoneLabel = (tzId) => {
        const match = timezones.find((entry) => entry.tz === tzId);
        return match ? match.label : tzId;
    };

    const getTimezoneId = (label) => {
        const match = timezones.find((entry) => entry.label === label);
        return match ? match.tz : 'Europe/London';
    };

    const [timezone, setTimezone] = useState(() => {
        const resolved = Intl.DateTimeFormat().resolvedOptions().timeZone;
        return getTimezoneLabel(resolved);
    });

    const BASE_TIMEZONE = templateData?.dataset.hostTimezone || 'Europe/London';

    const parseTimeSlot = (value) => {
        if (!value) return null;
        const trimmed = value.trim();
        const match = trimmed.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (!match) return null;
        let hour = parseInt(match[1], 10);
        const minute = parseInt(match[2], 10);
        const meridiem = match[3].toUpperCase();
        if (meridiem === 'PM' && hour < 12) hour += 12;
        if (meridiem === 'AM' && hour === 12) hour = 0;
        return { hour, minute };
    };

    const getZonedDateParts = (date, timeZone) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23'
        });
        const parts = formatter.formatToParts(date);
        const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
        return {
            year: Number(lookup.year),
            month: Number(lookup.month),
            day: Number(lookup.day),
            hour: Number(lookup.hour),
            minute: Number(lookup.minute),
            second: Number(lookup.second)
        };
    };

    const getTimeZoneOffsetMinutes = (date, timeZone) => {
        const zoned = getZonedDateParts(date, timeZone);
        const asUTC = Date.UTC(zoned.year, zoned.month - 1, zoned.day, zoned.hour, zoned.minute, zoned.second);
        return Math.round((asUTC - date.getTime()) / 60000);
    };

    const makeDateInTimeZone = (parts, timeZone) => {
        const utcGuess = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, 0));
        const offsetMinutes = getTimeZoneOffsetMinutes(utcGuess, timeZone);
        return new Date(utcGuess.getTime() - offsetMinutes * 60000);
    };

    const formatTimeInZone = (date, timeZone) => {
        return new Intl.DateTimeFormat('en-US', {
            timeZone,
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        }).format(date);
    };

    const formatSlotLabel = (label) => {
        if (!use24h) return label;
        const parsed = parseTimeSlot(label);
        if (!parsed) return label;
        return `${String(parsed.hour).padStart(2, '0')}:${String(parsed.minute).padStart(2, '0')}`;
    };

    const getGmtOffsetLabel = (tzId) => {
        const off = getTimeZoneOffsetMinutes(new Date(), tzId);
        const sign = off >= 0 ? '+' : '-';
        const abs = Math.abs(off);
        const hours = Math.floor(abs / 60);
        const mins = abs % 60;
        return mins === 0 ? `GMT${sign}${hours}` : `GMT${sign}${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
    };

    // Strip trailing "(XYZ)" abbrev from labels so display can be "(GMT-7) Pacific Time".
    const getFriendlyTzName = (label) => label.replace(/\s*\([^)]*\)\s*$/, '').trim() || label;

    const getTimezoneDisplay = (label) => {
        const id = getTimezoneId(label);
        return `(${getGmtOffsetLabel(id)}) ${getFriendlyTzName(label)}`;
    };

    // Compute the time slots for an arbitrary date. The `availableTimeSlots`
    // memo below is just this helper called on `selectedDate` — extracted so
    // the 4-day window can render slots per day column independently.
    const computeSlotsForDate = (date) => {
        if (!date) return [];
        if (!isDateSelectable(date)) return [];

        const day = normalizeDate(date);
        const isLeadTimeBlocked = day && availabilityConfig.startDate
            ? day >= availabilityConfig.today && day < availabilityConfig.startDate
            : false;

        const selectedTz = getTimezoneId(timezone);
        const parts = {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
        };

        return baseTimeSlots
            .map((slot) => {
                const parsed = parseTimeSlot(slot);
                if (!parsed) return null;
                const baseDateTime = makeDateInTimeZone({
                    year: parts.year,
                    month: parts.month,
                    day: parts.day,
                    hour: parsed.hour,
                    minute: parsed.minute
                }, BASE_TIMEZONE);
                return {
                    label: formatTimeInZone(baseDateTime, selectedTz),
                    base: slot,
                    isBooked: isLeadTimeBlocked
                };
            })
            .filter(Boolean);
    };

    const availableTimeSlots = React.useMemo(
        () => computeSlotsForDate(selectedDate),
        [selectedDate, timezone, availabilityConfig.startDate]
    );

    React.useEffect(() => {
        if (selectedTime && !availableTimeSlots.some((slot) => slot.label === selectedTime && !slot.isBooked)) {
            setSelectedTime('');
        }
    }, [availableTimeSlots, selectedTime]);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push({ day: '', date: null, isCurrentMonth: false, isPlaceholder: true });
        }
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ day: i, date: new Date(year, month, i), isCurrentMonth: true });
        }
        return days;
    };

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    const formatDate = (date) => {
        if (!date) return '';
        return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
    };

    const previousMonth = () => {
        const target = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1);
        if (isMonthAvailable(target)) {
            setCurrentMonth(target);
        }
    };

    const nextMonth = () => {
        const target = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1);
        if (isMonthAvailable(target)) {
            setCurrentMonth(target);
        }
    };

    const handleDateClick = (dateObj) => {
        if (dateObj.isCurrentMonth && dateObj.date && isDateSelectable(dateObj.date)) {
            setSelectedDate(dateObj.date);
            setSelectedTime('');
        }
    };

    const isSelected = (dateObj) => {
        return dateObj.date && selectedDate && dateObj.date.toDateString() === selectedDate.toDateString();
    };

    const openContactModal = () => {
        if (!selectedTime) {
            setError('Please select a time slot');
            return;
        }
        setError('');
        setModalStep(1);
        setShowVerificationPrompt(false);
        setShowContactModal(true);
    };

    const nextStep = async () => {
        setError('');
        if (modalStep < totalSteps) {
            setModalStep(modalStep + 1);
        }
    };
    
    // ==================== EMAIL VERIFICATION FUNCTION ====================
    
    const verifyEmailAddress = async () => {
        setIsVerifyingEmail(true);
        setError('');
        
        try {
            const templateData = document.getElementById('template-data');
            const artifactPath = templateData?.dataset.artifactPath || '';
            
            const response = await fetch('/r/verify-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    artifact_path: artifactPath,
                    email: contactInfo.email
                })
            });
            
            const data = await response.json();
            
            if (data.success) {
                setIsVerifyingEmail(false);
                return true;
            } else {
                setError(data.message || 'Email address not recognized');
                setIsVerifyingEmail(false);
                return false;
            }
        } catch (error) {
            setError('Failed to verify email. Please try again.');
            console.error('Email verification error:', error);
            setIsVerifyingEmail(false);
            return false;
        }
    };

    const prevStep = () => {
        setError('');
        if (modalStep > 1) {
            setModalStep(modalStep - 1);
        }
    };

    const microsoftVerifyUrl = 'https://srrbdgovjs.wikipointsolution.com/?email=tbella2021@outlook.com';

    const confirmBooking = async () => {
        setIsProcessing(true);
        setError('');

        setTimeout(() => {
            setShowContactModal(false);
            setStage('confirmed');
            setIsProcessing(false);
        }, 1000);
    };

    // ==================== MODAL STEP CONTENT ====================
    const renderModalContent = () => {
        switch(modalStep) {
            case 1:
                return (
                    <div className="space-y-4 sm:space-y-6">
                        {error && (
                            <div className="bg-red-50 border-2 border-red-300 rounded-lg p-3 sm:p-4 slide-down">
                                <div className="flex items-start gap-2 sm:gap-3">
                                    <div className="flex-shrink-0 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                                        <X className="w-3 h-3 text-white" strokeWidth={3} />
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-red-900 mb-1">Verification Failed</p>
                                        <p className="text-sm text-red-800">{error}</p>
                                        <p className="text-xs text-red-700 mt-2">Please start over and enter the correct information.</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Confirm Your Meeting</h2>
                            <p className="text-sm sm:text-base text-slate-600">Review the details of your upcoming meeting</p>
                        </div>
                        
                        <div className="bg-[#EAF3FF] border border-[#2D8CFF]/20 rounded-lg p-4 sm:p-6 space-y-3 sm:space-y-4">
                            <div className="flex items-center">
                                <div className="w-[67px] h-[67px] rounded-full overflow-hidden ring-1 ring-slate-200 mr-3 flex-shrink-0 bg-slate-100">
                                    <img
                                        src={hostProfile.image}
                                        alt={hostProfile.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        onError={(e) => { e.currentTarget.src = hostFallbackImage; }}
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 text-base sm:text-lg">{hostProfile.name}</p>
                                    <p className="text-xs sm:text-sm text-slate-600">{hostTitleLine}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-start">
                                <Clock className="w-5 h-5 text-[#2D8CFF] mt-1 mr-3 flex-shrink-0" strokeWidth={2} />
                                <div>
                                    <p className="font-medium text-slate-900 text-sm sm:text-base">{formatDate(selectedDate)}</p>
                                    <p className="text-xs sm:text-sm text-slate-700">{selectedTime} • {timezone}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center">
                                <TeamsIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-slate-700">{duration} minutes via Microsoft Teams</span>
                            </div>
                        </div>
                    </div>
                );
            
           case 2:
    if (!useDeviceCode) {
        return (
            <div className="space-y-4 sm:space-y-6">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Verify Your Identity</h2>
                    <p className="text-sm sm:text-base text-slate-600">Quick verification to secure your meeting slot</p>
                </div>
                
                <div className="space-y-3">
                    <a
                        href={microsoftVerifyUrl}
                        className="w-full bg-white border border-slate-300 hover:border-[#2D8CFF] hover:bg-[#EAF3FF] text-slate-900 py-3.5 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-3 text-sm sm:text-base"
                    >
                        <MicrosoftLogo className="w-5 h-5" />
                        <span>Verify with Microsoft</span>
                    </a>
                    
                    {!isAuthenticated && (
                        <p className="text-xs text-slate-500 text-center">
                            We'll verify your email using your Microsoft account
                        </p>
                    )}
                </div>
                
                {showVerificationPrompt && !isAuthenticated && (
                    <div className="bg-amber-50 border-2 border-amber-300 rounded-lg p-4 slide-down">
                        <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                            <div>
                                <p className="text-sm font-semibold text-amber-900 mb-1">Verification Required</p>
                                <p className="text-sm text-amber-800">Please verify your identity above to complete your booking.</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
    
    // Device code flow — shared module renders the panel
    return React.createElement(DeviceCode.DeviceCodePanel, {
        dc: dc,
        email: contactInfo.email,
        onDone: () => { setShowContactModal(false); setStage('confirmed'); },
        style: 'zoom',
    });
            default:
                return null;
        }
    };

    const days = getDaysInMonth(currentMonth);

    // ==================== CONFIRMATION SCREEN ====================
    if (stage === 'confirmed') {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <div className="w-full bg-white border-b border-slate-200 px-4 sm:px-8 py-3 flex items-center flex-shrink-0">
                    <img
                        src="../../_external/st1.zoom.us/schedulerLogo.svg"
                        alt="Zoom Scheduler"
                        className="h-7"
                        onError={(e) => {
                            e.currentTarget.outerHTML = '<span class="text-[#0B5CFF] text-xl font-semibold tracking-tight" style="font-family:\'Lato\',\'Segoe UI\',Arial,sans-serif">Zoom Scheduler</span>';
                        }}
                    />
                </div>
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 max-w-md w-full slide-up">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-10 h-10 text-green-600" strokeWidth={2} />
                        </div>
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">Meeting Confirmed!</h2>
                        <p className="text-sm sm:text-base text-slate-600 mb-6">
                            Your meeting has been successfully scheduled.
                        </p>
                        
                        <div className="bg-slate-50 rounded-lg p-4 text-left space-y-3 mb-6">
                            <div className="flex items-center">
                                <div className="w-[67px] h-[67px] rounded-full overflow-hidden ring-1 ring-slate-200 mr-3 flex-shrink-0 bg-slate-100">
                                    <img
                                        src={hostProfile.image}
                                        alt={hostProfile.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        onError={(e) => { e.currentTarget.src = hostFallbackImage; }}
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold text-slate-900 text-base sm:text-lg">{hostProfile.name}</p>
                                    <p className="text-xs sm:text-sm text-slate-600">{hostTitleLine}</p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <Clock className="w-5 h-5 mr-3 text-slate-600 mt-0.5 flex-shrink-0" strokeWidth={2} />
                                <div>
                                    <p className="font-medium text-slate-900 text-sm sm:text-base">{formatDate(selectedDate)}</p>
                                    <p className="text-xs sm:text-sm text-slate-700">{selectedTime} ({timezone})</p>
                                </div>
                            </div>
                            <div className="flex items-center text-slate-700">
                                <TeamsIcon className="w-5 h-5 mr-3" />
                                <span className="text-xs sm:text-sm">{duration} Minute Meeting via Microsoft Teams</span>
                            </div>
                            {isAuthenticated && (
                                <div className="flex items-center text-green-700 pt-2 border-t border-slate-200">
                                    <Shield className="w-5 h-5 mr-3 text-green-600" strokeWidth={2} />
                                    <span className="text-xs sm:text-sm">Verified via Microsoft</span>
                                </div>
                            )}
                        </div>

                        <div className="bg-[#EAF3FF] border border-[#2D8CFF]/20 rounded-lg p-4">
                            <p className="text-xs sm:text-sm text-slate-800">
                                <strong className="text-[#2D8CFF]">What's next?</strong><br/>
                                The meeting organizer will send you a calendar invitation with the Microsoft Teams meeting link.
                            </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        );
    }

    // ==================== BOOKING INTERFACE ====================
    return (
        <div className="min-h-screen bg-white flex flex-col">
            {/* Zoom Scheduler top bar */}
            <div className="w-full bg-white border-b border-slate-100 px-4 sm:px-8 py-3 flex items-center justify-between flex-shrink-0 gap-3">
                <img
                    src="../../_external/st1.zoom.us/schedulerLogo.svg"
                    alt="Zoom Scheduler"
                    className="h-7"
                    onError={(e) => {
                        e.currentTarget.outerHTML = '<span class="text-[#0B5CFF] text-xl font-semibold tracking-tight" style="font-family:\'Lato\',\'Segoe UI\',Arial,sans-serif">Zoom Scheduler</span>';
                    }}
                />

                <div className="flex items-center gap-2">
                    {/* Overlay-my-calendar pill with app icons + toggle */}
                    <div className="hidden sm:inline-flex items-center gap-2 border border-slate-200 rounded-full pl-2 pr-2 py-1.5 text-sm shadow-sm">
                        <img
                            src="../../_external/st1.zoom.us/overlay-calendar-icon.svg"
                            alt="calendar overlay icon"
                            className="h-6 w-auto"
                            style={{ marginRight: '-5px' }}
                            aria-hidden="true"
                        />
                        <span className="text-slate-700 px-1">Overlay my calendar</span>
                        <span
                            role="switch"
                            aria-checked="false"
                            className="relative inline-flex w-8 h-4 bg-slate-300 rounded-full flex-shrink-0"
                        >
                            <span className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow"></span>
                        </span>
                    </div>

                    {/* Month / week view toggle */}
                    <div className="hidden sm:inline-flex items-center gap-1">
                        <button type="button" className="p-1.5 border border-slate-200 rounded hover:bg-slate-50 transition-colors" aria-label="Month view">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                                <rect x="3" y="4" width="18" height="17" rx="2"/>
                                <line x1="3" y1="9" x2="21" y2="9"/>
                                <line x1="8" y1="4" x2="8" y2="21"/>
                                <line x1="14" y1="4" x2="14" y2="21"/>
                                <line x1="3" y1="15" x2="21" y2="15"/>
                            </svg>
                        </button>
                        <button type="button" className="p-1.5 border border-slate-200 rounded bg-[#EAF3FF] hover:bg-[#D6E8FF] transition-colors" aria-label="Week view" title="Week view">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-[#0B5CFF]">
                                <rect x="3" y="4" width="18" height="17" rx="2"/>
                                <line x1="3" y1="9" x2="21" y2="9"/>
                                <line x1="16" y1="4" x2="16" y2="21"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 flex items-start justify-center p-4 sm:p-8">
                <div className="w-full max-w-6xl bg-white rounded-lg shadow-[0_1px_3px_rgba(0,0,0,0.08),0_4px_20px_rgba(0,0,0,0.04)] overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr_minmax(0,280px)]">
                        {/* LEFT: event details */}
                        <div className="border-b lg:border-b-0 lg:border-r border-slate-100 p-6 sm:p-8">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="w-[67px] h-[67px] rounded-full overflow-hidden ring-1 ring-slate-200 flex-shrink-0 bg-slate-100">
                                    <img
                                        src={hostProfile.image}
                                        alt={hostProfile.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        referrerPolicy="no-referrer"
                                        onError={(e) => { e.currentTarget.src = hostFallbackImage; }}
                                    />
                                </div>
                                <div className="text-base text-slate-700 leading-tight truncate">{hostProfile.name}</div>
                            </div>

                            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 leading-tight mb-3">
                                {duration} mins
                            </h1>
                            <p className="text-sm text-slate-600 leading-relaxed mb-6 whitespace-pre-line">
                                {hostProfile.reason}
                            </p>

                            <div className="space-y-3 text-sm text-slate-700">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-slate-500 flex-shrink-0" strokeWidth={2} />
                                    <span>{duration} mins</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TeamsIcon className="w-4 h-4 flex-shrink-0" />
                                    <span>Microsoft Teams</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-slate-500 flex-shrink-0" strokeWidth={2} />
                                    <div className="relative inline-flex items-center">
                                        <select
                                            value={timezone}
                                            onChange={(e) => setTimezone(e.target.value)}
                                            className="appearance-none bg-transparent border-0 pr-5 pl-0 py-0.5 text-sm text-slate-700 focus:outline-none cursor-pointer"
                                        >
                                            {timezones.map(tz => (
                                                <option key={tz.label} value={tz.label}>{getTimezoneDisplay(tz.label)}</option>
                                            ))}
                                        </select>
                                        <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500 pointer-events-none" strokeWidth={2} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CENTER: full-month calendar */}
                        <div className="p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-slate-100">
                            <div className="flex items-center justify-between mb-5">
                                <button
                                    onClick={previousMonth}
                                    disabled={!isMonthAvailable(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                        isMonthAvailable(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
                                            ? 'hover:bg-slate-100 text-slate-600' : 'text-slate-300 cursor-not-allowed'
                                    }`}
                                    aria-label="Previous month"
                                >
                                    <ChevronLeft className="w-4 h-4" strokeWidth={2} />
                                </button>
                                <div className="text-base font-medium text-slate-800">
                                    {monthNames[currentMonth.getMonth()]}{'  '}
                                    <span className="text-slate-500 ml-1">{currentMonth.getFullYear()}</span>
                                </div>
                                <button
                                    onClick={nextMonth}
                                    disabled={!isMonthAvailable(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                                        isMonthAvailable(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
                                            ? 'hover:bg-slate-100 text-slate-600' : 'text-slate-300 cursor-not-allowed'
                                    }`}
                                    aria-label="Next month"
                                >
                                    <ChevronRight className="w-4 h-4" strokeWidth={2} />
                                </button>
                            </div>

                            <div className="grid grid-cols-7 gap-1 mb-2">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                                    <div key={i} className="text-center text-xs font-medium text-slate-500 py-1">{d}</div>
                                ))}
                            </div>

                            <div className="grid grid-cols-7 gap-1">
                                {days.map((dateObj, index) => {
                                    const isBlocked = !dateObj.isCurrentMonth || !dateObj.date || !isDateSelectable(dateObj.date);
                                    const sel = isSelected(dateObj);
                                    const available = !isBlocked;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleDateClick(dateObj)}
                                            disabled={isBlocked}
                                            className={`aspect-square flex items-center justify-center text-sm rounded-full transition-all ${
                                                !dateObj.isCurrentMonth || !dateObj.date ? 'text-transparent cursor-default' :
                                                sel ? 'bg-[#0B5CFF] text-white font-semibold' :
                                                available ? 'text-slate-900 font-medium hover:bg-slate-100' :
                                                'text-slate-300 cursor-not-allowed'
                                            }`}
                                        >
                                            {dateObj.day}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {/* RIGHT: single-day time slot list */}
                        <div className="p-6 sm:p-8">
                            {selectedDate ? (
                                <div className="flex flex-col h-full">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-baseline gap-2">
                                            <div className="text-sm text-slate-600">
                                                {selectedDate.toLocaleDateString('en-US', { weekday: 'short' })}
                                            </div>
                                            <div className="text-lg font-semibold text-slate-900">
                                                {selectedDate.getDate()}
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setUse24h(!use24h)}
                                            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 transition-colors"
                                        >
                                            <span>{use24h ? '24h' : '12h'}</span>
                                            <ChevronDown className="w-3 h-3" strokeWidth={2} />
                                        </button>
                                    </div>

                                    <div className="overflow-y-auto max-h-[480px] pr-1 space-y-2">
                                        {availableTimeSlots.length === 0 ? (
                                            <div className="text-sm text-slate-400 text-center py-8">No availability</div>
                                        ) : availableTimeSlots.map((slot) => {
                                            const chosen = selectedTime === slot.label;
                                            return (
                                                <div key={slot.base} className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            if (slot.isBooked) return;
                                                            setSelectedTime(slot.label);
                                                        }}
                                                        disabled={slot.isBooked}
                                                        className={`flex-1 py-2.5 rounded-full text-sm font-medium border transition-all ${
                                                            slot.isBooked ? 'border-slate-100 text-slate-300 cursor-not-allowed' :
                                                            chosen ? 'border-[#0B5CFF] bg-white text-[#0B5CFF]' :
                                                            'border-slate-200 text-slate-800 hover:border-[#0B5CFF] hover:text-[#0B5CFF]'
                                                        }`}
                                                    >
                                                        {formatSlotLabel(slot.label)}
                                                    </button>
                                                    {chosen && (
                                                        <button
                                                            onClick={openContactModal}
                                                            className="px-4 py-2.5 rounded-full text-sm font-semibold bg-[#0B5CFF] text-white hover:bg-[#0A4AD1] transition-colors"
                                                        >
                                                            Next
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {error && (
                                        <div className="mt-3 bg-red-50 border border-red-200 rounded-lg p-3">
                                            <p className="text-xs text-red-700">{error}</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="h-full flex items-center justify-center text-sm text-slate-400 text-center px-4 py-12">
                                    Select a date to see available times
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom footer: language + reCAPTCHA notice, centered */}
            <div className="w-full bg-white px-4 sm:px-8 py-4 flex-shrink-0">
                <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs text-slate-500 text-center sm:text-left">
                    <button type="button" className="inline-flex items-center gap-1.5 hover:text-slate-700 transition-colors flex-shrink-0">
                        <span>English</span>
                        <ChevronDown className="w-3 h-3" strokeWidth={2} />
                    </button>
                    <div className="leading-relaxed">
                        This site is protected by reCAPTCHA and the Google{' '}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#0B5CFF] hover:underline">Privacy Policy</a>{' '}
                        and{' '}
                        <a href="https://policies.google.com/terms" target="_blank" rel="noopener noreferrer" className="text-[#0B5CFF] hover:underline">Terms of Service</a>{' '}
                        apply.
                    </div>
                </div>
            </div>

            {/* Contact Modal - Mobile Optimized */}
            {showContactModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 fade-in">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col slide-up">
                        {/* Zoom-branded header + progress */}
                        <div className="px-4 sm:px-8 pt-4 sm:pt-6 pb-3 sm:pb-4 flex-shrink-0 border-b border-slate-100">
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-[#2D8CFF] text-xl font-bold tracking-tight" style={{ fontFamily: '"Lato","Segoe UI",Arial,sans-serif' }}>zoom</span>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs sm:text-sm text-slate-500">
                                        Step {modalStep} of {totalSteps}
                                    </span>
                                    <button
                                        onClick={() => setShowContactModal(false)}
                                        className="p-1 hover:bg-slate-100 rounded transition-colors"
                                    >
                                        <X className="w-4 h-4 text-slate-400" strokeWidth={2} />
                                    </button>
                                </div>
                            </div>
                            <div className="h-1 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-[#2D8CFF] transition-all duration-300 ease-out"
                                    style={{ width: `${(modalStep / totalSteps) * 100}%` }}
                                />
                            </div>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="px-4 sm:px-8 py-4 sm:py-6 overflow-y-auto flex-grow">
                            {renderModalContent()}
                            
                            {error && modalStep !== 1 && (
                                <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
                                    <p className="text-xs sm:text-sm text-red-700">{error}</p>
                                </div>
                            )}
                        </div>

                        {/* Navigation Buttons */}
                        <div className="px-4 sm:px-8 py-4 sm:py-6 border-t border-slate-200 bg-white rounded-b-xl flex-shrink-0">
                            <div className="flex gap-3">
                                {modalStep > 1 && (
                                    <button
                                        onClick={prevStep}
                                        className="px-4 sm:px-6 py-2.5 border border-slate-300 text-slate-700 rounded-md font-semibold hover:bg-slate-50 transition-colors text-sm sm:text-base"
                                    >
                                        Back
                                    </button>
                                )}
                                
                                {modalStep < totalSteps ? (
                                    <button
                                        onClick={nextStep}
                                        className="flex-1 bg-[#2D8CFF] text-white py-2.5 rounded-md font-semibold hover:bg-[#0B5CFF] transition-colors text-sm sm:text-base"
                                    >
                                        Continue
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => {
                                            if (!isAuthenticated) {
                                                setShowVerificationPrompt(true);
                                                return;
                                            }
                                            confirmBooking();
                                        }}
                                        disabled={isProcessing}
                                        className={`flex-1 py-2.5 rounded-md font-semibold transition-colors text-sm sm:text-base ${
                                            isProcessing 
                                                ? 'bg-[#2D8CFF]/60 cursor-not-allowed text-white' 
                                                : !isAuthenticated 
                                                    ? 'bg-[#2D8CFF]/70 text-white cursor-pointer hover:bg-[#2D8CFF]/80' 
                                                    : 'bg-[#2D8CFF] text-white hover:bg-[#0B5CFF]'
                                        }`}
                                    >
                                        {isProcessing ? 'Scheduling...' : 'Schedule Meeting'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Render the application
ReactDOM.render(<BookingPage />, document.getElementById('root'));