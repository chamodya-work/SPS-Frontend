import { useState } from "react";
import ApplicantContact from "components/Tabs/ApplicantContact";
import ApplicantInfo from "components/Tabs/ApplicantInfo";
import { useHistory } from "react-router-dom";

const Applicant = ({ onFormSubmit, isModify }) => {
  const history = useHistory();
  const [currentIndex, setCurrentIndex] = useState(0);

  const [formData, setFormData] = useState({
    applicantInfo: {
      idNo: "",
      firstName: "",
      lastName: "",
      fullName: "",
      personalCorporate: "",
      cebEmployee: "",
      preferredLanguage: "",
      idType: "NIC",
    },
    applicantContact: {
      mobileNo: "",
      email: "",
      telephoneNo: "",
      streetAddress: "",
      suburb: "",
      city: "",
      postalCode: "",
    },
  });

  //  SEARCH FUNCTION MOVED HERE
  const handleSearch = async () => {
    const idNo = formData.applicantInfo.idNo;

    if (!idNo) {
      alert("Please enter a valid NIC number before searching.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/applicants/search?idNo=${idNo}`,
        {
          method: "GET",
          headers: {
            Authorization: "Basic " + btoa("user:admin123"),
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("NIC not found");
      }

      const data = await response.json();

      // ✅ UPDATE FORM DATA (THIS FIXES YOUR UI ISSUE)
      setFormData((prev) => ({
        ...prev,
        applicantInfo: {
          ...prev.applicantInfo,
          ...data,
        },
        applicantContact: {
          ...prev.applicantContact,
          ...data,
        },
      }));

      alert("Data loaded successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handleNext = () => {
    if (currentIndex < 1) setCurrentIndex(currentIndex + 1);
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleInputChange = (section, data) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  const handleSubmit = () => {
    onFormSubmit(formData);
  };

  const handleUpdateClick = () => {
    history.push("/applicant/modifyapplicant");
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <div className="text-center my-4">
        <span className="text-lg font-bold text-gray-800">
          {currentIndex === 0
            ? "Applicant Information"
            : "Applicant Contact Details"}
        </span>
      </div>

      <div className="mt-4">
        <div className="relative flex flex-col w-full bg-gray-50 rounded-lg border">
          {currentIndex === 0 ? (
            <ApplicantInfo
              handleSearch={handleSearch}
              onInputChange={(data) =>
                handleInputChange("applicantInfo", data)
              }
              data={formData.applicantInfo}
              isModify={isModify}
            />
          ) : (
            <ApplicantContact
              onInputChange={(data) =>
                handleInputChange("applicantContact", data)
              }
              data={formData.applicantContact}
            />
          )}

          <div className="flex justify-between items-center bg-white rounded-b-lg px-6 py-4 border-t">
            <div>
              {!isModify && (
                <button
                  onClick={handleUpdateClick}
                  className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
                >
                  Edit
                </button>
              )}
            </div>

            <div className="flex space-x-3">
              {currentIndex > 0 && (
                <button
                  onClick={handlePrevious}
                  className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
                >
                  Previous
                </button>
              )}

              {currentIndex === 0 ? (
                <button
                  onClick={handleNext}
                  className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-[#7c0000] text-white text-sm px-6 py-2 rounded shadow"
                >
                  {isModify ? "Update" : "Submit"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applicant;
