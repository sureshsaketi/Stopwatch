import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  seconds: 0,
}

class StopWatch extends Component {
  state = initialState

  componentWillUnmount = () => {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  incrementTimeInSeconds = () => {
    const {isTimerRunning} = this.state
    if (isTimerRunning) {
      this.setState(prevState => ({seconds: prevState.seconds + 1}))
    }
  }

  onStartTimer = () => {
    this.setState({isTimerRunning: true})
    this.intervalId = setInterval(this.incrementTimeInSeconds, 1000)
  }

  onStopTimer = () => {
    this.setState({isTimerRunning: false})
    this.clearTimerInterval()
  }

  getElapsedSecondsInTimeFormat = () => {
    const {seconds} = this.state
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = secs > 9 ? secs : `0${secs}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onResetTime = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  render() {
    return (
      <>
        <div className="app-container">
          <h1 className="stop-watch-heading">Stopwatch</h1>
          <div className="timer-container">
            <div className="timer-img-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png "
                alt="stopwatch"
                className="timer-image"
              />
              <p className="timer-text">Timer</p>
            </div>
            <h1>{this.getElapsedSecondsInTimeFormat()}</h1>
            <div className="buttons-container">
              <button
                type="button"
                className="start-button"
                onClick={this.onStartTimer}
              >
                Start
              </button>
              <button
                type="button"
                className="stop-button"
                onClick={this.onStopTimer}
              >
                Stop
              </button>
              <button
                type="button"
                className="reset-button"
                onClick={this.onResetTime}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </>
    )
  }
}
export default StopWatch
