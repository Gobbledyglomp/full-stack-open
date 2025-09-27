// Header
const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

// Courses
const Part = (props) => {
  return (
    <>
      <p>
        {props.info[0]} {props.info[1]}
      </p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part info={props.part1} />
      <Part info={props.part2} />
      <Part info={props.part3} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.value}</p>
    </>
  )
}

// App
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content part1={[ part1, exercises1 ]} part2={[ part2, exercises2 ]} part3={[ part3, exercises3 ]} />
      <Total value={exercises1 + exercises2 + exercises3} />
    </>
  )
}

export default App