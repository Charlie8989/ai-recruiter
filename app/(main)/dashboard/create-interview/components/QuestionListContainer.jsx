import React from "react";

const QuestionListContainer = ({questionlist}) => {
  return (
    <div>
      <h2 className="font-bold text-2xl">Generated Questions</h2>
      <div className="p-5 rounded-xl">
        {questionlist.map((item, index) => (
          <div
            key={index}
            className="p-3 m-2 border rounded-md border-gray-300"
          >
            <h2 className="font-medium">{item.question}</h2>
            <h2 className="text-blue-500 m-1 border-2 p-2 w-fit rounded-md text-sm border-gray-300">
              Type:{item?.type}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionListContainer;
