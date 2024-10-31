// TaskDetail.js
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const TaskDetail = () => {
  const { state } = useLocation();
  const { taskId } = useParams();
  const task = state?.task;

  return (
    <div className="task-detail p-6">
      {task ? (
        <>
          <h1 className="text-3xl font-bold mb-4">{task.title}</h1>
          <p className="text-xl mb-2">Priority: {task.priority}</p>
          <p className="text-lg">{task.description}</p>
        </>
      ) : (
        <p>Loading task details...</p>
      )}
    </div>
  );
};

export default TaskDetail;
