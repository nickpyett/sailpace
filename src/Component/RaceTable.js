import CompetitorRow from 'Component/CompetitorRow';
import RaceTableHeader from 'Component/RaceTableHeader';

export default function RaceTable({
    competitors,
    startDateTime,
    laps,
    competitorSort,
    onCompetitorChangeHandler,
    onSortButtonClickHandler,
    onCompetitorLapChange,
    onCompetitorLapSet,
    onRemoveLapClickHandler,
    onRemoveCompetitorClickHandler
}) {
    function handleSortButtonClick(e) {
        onSortButtonClickHandler(e.target.name);
    }

    const { orderBy, orderByLap, direction } = competitorSort;

    if (['ordinal', 'name', 'class', 'number', 'lap', 'timeTotal'].includes(orderBy)) {
        let sortFunction = null;

        if (orderBy !== 'lap') {
            if (direction === 'asc') {
                sortFunction = (a, b) => a[orderBy] > b[orderBy];
            } else {
                sortFunction = (a, b) => a[orderBy] < b[orderBy];
            }
        } else {
            sortFunction = (a, b) => {
                const aLap = a.laps.find(lapRow => lapRow.lapId === orderByLap.id);
                const bLap = b.laps.find(lapRow => lapRow.lapId === orderByLap.id);

                if (direction === 'asc') {
                    return aLap.time > bLap.time;
                }

                return aLap.time < bLap.time;
            };
        }

        competitors.sort(sortFunction);
    }

    const competitorRows = competitors.map(competitor => {
        return <CompetitorRow
            key={competitor.id}
            competitor={competitor}
            startDateTime={startDateTime}
            onCompetitorChangeHandler={onCompetitorChangeHandler}
            onCompetitorLapChange={onCompetitorLapChange}
            onCompetitorLapSet={onCompetitorLapSet}
            onRemoveCompetitorClickHandler={onRemoveCompetitorClickHandler}
        />;
    });

    const raceTableHeaders = laps.map(lap => {
        const disabled = laps.length > lap.number;

        return <RaceTableHeader
            key={lap.id}
            lap={lap}
            disabled={disabled}
            onRemoveLapClickHandler={onRemoveLapClickHandler}
            onSortButtonClickHandler={onSortButtonClickHandler}
        />
    });

    return (
        <form className="my-4 overflow-x-scroll">
            <table className="table-fixed w-max">
                <thead>
                    <tr className="border-b border-sky-600">
                        <th className="p-2 w-16"># <button type="button" name="ordinal" onClick={handleSortButtonClick} title="Sort">&#x25B2;&#x25BC;</button></th>
                        <th className="p-2 w-36">Name <button type="button" name="name" onClick={handleSortButtonClick} title="Sort">&#x25B2;&#x25BC;</button></th>
                        <th className="p-2 w-36">Number <button type="button" name="number" onClick={handleSortButtonClick} title="Sort">&#x25B2;&#x25BC;</button></th>
                        <th className="p-2 w-36">Class <button type="button" name="class" onClick={handleSortButtonClick} title="Sort">&#x25B2;&#x25BC;</button></th>
                        {raceTableHeaders}
                        <th className="p-2 w-36">
                            Total
                            &nbsp;
                            <button type="button" name="timeTotal" onClick={handleSortButtonClick} title="Sort">&#x25B2;&#x25BC;</button>
                        </th>
                        <th className="p-2 w-36">Finished</th>
                    </tr>
                </thead>
                <tbody>
                    {competitorRows}
                </tbody>
            </table>
        </form>
    );
}
