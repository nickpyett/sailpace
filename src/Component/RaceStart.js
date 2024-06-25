export default function RaceStart({ startDateTime, setStartDateTimeHandler }) {
    function handleRaceStartClick() {
        if (startDateTime !== null) {
            return;
        }

        if (! window.confirm('Are you sure you wish to start the race?')) {
            return;
        }

        setStartDateTimeHandler();
    }

    const disabled = startDateTime !== null;

    return (            
        <button disabled={disabled} onClick={handleRaceStartClick} className="cta-link mr-3">
            <span className="rounded bg-emerald-600 h-3 w-3 inline-block mr-1"></span> 
            Start Race
        </button>
    );
}
