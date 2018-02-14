class Stopwatch extends React.Component {
    constructor(props) {
        super(props)
        this.running = false
        this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        }
        this.start = this.start.bind(this)
        this.stop = this.stop.bind(this)
        this.reset = this.reset.bind(this)
    }

    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        })
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`
        
        function pad0(value) {
            let result = value.toString()
            if (result.length < 2) {
                result = '0' + result
            }
            return result
        }
    }

    start() {
        if (!this.running) {
            this.running = true
            this.watch = setInterval(() => this.step(), 10)
        }
    }

    step() {
        if (!this.running) return
        this.calculate()
    }

    calculate() {
        this.setState((prevState) => {
            prevState.times.miliseconds += 1
            if (prevState.times.miliseconds >= 100) {
                prevState.times.seconds += 1
                prevState.times.miliseconds = 0
            }
            if (prevState.times.seconds >= 60) {
                prevState.times.minutes += 1
                prevState.times.seconds = 0
            }
            return prevState
        })
    }

    stop() {
        this.running = false
        clearInterval(this.watch)
    }

    render() {
        return (
            <div>    
                <div id="controls">
                    <a href="#" id="start" onClick={this.start}>Start</a>
                    <a href="#" id="stop" onClick={this.stop}>Stop</a>
                    <a href="#" id="reset" onClick={this.reset}>Reset</a>
                </div>
                <div id="stopwatch">
                    {this.format(this.state.times)}
                </div>
                <ul id="results">
                </ul>
            </div>
        )
    }
}

ReactDOM.render(
    <Stopwatch />,
    document.getElementById('app')
)