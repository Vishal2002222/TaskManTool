import React from 'react';
import './Explore.css';

const Explore = () => {
  const topics = [
    {
      title: 'Create Tasks',
      description: 'Learn how to add and manage tasks in the task management tool.',
    },
    {
      title: 'Task Categories',
      description: 'Organize your tasks using different categories and labels.',
    },
    {
      title: 'Task Prioritization',
      description: 'Understand how to set task priorities and deadlines.',
    },
    {
      title: 'Task Progress',
      description: 'Track the progress of your tasks and mark them as complete.',
    },
    {
      title: 'Collaboration',
      description: 'Collaborate with team members on shared tasks and projects.',
    },
    {
      title: 'Task Reminders',
      description: 'Set reminders and notifications for important tasks.',
    },
    {
      title: 'Task Analytics',
      description: 'Analyze your task completion rates and productivity.',
    },
    // Add more topics here...
  ];

  return (
    <div className="container mt-5">
      <h3 className="explore-header">Explore Task Management Topics</h3>
      <div className="card-columns my-5">
        {topics.map((topic, index) => (
          <div className="card mb-4" key={index}>
            <div className="card-body">
              <h5 className="card-title">{topic.title}</h5>
              <p className="card-text">{topic.description}</p>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;
