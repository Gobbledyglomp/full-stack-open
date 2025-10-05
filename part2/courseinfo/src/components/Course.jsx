import { Subheader } from './Headers'

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const Content = ({ parts }) => (
  <div>
    {parts.map(part => <Part key={part.id} part={part} />)}
  </div>
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

export default Course