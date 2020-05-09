const StarsDisplay = (props) => {
  // return (
  //   <React.fragment>
  //     {utils.range(1, props.count).map((starId) => {
  //       return <div key={starId} className="star" />;
  //     })}
  //   </React.fragment>
  // );

  // Note: Seems like the babel script cannot support React.fragment or <></> syntax

  // The below code is the convertion from babel site
  return React.createElement(
    React.Fragment,
    null,
    utils.range(1, props.count).map(function (starId) {
      return React.createElement('div', {
        key: starId,
        className: 'star'
      });
    })
  );
};

// Note: If we named this component 'Number', it will override the primitive Number class
const PlayNumber = (props) => {
  return (
    <button className="number" style={{ backgroundColor: colors[props.status] }} onClick={() => props.onClick(props.number, props.status)}>
      {props.number}
    </button>
  );
};

const PlayAgain = (props) => {
  return (
    <div className="game-done">
      <div className="message" style={{ color: props.gameStatus === 'lost' ? 'red' : 'green' }}>
        {props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
      </div>
      <button onClick={props.onClick}>Play Again</button>
    </div>
  );
};

// Refactoring - Custom Hook
const useGameState = () => {
  const [stars, setStars] = React.useState(utils.random(1, 9));
  const [availableNums, setAvailableNums] = React.useState(utils.range(1, 9));
  const [candidateNums, setCandidateNums] = React.useState([]);
  const [secondsLeft, setSecondsLeft] = React.useState(10);

  React.useEffect(() => {
    if (secondsLeft > 0 && availableNums.length > 0) {
      const timerId = setTimeout(() => {
        setSecondsLeft(secondsLeft - 1);
      }, 1000);

      return () => clearTimeout(timerId);
    }
  });

  const setGameState = (newCandidateNums) => {
    if (utils.sum(newCandidateNums) !== stars) {
      setCandidateNums(newCandidateNums);
    } else {
      const newAvailableNums = availableNums.filter((x) => !newCandidateNums.includes(x));

      setStars(utils.randomSumIn(newAvailableNums, 9));
      setAvailableNums(newAvailableNums);
      setCandidateNums([]);
    }
  };

  return { stars, availableNums, candidateNums, secondsLeft, setGameState };
};

const Game = (props) => {
  const { stars, availableNums, candidateNums, secondsLeft, setGameState } = useGameState();

  // const [stars, setStars] = React.useState(utils.random(1, 9));
  // const [availableNums, setAvailableNums] = React.useState(utils.range(1, 9));
  // const [candidateNums, setCandidateNums] = React.useState([]);
  // const [secondsLeft, setSecondsLeft] = React.useState(10);

  // React.useEffect(() => {
  //   if (secondsLeft > 0 && availableNums.length > 0) {
  //     const timerId = setTimeout(() => {
  //       setSecondsLeft(secondsLeft - 1);
  //     }, 1000);

  //     return () => clearTimeout(timerId);
  //   }
  // });

  const candidatesAreWrong = utils.sum(candidateNums) > stars;
  const gameStatus = availableNums.length === 0 ? 'won' : secondsLeft === 0 ? 'lost' : 'active';

  // Note: Instead of resetting state, update component key at parent level to unmount and mount again
  // const resetGame = () => {
  //   setStars(utils.random(1, 9));
  //   setAvailableNums(utils.range(1, 9));
  //   setCandidateNums([]);
  //   setSecondsLeft(10);
  // };

  const numberStatus = (number) => {
    if (!availableNums.includes(number)) {
      return 'used';
    }

    if (candidateNums.includes(number)) {
      return candidatesAreWrong ? 'wrong' : 'candidate';
    }

    return 'available';
  };

  const onNumberClick = (number, currentStatus) => {
    if (gameStatus !== 'active' || currentStatus === 'used') {
      return;
    }

    const newCandidateNums = currentStatus === 'available' ? candidateNums.concat(number) : candidateNums.filter((x) => x !== number);

    setGameState(newCandidateNums);

    // if (utils.sum(newCandidateNums) !== stars) {
    //   setCandidateNums(newCandidateNums);
    // } else {
    //   const newAvailableNums = availableNums.filter((x) => !newCandidateNums.includes(x));

    //   setStars(utils.randomSumIn(newAvailableNums, 9));
    //   setAvailableNums(newAvailableNums);
    //   setCandidateNums([]);
    // }
  };

  return (
    <div className="game">
      <div className="help">Pick 1 or more numbers that sum to the number of stars</div>
      <div className="body">
        <div className="left">{gameStatus !== 'active' ? <PlayAgain onClick={props.startNewGame} gameStatus={gameStatus} /> : <StarsDisplay count={stars} />}</div>
        <div className="right">
          {utils.range(1, 9).map((num) => (
            <PlayNumber key={num} status={numberStatus(num)} number={num} onClick={onNumberClick} />
          ))}
        </div>
      </div>
      <div className="timer">Time Remaining: {secondsLeft}</div>
    </div>
  );
};

const StarMatch = () => {
  const [gameId, setGameId] = React.useState(1);
  return <Game key={gameId} startNewGame={() => setGameId(gameId + 1)} />;
};

// Color Theme
const colors = {
  available: 'lightgray',
  used: 'lightgreen',
  wrong: 'lightcoral',
  candidate: 'deepskyblue'
};

// Math science
const utils = {
  // Sum an array
  sum: (arr) => arr.reduce((acc, curr) => acc + curr, 0),

  // create an array of numbers between min and max (edges included)
  range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

  // pick a random number between min and max (edges included)
  random: (min, max) => min + Math.floor(Math.random() * (max - min + 1)),

  // Given an array of numbers and a max...
  // Pick a random sum (< max) from the set of all available sums in arr
  randomSumIn: (arr, max) => {
    const sets = [[]];
    const sums = [];
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0, len = sets.length; j < len; j++) {
        const candidateSet = sets[j].concat(arr[i]);
        const candidateSum = utils.sum(candidateSet);
        if (candidateSum <= max) {
          sets.push(candidateSet);
          sums.push(candidateSum);
        }
      }
    }
    return sums[utils.random(0, sums.length - 1)];
  }
};

ReactDOM.render(<StarMatch />, root);
