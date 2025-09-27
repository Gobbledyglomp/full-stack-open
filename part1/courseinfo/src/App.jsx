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
        {props.object.name}: {props.object.exercises}
      </p>
    </>
  )
}

const Content = (props) => {
  console.log(props)
  
  return (
    <>
      <Part object={props.part1} />
      <Part object={props.part2} />
      <Part object={props.part3} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>
        Number of exercises: {props.value}
      </p>
    </>
  )
}

// App
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total value={part1.exercises + part2.exercises + part3.exercises} />
    </>
  )
}

export default App