import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config2';
import { ref, get, update } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import Certificate from './Certificate';
import { motion, AnimatePresence } from 'framer-motion';
import './Quiz.css';

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    'Acing the Exams Season': 0,
    'Make the Most of Your Vac': 0
  });
  const [showScore, setShowScore] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [timer, setTimer] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [historicalScore, setHistoricalScore] = useState(0);
  const [pointsToCertificate, setPointsToCertificate] = useState(5);
  const [showCertificate, setShowCertificate] = useState(false);
  const [userName, setUserName] = useState('');
  const [category, setCategory] = useState(null);
  const [isEligibleForCertificate, setIsEligibleForCertificate] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  // Define questions for each category
const questionsByCategory = {
  'Acing the Exams Season': [
      {
          questionText: 'What is the purpose of consolidation week?',
          answerOptions: [
              { answerText: 'To continue attending lectures and tutorials.', isCorrect: false },
              { answerText: 'To have uninterrupted time to prepare for exams.', isCorrect: true },
              { answerText: 'To socialize with peers.', isCorrect: false },
              { answerText: 'To revise only the easiest topics.', isCorrect: false },
          ],
      },
      {
          questionText: 'How long does the exam period last during the first semester at UCT?',
          answerOptions: [
              { answerText: 'Two weeks.', isCorrect: false },
              { answerText: 'Three weeks.', isCorrect: true },
              { answerText: 'One week.', isCorrect: false },
              { answerText: 'Four weeks.', isCorrect: false },
          ],
      },
      {
          questionText: 'What should you do if you are not confident about a particular topic?',
          answerOptions: [
              { answerText: 'Ignore the topic completely.', isCorrect: false },
              { answerText: 'Watch lecture recordings and go through lecture slides.', isCorrect: true },
              { answerText: 'Cram the topic the night before.', isCorrect: false },
              { answerText: 'Ask your friends to explain during the exam.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is an important strategy for time management during exam season?',
          answerOptions: [
              { answerText: 'Watching TV to relax.', isCorrect: false },
              { answerText: 'Following a daily schedule and calendar.', isCorrect: true },
              { answerText: 'Leaving everything to the last minute.', isCorrect: false },
              { answerText: 'Only studying for easy subjects.', isCorrect: false },
          ],
      },
      {
          questionText: 'How many hours of study per day are recommended during exam season?',
          answerOptions: [
              { answerText: '5-6 hours.', isCorrect: false },
              { answerText: '9-11 hours.', isCorrect: true },
              { answerText: '3-4 hours.', isCorrect: false },
              { answerText: '12-14 hours.', isCorrect: false },
          ],
      },
      {
          questionText: 'Which of the following is considered “brain food”?',
          answerOptions: [
              { answerText: 'Candy and sugary drinks.', isCorrect: false },
              { answerText: 'Nuts, fish, and eggs.', isCorrect: true },
              { answerText: 'Chips and soda.', isCorrect: false },
              { answerText: 'Pizza and burgers.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is a good technique for exam preparation?',
          answerOptions: [
              { answerText: 'Practicing past exam papers with time limits.', isCorrect: true },
              { answerText: 'Reading through all textbooks the night before.', isCorrect: false },
              { answerText: 'Memorizing everything without practice.', isCorrect: false },
              { answerText: 'Studying only the easy topics.', isCorrect: false },
          ],
      },
      {
          questionText: 'What should you do if you feel overwhelmed during consolidation week?',
          answerOptions: [
              { answerText: 'Push through without breaks.', isCorrect: false },
              { answerText: 'Prioritize your well-being and take breaks.', isCorrect: true },
              { answerText: 'Quit studying.', isCorrect: false },
              { answerText: 'Study even harder without sleep.', isCorrect: false },
          ],
      },
      {
          questionText: 'How can you avoid stress on exam day?',
          answerOptions: [
              { answerText: 'Arrive at least 30 minutes before the exam.', isCorrect: true },
              { answerText: 'Arrive exactly at the start of the exam.', isCorrect: false },
              { answerText: 'Arrive just before the end of the exam.', isCorrect: false },
              { answerText: 'Don’t worry about the exam timing.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is the rule about watches and phones during UCT exams?',
          answerOptions: [
              { answerText: 'You can use them to check the time.', isCorrect: false },
              { answerText: 'They are not allowed in the exam venue.', isCorrect: true },
              { answerText: 'You can only use them during breaks.', isCorrect: false },
              { answerText: 'They are allowed in all exams.', isCorrect: false },
          ],
      },
      {
          questionText: 'What should you do if you miss an exam due to illness?',
          answerOptions: [
              { answerText: 'Ignore it and accept failure.', isCorrect: false },
              { answerText: 'Apply for a deferred exam with medical documentation.', isCorrect: true },
              { answerText: 'Call your lecturer for a make-up exam.', isCorrect: false },
              { answerText: 'Wait until the next year to write the exam.', isCorrect: false },
          ],
      },
      {
          questionText: 'Why is spaced repetition recommended for studying?',
          answerOptions: [
              { answerText: 'It is faster than cramming.', isCorrect: false },
              { answerText: 'It helps with long-term retention of information.', isCorrect: true },
              { answerText: 'It takes less effort than cramming.', isCorrect: false },
              { answerText: 'It avoids studying altogether.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is an example of taking care of mental health during exam season?',
          answerOptions: [
              { answerText: 'Overloading on study tasks.', isCorrect: false },
              { answerText: 'Making time for relaxing activities.', isCorrect: true },
              { answerText: 'Studying without breaks.', isCorrect: false },
              { answerText: 'Avoiding sleep to study more.', isCorrect: false },
          ],
      },
      {
          questionText: 'How can you keep yourself accountable during exam preparation?',
          answerOptions: [
              { answerText: 'Study alone without a plan.', isCorrect: false },
              { answerText: 'Find an accountability partner to stay on track.', isCorrect: true },
              { answerText: 'Skip creating a daily to-do list.', isCorrect: false },
              { answerText: 'Ignore the exam timetable.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is a benefit of using past papers for exam preparation?',
          answerOptions: [
              { answerText: 'They help predict exact questions in the exam.', isCorrect: false },
              { answerText: 'They familiarize you with the structure and timing of the exam.', isCorrect: true },
              { answerText: 'They guarantee full marks.', isCorrect: false },
              { answerText: 'They allow you to avoid studying new content.', isCorrect: false },
          ],
      },
      {
          questionText: 'How can physical activity benefit exam preparation?',
          answerOptions: [
              { answerText: 'It refreshes the mind and improves focus.', isCorrect: true },
              { answerText: 'It takes away study time.', isCorrect: false },
              { answerText: 'It only helps with physical health, not studying.', isCorrect: false },
              { answerText: 'It is not helpful at all during exam season.', isCorrect: false },
          ],
      },
      {
          questionText: 'What should you do if you feel you cannot finish the exam on time?',
          answerOptions: [
              { answerText: 'Consult Disability Services for a time concession.', isCorrect: true },
              { answerText: 'Leave some questions unanswered.', isCorrect: false },
              { answerText: 'Write faster without reading the questions.', isCorrect: false },
              { answerText: 'Skip the exam entirely.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is an effective way to prioritize topics while studying?',
          answerOptions: [
              { answerText: 'Study only your favorite subjects.', isCorrect: false },
              { answerText: 'Focus on topics with more exam weight.', isCorrect: true },
              { answerText: 'Ignore the exam structure.', isCorrect: false },
              { answerText: 'Start with easy topics and skip hard ones.', isCorrect: false },
          ],
      },
      {
          questionText: 'What should you do if you are unsure of your exam venue?',
          answerOptions: [
              { answerText: 'Check the UCT exam timetable and visit the venue beforehand.', isCorrect: true },
              { answerText: 'Ask your friends during the exam day.', isCorrect: false },
              { answerText: 'Guess the location on exam day.', isCorrect: false },
              { answerText: 'Ignore the exam venue.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is a helpful tool for daily study productivity?',
          answerOptions: [
              { answerText: 'A daily to-do list with specific goals.', isCorrect: true },
              { answerText: 'Leaving your tasks unplanned.', isCorrect: false },
              { answerText: 'Skipping task management.', isCorrect: false },
              { answerText: 'Ignoring time management.', isCorrect: false },
          ],
      },
  ],
 'Make the Most of Your Vac': [
      {
          questionText: 'What should you do if you have poor internet connectivity at home?',
          answerOptions: [
              { answerText: 'Wait until you get back to UCT to access materials.', isCorrect: false },
              { answerText: 'Download relevant materials before leaving campus.', isCorrect: true },
              { answerText: 'Don’t worry about downloading anything.', isCorrect: false },
              { answerText: 'Rely on library resources at home.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is reverse culture shock?',
          answerOptions: [
              { answerText: 'Difficulty adjusting to university life after vacation.', isCorrect: false },
              { answerText: 'Feeling out of place when returning home from university.', isCorrect: true },
              { answerText: 'Not remembering course content after vacation.', isCorrect: false },
              { answerText: 'Experiencing new cultural norms at university.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is a useful way to manage reverse culture shock?',
          answerOptions: [
              { answerText: 'Ignore your feelings about home.', isCorrect: false },
              { answerText: 'Stay in touch with university friends.', isCorrect: true },
              { answerText: 'Pretend nothing has changed.', isCorrect: false },
              { answerText: 'Isolate yourself from family.', isCorrect: false },
          ],
      },
      {
          questionText: 'What can you do during the vac if you failed a course?',
          answerOptions: [
              { answerText: 'Ignore the failure and move on.', isCorrect: false },
              { answerText: 'Prepare for a supplementary exam (supp).', isCorrect: true },
              { answerText: 'Switch to a new university.', isCorrect: false },
              { answerText: 'Drop out of the course permanently.', isCorrect: false },
          ],
      },
      {
          questionText: 'Why is it important to reflect on your UCT experience during the vac?',
          answerOptions: [
              { answerText: 'It helps you forget the stress of exams.', isCorrect: false },
              { answerText: 'It allows you to think critically about personal growth.', isCorrect: true },
              { answerText: 'You should not reflect on your experience during the vac.', isCorrect: false },
              { answerText: 'Reflection causes unnecessary stress.', isCorrect: false },
          ],
      },
      {
          questionText: 'What should you do if you are invited to write a supplementary exam (supp)?',
          answerOptions: [
              { answerText: 'Cram the night before.', isCorrect: false },
              { answerText: 'Redo the course material from scratch.', isCorrect: true },
              { answerText: 'Ignore the supp and focus on the next semester.', isCorrect: false },
              { answerText: 'Wait until the exam date to start studying.', isCorrect: false },
          ],
      },
      {
          questionText: 'Why is it helpful to engage in metacognition during the vac?',
          answerOptions: [
              { answerText: 'To avoid thinking too much about UCT.', isCorrect: false },
              { answerText: 'To critically evaluate your learning and personal progress.', isCorrect: true },
              { answerText: 'To stay disconnected from your academics.', isCorrect: false },
              { answerText: 'To forget about the first semester.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is a good strategy for preparing for next semester during the vac?',
          answerOptions: [
              { answerText: 'Start learning course content for next semester.', isCorrect: true },
              { answerText: 'Ignore all academic work until the semester starts.', isCorrect: false },
              { answerText: 'Watch movies all day.', isCorrect: false },
              { answerText: 'Only study for a few days before the semester.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is the importance of reconnecting with friends and family during the vac?',
          answerOptions: [
              { answerText: 'It allows you to avoid thinking about UCT.', isCorrect: false },
              { answerText: 'It helps you reconnect with your roots and social support.', isCorrect: true },
              { answerText: 'It wastes time you could spend studying.', isCorrect: false },
              { answerText: 'It leads to more stress.', isCorrect: false },
          ],
      },
      {
          questionText: 'What should you do if you want to change your degree or electives?',
          answerOptions: [
              { answerText: 'Wait until the semester starts to decide.', isCorrect: false },
              { answerText: 'Look at the UCT Prospectus and consult a Student Advisor.', isCorrect: true },
              { answerText: 'Drop out of UCT entirely.', isCorrect: false },
              { answerText: 'Ignore any doubts and continue your current path.', isCorrect: false },
          ],
      },
      {
          questionText: 'How can tutoring others in your community be helpful during the vac?',
          answerOptions: [
              { answerText: 'It helps you avoid studying on your own.', isCorrect: false },
              { answerText: 'It improves your own understanding of the subject.', isCorrect: true },
              { answerText: 'It wastes time you could use to relax.', isCorrect: false },
              { answerText: 'It leads to more stress and less learning.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is a sign of excessive recreational screen time during the vac?',
          answerOptions: [
              { answerText: 'Feeling more relaxed and productive.', isCorrect: false },
              { answerText: 'Fried dopamine circuits and less motivation.', isCorrect: true },
              { answerText: 'Increased academic performance.', isCorrect: false },
              { answerText: 'Improved concentration and focus.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is the benefit of finding an accountability partner during the vac?',
          answerOptions: [
              { answerText: 'You can ignore your responsibilities together.', isCorrect: false },
              { answerText: 'They help you stick to your plans and resolutions.', isCorrect: true },
              { answerText: 'They make studying unnecessary.', isCorrect: false },
              { answerText: 'They help you procrastinate.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is the purpose of taking stock of your habits and routines during the vac?',
          answerOptions: [
              { answerText: 'To make adjustments for better time management and productivity.', isCorrect: true },
              { answerText: 'To forget about the stress of university life.', isCorrect: false },
              { answerText: 'To avoid reflecting on your experiences.', isCorrect: false },
              { answerText: 'To justify bad habits.', isCorrect: false },
          ],
      },
      {
          questionText: 'What can you do if you feel your family doesn’t understand your UCT experience?',
          answerOptions: [
              { answerText: 'Lie about how things have gone.', isCorrect: false },
              { answerText: 'Be honest about both the good and the bad.', isCorrect: true },
              { answerText: 'Avoid talking to them altogether.', isCorrect: false },
              { answerText: 'Pretend everything went perfectly.', isCorrect: false },
          ],
      },
      {
          questionText: 'Why is it important to be aware of reverse culture shock when returning home?',
          answerOptions: [
              { answerText: 'So you can distance yourself from family.', isCorrect: false },
              { answerText: 'To prepare for changes in how you view home and relationships.', isCorrect: true },
              { answerText: 'To avoid reconnecting with old friends.', isCorrect: false },
              { answerText: 'To return to your old way of thinking.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is one way to give back to your community during the vac?',
          answerOptions: [
              { answerText: 'Taking a break from everything.', isCorrect: false },
              { answerText: 'Tutoring learners or helping others academically.', isCorrect: true },
              { answerText: 'Staying indoors the entire time.', isCorrect: false },
              { answerText: 'Focusing only on personal relaxation.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is a recommended way to mentally recover during the vac?',
          answerOptions: [
              { answerText: 'Engaging in excessive screen time.', isCorrect: false },
              { answerText: 'Prioritizing self-care activities like exercise and sleep.', isCorrect: true },
              { answerText: 'Ignoring mental health and pushing through.', isCorrect: false },
              { answerText: 'Cramming new material every day.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is a good way to prepare for future success after failure?',
          answerOptions: [
              { answerText: 'Forget about your failures and move on.', isCorrect: false },
              { answerText: 'Reflect on why you failed and change your routine.', isCorrect: true },
              { answerText: 'Continue with the same approach as before.', isCorrect: false },
              { answerText: 'Ignore feedback from others.', isCorrect: false },
          ],
      },
      {
          questionText: 'What is a hero in the context of this chapter?',
          answerOptions: [
              { answerText: 'Someone who does nothing during the vac.', isCorrect: false },
              { answerText: 'Someone who supports others and faces obstacles with determination.', isCorrect: true },
              { answerText: 'Someone who avoids all challenges.', isCorrect: false },
              { answerText: 'Someone who studies in isolation.', isCorrect: false },
          ],
      },
  ],
};

  useEffect(() => {
    if (user) {
      const userRef = ref(db, `users/${user.uid}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setHistoricalScore(data.historicalTotalScore || 0);
          setUserName(data.name || user.displayName || 'Science Enthusiast');
          setScores({
            'Acing the Exams Season': data.acingExamsScore || 0,
            'Make the Most of Your Vac': data.makeVacScore || 0
          });
          const totalScore = (data.acingExamsScore || 0) + (data.makeVacScore || 0);
          setIsEligibleForCertificate(totalScore >= pointsToCertificate);
        }
      });
    }
  }, [user, pointsToCertificate]);

  useEffect(() => {
    if (user && category) {
      const userRef = ref(db, `users/${user.uid}`);
      update(userRef, {
        [`${category === 'Acing the Exams Season' ? 'acingExamsScore' : 'makeVacScore'}`]: scores[category],
        historicalTotalScore: scores['Acing the Exams Season'] + scores['Make the Most of Your Vac']
      });
    }
  }, [scores, user, category]);

  useEffect(() => {
    let interval;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleAnswerOptionClick = (isCorrect) => {
    setIsTimerRunning(false);
    setFeedback(isCorrect ? 'Correct!' : 'Incorrect');
    if (isCorrect) {
      setScores(prevScores => ({
        ...prevScores,
        [category]: prevScores[category] + 1
      }));
    }
    setTimeout(() => handleNextQuestion(), 1000);
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questionsByCategory[category].length) {
      setCurrentQuestion(nextQuestion);
      setFeedback(null);
      setTimer(15);
      setIsTimerRunning(true);
    } else {
      if (user) {
        const userRef = ref(db, `users/${user.uid}`);
        const totalScore = scores['Acing the Exams Season'] + scores['Make the Most of Your Vac'];
        update(userRef, {
          [`${category === 'Acing the Exams Season' ? 'acingExamsScore' : 'makeVacScore'}`]: scores[category],
          historicalTotalScore: totalScore
        });
        setIsEligibleForCertificate(totalScore >= pointsToCertificate);
      }
      setShowScore(true);
      setIsTimerRunning(false);
    }
  };

  const handleStartQuiz = (selectedCategory) => {
    setCategory(selectedCategory);
    setCurrentQuestion(0);
    setShowScore(false);
    setShowCertificate(false);
    setFeedback(null);
    setTimer(15);
    setIsTimerRunning(true);
  };

  const handleRestartQuiz = () => {
    setCategory(null);
    setCurrentQuestion(0);
    setShowScore(false);
    setShowCertificate(false);
    setFeedback(null);
    setTimer(15);
    setIsTimerRunning(false);
  };

  const handleTryAgain = () => {
    setShowCertificate(false);
    setCategory(null);
  };

  return (
    <div className="quiz-container">
      <div className="score-display">
        <motion.div 
          className="score-pill"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          Exams Score: {scores['Acing the Exams Season']}
        </motion.div>
        <motion.div 
          className="score-pill"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
        >
          Vac Score: {scores['Make the Most of Your Vac']}
        </motion.div>
        <motion.div 
          className="score-pill"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
        >
          Total: {scores['Acing the Exams Season'] + scores['Make the Most of Your Vac']}
        </motion.div>
      </div>

      <h2 className="quiz-title">Knowledge Check Quiz</h2>

      {showCertificate ? (
        <Certificate 
          userName={userName} 
          score={scores['Acing the Exams Season'] + scores['Make the Most of Your Vac']} 
          onTryAgain={handleTryAgain}
        />
      ) : !category ? (
        <div className="category-selection">
          {isEligibleForCertificate && (
            <motion.button 
              onClick={() => setShowCertificate(true)} 
              className="certificate-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Your Certificate
            </motion.button>
          )}
          <button onClick={() => handleStartQuiz('Acing the Exams Season')}>Acing the Exams Season</button>
          <button onClick={() => handleStartQuiz('Make the Most of Your Vac')}>Make the Most of Your Vac</button>
        </div>
      ) : showScore ? (
        <motion.div 
          className="score-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>Your score for {category}: {scores[category]}</p>
          <p>Your total score: {scores['Acing the Exams Season'] + scores['Make the Most of Your Vac']}</p>
          <p>Points needed for the certificate: {Math.max(0, pointsToCertificate - (scores['Acing the Exams Season'] + scores['Make the Most of Your Vac']))}</p>
          {isEligibleForCertificate && !showCertificate && (
            <motion.button 
              onClick={() => setShowCertificate(true)} 
              className="certificate-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Your Certificate
            </motion.button>
          )}
          <motion.button 
            onClick={handleRestartQuiz} 
            className="restart-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Another Category
          </motion.button>
        </motion.div>
      ) : (
        <>
          <div className="progress-bar">
            <motion.div 
              className="progress"
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questionsByCategory[category].length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentQuestion}
              className="question-section"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            >
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>/{questionsByCategory[category].length}
              </div>
              <div className="question-text">{questionsByCategory[category][currentQuestion].questionText}</div>
            </motion.div>
          </AnimatePresence>
          <div className="timer-section">
            <motion.div 
              className="timer"
              initial={{ scale: 1 }}
              animate={{ scale: timer <= 5 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5, repeat: timer <= 5 ? Infinity : 0 }}
            >
              {timer}
            </motion.div>
          </div>
          <div className="answer-section">
            {questionsByCategory[category][currentQuestion].answerOptions.map((answerOption, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}
                className="answer-button"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(255,255,255)" }}
                whileTap={{ scale: 0.95 }}
              >
                {answerOption.answerText}
              </motion.button>
            ))}
          </div>
          <AnimatePresence>
            {feedback && (
              <motion.div 
                className={`feedback ${feedback === 'Correct!' ? 'correct' : 'incorrect'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {feedback}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
};

export default Quiz;