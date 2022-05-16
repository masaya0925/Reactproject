interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartV2 extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartV2 {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartV2 {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartV2 {
  type: 'special';
  requirements: string[];
}

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const Header = ({courseName}: {courseName: string}) => {
  return <h1>{courseName}</h1>;
};

const Content = ({courseParts}: {courseParts: CoursePart[]}): JSX.Element => {
  return (
    <>
      <p>{courseParts.map((coursePart) => (
        <Part key={coursePart.name} coursePart = {coursePart}/>
         ))}
      </p>
    </>
  );
};

const Part = ({coursePart}: {coursePart: CoursePart}): JSX.Element => {
    switch(coursePart.type) {
      case 'normal':
        return(
          <>
          <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
          <i>{coursePart.description}</i>
          </>
        );
      case 'groupProject':
        return(
          <>
          <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
          <p>project exercises {coursePart.groupProjectCount}</p>
          </>
        );
      case 'submission':
        return(
          <>
          <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
          <i>{coursePart.description}</i>
          <p>submit to {coursePart.exerciseSubmissionLink}</p>
          </>
        );
        case 'special':
          return(
            <>
            <h4>{coursePart.name} {coursePart.exerciseCount}</h4>
            <i>{coursePart.description}</i>
            <p>required skills: {coursePart.requirements.join(', ')}</p>
            </>
          );
        default:
          return assertNever(coursePart);
    }
};

const Total = ({courseParts}: {courseParts: CoursePart[]}): JSX.Element => {
  const total = courseParts.reduce((carry, parts) => carry + parts.exerciseCount, 0);
  return <p>
            Number of Exercises{' '}
            {total}
         </p>;
};

const App = () => {
  const courseName = 'Half stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the leisured course part',
      type: 'normal'
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is harded course part',
      type: 'normal'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject'
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://example.fake.com',
      type: 'submission'
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special'
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
