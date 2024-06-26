export default function RaceTableHeader({ lap, disabled, onRemoveLapClickHandler, onSortButtonClickHandler }) {
    function handleRemoveLapClick() {
        onRemoveLapClickHandler(lap);
    }

    function handleSortButtonClick() {
        onSortButtonClickHandler('lap', lap);
    }

    return (
        <th className="p-2 w-48">
            Lap {lap.number}
            &nbsp;
            <button type="button" onClick={handleSortButtonClick} title="Sort">&#x25B2;&#x25BC;</button>
            <button type="button" disabled={disabled} title={disabled ? 'Only the last lap may be deleted' : 'Delete this lap'} onClick={handleRemoveLapClick} className="ml-2 cta-small font-normal">x</button>
        </th>
    );
}
