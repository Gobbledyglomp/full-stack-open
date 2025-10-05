// Subcomponents
const Header = ({ text }) => <h1>{text}</h1>

const Subheader = ({ text }) => <h2>{text}</h2>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
)

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Total = ({ total }) => (
  <p>
    <b>total of {total} exercises</b>
  </p>
)

// Course
const Course = ({ course }) => (
  <div>
    <Subheader text={course.name} />
    <Content parts={course.parts} />
    <Total total={
      course.parts.reduce(
        (total, currentPart) => total + currentPart.exercises,
        0,
      )
    } />
  </div>
)

// App
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
      <Header text="Web development curriculum" />
      {courses.map(course => 
        <Course key={course.id} course={course} />
      )}
    </>
  )
}

export default App