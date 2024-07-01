import CompetitorLap from 'Component/CompetitorLap';

export default function CompetitorRow({ competitor, startDateTime, onCompetitorChangeHandler, onCompetitorLapChange, onCompetitorLapSet, onRemoveCompetitorClickHandler }) {
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
            <td className="p-2 w-16 text-center">{competitor.ordinal} <button type="button" onClick={() => onRemoveCompetitorClickHandler(competitor)} className="cta-small ml-2">x</button></td>
            <td className="p-2 w-36"><input type="text" name="name" value={competitor.name} onChange={(e) => onCompetitorChangeHandler(competitor, e.target.name, e.target.value)} className="w-32" /></td>
            <td className="p-2 w-36"><input type="text" name="number" value={competitor.number} onChange={(e) => onCompetitorChangeHandler(competitor, e.target.name, e.target.value)} className="w-32" /></td>
            <td className="p-2 w-36"><input type="text" name="class" value={competitor.class} onChange={(e) => onCompetitorChangeHandler(competitor, e.target.name, e.target.value)} className="w-32" /></td>
            {competitorLaps}
            <td className="p-2 w-36 text-center font-mono">{competitor.timeTotal}</td>
            <td className="p-2 w-36 text-center font-serif">{completed}</td>
        </tr>
    );
}
