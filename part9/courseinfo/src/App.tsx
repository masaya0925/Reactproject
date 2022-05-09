
interface Parts {
  name: string,
  exerciseCount: number
}

const Header = ({courseName}: {courseName: string}) => {
  return <h1>{courseName}</h1>;
};

const Content = ({courseParts}: {courseParts: Parts[]}): JSX.Element => {
  return (
    <>
      <p>{courseParts[0].name} {courseParts[0].exerciseCount}</p>
      <p>{courseParts[1].name} {courseParts[1].exerciseCount}</p>
      <p>{courseParts[2].name} {courseParts[2].exerciseCount}</p>
    </>
  );
};

const Total = ({courseParts}: {courseParts: Parts[]}): JSX.Element => {
  const total = courseParts.reduce((carry, parts) => carry + parts.exerciseCount, 0);
  return <p>
            Number of Exercises{' '}
            {total}
         </p>;
};

const App = () => {
  const courseName = 'Half stack application development';
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14
    }
  ]
  return (
    <>
    <Header  courseName  = {courseName}  />
    <Content courseParts = {courseParts} />
    <Total   courseParts = {courseParts} />
    </>
  )
}

export default App;
