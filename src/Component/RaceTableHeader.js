export default function RaceTableHeader({ lap, disabled, onRemoveLapClickHandler, onSortButtonClickHandler }) {
    return (
        <th className="p-2 w-48">
            Lap {lap.number}
            &nbsp;
            <button type="button" onClick={() => onSortButtonClickHandler('lap', lap)} title="Sort">&#x25B2;&#x25BC;</button>
            <button type="button" disabled={disabled} title={disabled ? 'Only the last lap may be deleted' : 'Delete this lap'} onClick={() => onRemoveLapClickHandler(lap)} className="ml-2 cta-small font-normal">x</button>
        </th>
    );
}
