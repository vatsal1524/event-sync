/* author: Mehulkumar Bhunsadiya */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Onboarding.css";
import ToastMessage from "../../../Components/Toast/Toast";

function Onboarding() {
  const INTEREST_LIST = [
    {
      categoryId: 1,
      categoryName: "Art & Design",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/art_design.jpg",
    },
    {
      categoryId: 2,
      categoryName: "Technology",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/circuit-cyberspace-closeup-with-neon-lights.jpg",
    },
    {
      categoryId: 3,
      categoryName: "Music",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/cat-playing-guitar-is-shown-this-illustration.jpg",
    },
    {
      categoryId: 4,
      categoryName: "Photography",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/How+To+Take+Better+Travel+Photos_+Expert+Tips+and+Tricks.jpeg",
    },
    {
      categoryId: 5,
      categoryName: "Fitness",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/heavy-weights-muscular-build-steel-equipment-shining-generated-by-ai.jpg",
    },
    {
      categoryId: 6,
      categoryName: "Cooking",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/Crispy+Chicken+Fettuccine+Alfredo.jpeg",
    },
    {
      categoryId: 7,
      categoryName: "Travel",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/Stuff+I+love+_+JustOneWayTicket_com.jpeg",
    },
    {
      categoryId: 8,
      categoryName: "Fashion",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/Mens+Corduroy+Double+Pockets+Long+Sleeve+Vintage+Jacket.webp",
    },
    {
      categoryId: 9,
      categoryName: "Gaming",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/32+Quick+Randoms+For+Your+Viewing+Pleasure.jpeg",
    },
    {
      categoryId: 10,
      categoryName: "Reading",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/12+Life-Changing+Habits+You+Can+Honestly+Start+Today.jpeg",
    },
    {
      categoryId: 11,
      categoryName: "Nature",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/The+last+light+of+day+illuminates+the+White+River+on+Mount+Rainier+%5BOC%5D%5B1333x2000%5D.jpeg",
    },
    {
      categoryId: 12,
      categoryName: "Sports",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/Footballer+Messi+Misses+Tax+Fraud+Trial+Opening%2C+Expected+To+Testify+On+Thursday.jpeg",
    },
    {
      categoryId: 13,
      categoryName: "Dance",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/Indian+Dance+Classes+in+Long+Island.jpeg",
    },
    {
      categoryId: 14,
      categoryName: "DIY & Crafts",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/19+Decor+Items+That+The+Plain+White+Walls+In+Your+Home+Desperately+Need.jpeg",
    },
    {
      categoryId: 15,
      categoryName: "Movies & TV Shows",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/5+Netflix+Shows+For+A+Good+Scare.jpeg",
    },
    {
      categoryId: 16,
      categoryName: "Science & Technology",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/Premium+Vector+_+Funny+albert+einstein+graphic+illustration.jpeg",
    },
    {
      categoryId: 17,
      categoryName: "Business & Finance",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/Why+Should+You+Have+An+Accountant+For+Your+Small+Business_.png",
    },
    {
      categoryId: 18,
      categoryName: "Health & Wellness",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/10+Fat-Blasting+Tabata+Plans.png",
    },
    {
      categoryId: 19,
      categoryName: "Pets",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/Top+9+Ways+Dogs+Communicate+with+You_+dog+talking+to+owner.jpeg",
    },
    {
      categoryId: 20,
      categoryName: "Food & Drinks",
      imageUrl:
        "https://web-project-images.s3.amazonaws.com/category/Watermelon+Slushie+Recipe+(Only+4+Ingredients!)+-+From+My+Bowl.jpeg",
    },
  ];

  const navigate = useNavigate();
  const [categoryList, setCategoryList] = useState(INTEREST_LIST);
  const [checkedCategories, setCheckedCategories] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const initialCheckedCategories = {};
    INTEREST_LIST.forEach((category) => {
      initialCheckedCategories[category.categoryId] = false;
    });
    setCheckedCategories(initialCheckedCategories);
  }, []);

  // Function to handle checkbox changes
  const handleCheckboxChange = (categoryId) => {
    setCheckedCategories((prevCheckedCategories) => ({
      ...prevCheckedCategories,
      [categoryId]: !prevCheckedCategories[categoryId],
    }));
  };

  // Function to handle the Save button click
  const handleSaveButtonClick = () => {
    const selectedCategoryIds = Object.keys(checkedCategories).filter(
      (categoryId) => checkedCategories[categoryId]
    );

    if (selectedCategoryIds.length < 3) {
      setSuccessMessage("Please select at least 3 categories.");
      return;
    }

    // Create a new array with category names based on selectedCategoryIds
    const selectedCategories = selectedCategoryIds.map(
      (categoryId) =>
        categoryList.find(
          (category) => category.categoryId === parseInt(categoryId)
        ).categoryName
    );

    const userId = localStorage.getItem("userId");
    const postData = {
      interests: selectedCategories,
    };
    // Make the POST API call with the postData
    fetch(process.env.REACT_APP_BASE_URL + `/user/update/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(postData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        ToastMessage("Categories added successfully!");
        navigate("/dashboard");
      })
      .catch((error) => {
        ToastMessage("Something went wrong", "Fails");
        console.error("Error sending data:", error);
      });
  };

  return (
    <>
      <div className="onboarding">
        <header className="bg-dark header-text p-2">
          <h3>Select at least 3 categories.</h3>
        </header>
        <div className="container d-flex justify-content-between flex-wrap mt-2">
          {categoryList.map((category) => (
            <div
              className="card mb-3 me-2"
              key={category.categoryId}
              style={{ width: "24%" }}
            >
              <img className="interest-image" src={category.imageUrl} alt={category.categoryName} />
              <div className="card-body">
                <div className="form-check  d-flex justify-content-between">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    style={{ width: "1.5rem", height: "1.5rem" }}
                    checked={checkedCategories[category.categoryId]}
                    onChange={() => handleCheckboxChange(category.categoryId)}
                  />
                  <label className="form-check-label">
                    {category.categoryName}
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
        {successMessage && <p className="text-success">{successMessage}</p>}
        <button
          className="btn save-secondary position-fixed bottom-0 end-0 m-4"
          onClick={handleSaveButtonClick}
        >
          Save and Next
        </button>
      </div>
    </>
  );
}

export default Onboarding;
