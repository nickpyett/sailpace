import { Component } from 'react';
import CompetitorLap from 'Component/CompetitorLap';

class CompetitorRow extends Component {
    onCompetitorChangeHandler(e) {
        this.props.onCompetitorChangeHandler(this.props.competitor, e.target.name, e.target.value);
    }

    onRemoveCompetitorClickHandler() {
        this.props.onRemoveCompetitorClickHandler(this.props.competitor);
    }

    render() {
        let raceCompleted = true;
        let previousLapHasTime = true;

        const competitorLaps = this.props.competitor.laps.map(lap => {
            if (lap.time === '') {
                raceCompleted = false;
            }

            const competitorLap = <CompetitorLap
                key={lap.id}
                lap={lap}
                competitor={this.props.competitor}
                startDateTime={this.props.startDateTime}
                onCompetitorLapChange={this.props.onCompetitorLapChange}
                onCompetitorLapSet={this.props.onCompetitorLapSet}
                isCurrentLap={previousLapHasTime}
            />;

            previousLapHasTime = !! lap.time;

            return competitorLap;
        });

        if (0 === this.props.competitor.laps.length) {
            raceCompleted = false;
        }

        const completed = raceCompleted ? String.fromCharCode('10004') : '-';

        return (
            <tr className="border-b border-gray-300">
                <td className="p-2 w-16 text-center">{this.props.competitor.ordinal} <button type="button" onClick={this.onRemoveCompetitorClickHandler.bind(this)} className="cta-small ml-2">x</button></td>
                <td className="p-2 w-36"><input type="text" name="name" value={this.props.competitor.name} onChange={this.onCompetitorChangeHandler.bind(this)} className="w-32" /></td>
                <td className="p-2 w-36"><input type="text" name="number" value={this.props.competitor.number} onChange={this.onCompetitorChangeHandler.bind(this)} className="w-32" /></td>
                <td className="p-2 w-36"><input type="text" name="class" value={this.props.competitor.class} onChange={this.onCompetitorChangeHandler.bind(this)} className="w-32" /></td>
                {competitorLaps}
                <td className="p-2 w-36 text-center font-mono">{this.props.competitor.timeTotal}</td>
                <td className="p-2 w-36 text-center font-serif">{completed}</td>
            </tr>
        );
    }
}

export default CompetitorRow;
