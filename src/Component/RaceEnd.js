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
    let title = 'End the race';

    if (startDateTime === null) {
        title = 'Race has not been started'
    } else if (endDateTime !== null) {
        title = 'Race has already ended';
    }

    return (
        <button disabled={disabled} onClick={handleRaceEndClick} className="cta-link" title={title}>
            <span className="rounded bg-red-600 h-3 w-3 inline-block mr-1"></span>
            End Race
        </button>
    );
}
