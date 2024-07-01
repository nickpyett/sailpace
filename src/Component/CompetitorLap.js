export default function CompetitorLap({ competitor, lap, startDateTime, isCurrentLap, onCompetitorLapChange, onCompetitorLapSet }) {
    const disabled = startDateTime === null || lap.time || ! isCurrentLap;

    return (
        <td className="p-2 w-48 text-center">
            <input type="text" value={lap.time} pattern="\d+:\d{2}:\d{2}\.\d{3}" onChange={(e) => onCompetitorLapChange(competitor, lap, e.target.value)} className="w-32 font-mono border border-gray-300 px-1" />
            <button type="button" disabled={disabled} onClick={() => onCompetitorLapSet(competitor, lap)} className="cta-small ml-2" title={disabled ? 'Only the current lap can be set automatically' : 'Set this lap'}>set</button>
        </td>
    );
}
