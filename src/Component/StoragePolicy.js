export default function StoragePolicy() {
    return (
        <div>
            <h1 className="page-header">Storage Policy</h1>

            <table className="max-w-2xl">
                <thead>
                    <tr className="border-b border-sky-600">
                        <th className="p-2 w-32">Type</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Necessity</th>
                        <th className="p-2">Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="p-2 w-32 text-center align-top">Local storage</td>
                        <td className="p-2 text-center align-top">races</td>
                        <td className="p-2 text-center align-top">Necessary</td>
                        <td className="p-2">To store all the races and laps added by a user. This is necessary as it is the only means of storage for the app. Data is stored only in the user's browser and is not transmitted back to any server. Data can be cleared by the user using the browser's history settings.</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
