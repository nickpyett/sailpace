export default function RaceEnd({ startDateTime, endDateTime, setEndDateTimeHandler }) {
    function handleRaceEndClick() {
        if (endDateTime !== null) {
            return;
        }

        if (! window.confirm('Are you sure you wish to end the race?')) {
            return;
        }

        setEndDateTimeHandler();
    }

    const disabled = startDateTime === null || endDateTime !== null;

    return (
        <button disabled={disabled} onClick={handleRaceEndClick} className="cta-link">
            <span className="rounded bg-red-600 h-3 w-3 inline-block mr-1"></span>
            End Race
        </button>
    );
}
