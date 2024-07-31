function LevelAnnouncer({ _index, _score }) {
    return (
        <div className="levelAnnouncer">
            <h2>LEVEL {_index}</h2>
            <h3>Score {_score}</h3>
        </div>
    )
}

export default LevelAnnouncer