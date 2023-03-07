import { useState } from 'react';
import { Layout } from './Layout';
import { Section } from "./Section/Section";
import { FeedbackOptions } from "./FeedbackOptions/FeedbackOptions";
import { Statistics, Notification } from "./Statistics";

const feedbackOptions = ['good', 'neutral', 'bad'];

export const App = () => {

  const [stats, setStats] = useState(() => feedbackOptions.map(() => 0));

  const handleFeedback = feedback => {
    setStats(prevStats => prevStats.map((elem, ind) => (feedbackOptions[ind] === feedback) ? elem + 1 : elem));
  }

  const countTotalFeedback = () => stats.reduce((acc, elem) => (acc + elem), 0);

  const countPositiveFeedbackPercentage = () => {
    const total = countTotalFeedback();
    const indOfGood = feedbackOptions.indexOf('good');
    return ((total && ~indOfGood) ? Math.round(stats[indOfGood] / total * 100) : 0);
  }

  const [good, neutral, bad] = stats;
  const total = countTotalFeedback();

  return (
    <Layout>
      <Section title="Please leave feedback">
        <FeedbackOptions options={feedbackOptions} onLeaveFeedback={handleFeedback}></FeedbackOptions>
      </Section>
      <Section title="Statistics">
        {total
          ? <Statistics good={good} neutral={neutral} bad={bad}
              total={total} positivePercentage={countPositiveFeedbackPercentage()}></Statistics>
          : <Notification message="There is no feedback"></Notification>
        }  
      </Section >
    </Layout>
  );
};
