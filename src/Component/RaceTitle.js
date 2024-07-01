export default function RaceTitle({ title, onRaceTitleChangeHandler }) {
    return (
        <div className="my-4">
            <label htmlFor="race-title">Name:</label> <input type="text" id="race-title" value={title} onChange={(e) => onRaceTitleChangeHandler(e.target.value)} className="border border-gray-300 px-1" />
        </div>
    );
}
