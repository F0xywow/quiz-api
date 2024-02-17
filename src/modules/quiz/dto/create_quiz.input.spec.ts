// FILEPATH: /c:/quiz-api/src/modules/quiz/dto/create_quiz.input.spec.ts

import { CreateQuizInput } from './create_quiz.input';
import { CreateQuestionInput } from '../../question/dto/create_question.input';
import { CreateAnswerInput } from '../../answer/dto/create_answer.input';

describe('CreateQuizInput', () => {
    let createQuizInput: CreateQuizInput;

    beforeEach(() => {
        createQuizInput = new CreateQuizInput();
    });

    it('should be able to create a quiz with questions and answers', () => {
        const answerInput1 = new CreateAnswerInput();
        answerInput1.text = 'Answer 1';

        const answerInput2 = new CreateAnswerInput();
        answerInput2.text = 'Answer 2';

        const questionInput = new CreateQuestionInput();
        questionInput.text = 'Sample Question';
        questionInput.answers = [answerInput1, answerInput2];

        createQuizInput.name = 'Sample Quiz';
        createQuizInput.questions = [questionInput];

        expect(createQuizInput.name).toBe('Sample Quiz');
        expect(createQuizInput.questions).toHaveLength(1);
        expect(createQuizInput.questions[0].text).toBe('Sample Question');
        expect(createQuizInput.questions[0].answers[0].text).toBe('Answer 1');
        expect(createQuizInput.questions[0].answers[1].text).toBe('Answer 2');
    });

    it('should be able to create a quiz without questions', () => {
        createQuizInput.name = 'Sample Quiz';

        expect(createQuizInput.name).toBe('Sample Quiz');
        expect(createQuizInput.questions).toBeUndefined();
    });
});