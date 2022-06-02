import ExpansionPanel from "@components/expansion-panel/expansion-panel.component";
import React from "react";
const HelpSupport = () => {
  const data = {
    title: "Help Support",
    disclaimer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero!",
    faqDisclaimer:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur.",
    faqQuestions: [
      {
        title: "How does this webiste works?",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero!",
      },
      {
        title: "How to change the color in website?",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero!",
      },
      {
        title: "How to have new account in this website?",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero!",
      },
      {
        title: "How to add new data in the account?",
        description:
          "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nobis quos laudantium aspernatur, eveniet maiores possimus, nemo corrupti quia ducimus repellat perferendis? Natus, dolorem distinctio sed impedit unde nam doloribus vero!",
      },
    ],
  };
  return (
    <>
      <div>
        <div className="support-body">
          <h2>{data.title}</h2>
          {data.disclaimer}
          <div className="faq-section">
            <h2>{"FAQ's"}</h2>
            {data.faqDisclaimer}
            <div className="expansion-content">
              {data.faqQuestions.map((e, idx) => (
                <ExpansionPanel
                  key={idx}
                  title={e.title}
                  description={e.description}
                ></ExpansionPanel>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpSupport;
