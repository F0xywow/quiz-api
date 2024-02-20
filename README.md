## Dockerizig database

Build docker database
```bash

# Building database
docker build -t quiz-app-db .

# Running database
docker run -p 5432:5432 quiz-app-db
```


## Running the Application

1. Install the dependencies:

```bash
$ npm install
```

2. Start the application:
```bash
# For development
$ npm run start:dev

# For production
$ npm run start:prod
```
## Entities

The application is built around four main entities: `Quiz`, `Question`, `Answer`, and `Submission`. 

- `Quiz`: Represents a quiz. It has a one-to-many relationship with `Question` and `Submission`.
- `Question`: Represents a question in a quiz. It has a many-to-one relationship with `Quiz` and a one-to-many relationship with `Answer`.
- `Answer`: Represents an answer to a question. It has a many-to-one relationship with `Question`.
- `Submission`: Represents a submission of a quiz. It has a many-to-one relationship with `Quiz`.

Here is a visual representation of the entities and their relationships:

![Quiz App Classes](quiz-app-classes.png)

For more details, please refer to the entity files in the `src/modules` directory:

- [`Quiz`](src/modules/quiz/quiz.entity.ts)
- [`Question`](src/modules/question/question.entity.ts)
- [`Answer`](src/modules/answer/answer.entity.ts)
- [`Submission`](src/modules/submission/submission.entity.ts)


## GraphQL Queries and Mutations

Here are examples of GraphQL queries and mutations you can use with this application:

### Queries

1. Fetch all quizzes:

```gql
query {
  findAllQuizzes {
    id
    name
    questions{
      text
      answers{
        text
      }
    }
  }
}
```

2. Fetch a single quiz:

```gql
query {
  findOneQuiz(id: 1) {
    id
    name
  }
}
```

3. Fetch all questions:

```gql
query {
  findAllQuestions {
    id
    text
  }
}
```

4. Fetch a single question:

```gql
query {
  findOneQuestion(id: 1) {
    id
    text
  }
}
```

5. Fetch all submission takes:

```gql
query {
  findAllSubmissionTakes {
    id
    textAnswers
  }
}
```

6. Fetch a single submission take:

```gql
query {
  findOneSubmissionTake(id: 1) {
    id
    textAnswers
  }
}
```

7. Fetch questions for one quiz

```gql
query {
  findOneQuiz(id: 1) {
   id
    name
    questions{
      text
      answers{
        text
      }
    }
  }
}
```

8. Calculating points for submission

```gql
query{
  calculatePoints(submission_id:1)
  {
    obtainedPoints
    maxPoints
  }
}
```

### Mutations

1. Create a new quiz:

```gql
mutation {
  createQuiz(createQuizInput: {
    name: "Sample Quiz",
    questions: [
      {
        text: "Sample Question",
        questionType: "singleAnswer",
        answers: [
          {
            text: "Correct Answer",
            isCorrect: true
          },
          {
            text: "Incorrect Answer",
            isCorrect: false
          }
        ]
      }
    ]
  }) {
    name
    questions {
      text
      answers {
        text
        isCorrect
      }
    }
  }
}
```

2. Create a new submission:

```gql
mutation{
 createSubmission(createSubmissionInput:{
  quizId:1,
  userId:1,
  submissionTakes:[
    {
      questionId:1,
      textAnswers:["Witam"],
    }
  ]
}){
	id,
  quizId,
 
}
}
```