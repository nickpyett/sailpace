import CompetitorLap from 'Component/CompetitorLap';

export default function CompetitorRow({ competitor, startDateTime, onCompetitorChangeHandler, onCompetitorLapChange, onCompetitorLapSet, onRemoveCompetitorClickHandler }) {
    function handleCompetitorChange(e) {
        onCompetitorChangeHandler(competitor, e.target.name, e.target.value);
    }

    function handleRemoveCompetitorClick() {
        onRemoveCompetitorClickHandler(competitor);
    }

    let raceCompleted = true;
    let previousLapHasTime = true;

    const competitorLaps = competitor.laps.map(lap => {
        if (lap.time === '') {
            raceCompleted = false;
        }

        const competitorLap = <CompetitorLap
            key={lap.id}
            lap={lap}
            competitor={competitor}
            startDateTime={startDateTime}
            onCompetitorLapChange={onCompetitorLapChange}
            onCompetitorLapSet={onCompetitorLapSet}
            isCurrentLap={previousLapHasTime}
        />;

        previousLapHasTime = !! lap.time;

        return competitorLap;
    });

    if (competitor.laps.length === 0) {
        raceCompleted = false;
    }

    const completed = raceCompleted ? String.fromCharCode('10004') : '-';

    return (
        <tr className="border-b border-gray-300">
            <td className="p-2 w-16 text-center">{competitor.ordinal} <button type="button" onClick={handleRemoveCompetitorClick} className="cta-small ml-2">x</button></td>
            <td className="p-2 w-36"><input type="text" name="name" value={competitor.name} onChange={handleCompetitorChange} className="w-32" /></td>
            <td className="p-2 w-36"><input type="text" name="number" value={competitor.number} onChange={handleCompetitorChange} className="w-32" /></td>
            <td className="p-2 w-36"><input type="text" name="class" value={competitor.class} onChange={handleCompetitorChange} className="w-32" /></td>
            {competitorLaps}
            <td className="p-2 w-36 text-center font-mono">{competitor.timeTotal}</td>
            <td className="p-2 w-36 text-center font-serif">{completed}</td>
        </tr>
    );
}
