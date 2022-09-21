import { useState, useEffect } from "react";
import "./index.css";

function UserForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const phoneFormat = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;

    if (!name.length) errors.push("Name is required");
    if (!email.length) errors.push("Email is required");
    if (email.length && !email.match(mailFormat))
      errors.push("Enter a valid email");
    if (phone.length && !phone.match(phoneFormat))
      errors.push("Enter a valid phone number, such as 888-888-8888");
    if (phone.length && !phoneType) errors.push("Select phone type");
    if (bio.length > 280) errors.push("Bio must be less than 280 characters");

    setValidationErrors(errors);
  }, [name, email, phone, phoneType, bio]);

  function onSubmit(e) {
    e.preventDefault();

    setHasSubmitted(true);

    if (validationErrors.length) return alert("Correct form errors to submit");

    if (!phone) setPhoneType("");

    const formData = {
      name,
      email,
      phone,
      phoneType,
      role,
      bio,
      emailUpdates,
      submittedOn: new Date(),
    };

    console.log(formData);

    setName("");
    setEmail("");
    setPhone("");
    setPhoneType("");
    setRole("");
    setBio("");
    setEmailUpdates(false);
    setValidationErrors([]);
    setHasSubmitted(false);
  }

  return (
    <div id="form-container">
      <h2>Contact Us</h2>
      {hasSubmitted && validationErrors.length > 0 && (
        <div className="errors">
          Please correct the following errors:
          <ul>
            {validationErrors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="text-input"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="text-input email-input"
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="000-000-0000"
            className="text-input"
          />
          <select
            name="phoneType"
            value={phoneType}
            onChange={(e) => setPhoneType(e.target.value)}
            disabled={!phone.length}
            className="phone-type"
          >
            <option value="">Select phone type...</option>
            <option>Home</option>
            <option>Cell</option>
            <option>Work</option>
          </select>
        </div>
        <fieldset onChange={(e) => setRole(e.target.value)}>
          <legend>Select your role:</legend>
          <div>
            <input
              type="radio"
              id="instructor"
              name="role"
              value="instructor"
            />
            <label htmlFor="instructor">Instructor</label>
          </div>
          <div>
            <input type="radio" id="student" name="role" value="student" />
            <label htmlFor="student">Student</label>
          </div>
        </fieldset>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="4"
            cols="51"
          ></textarea>
        </div>
        <div>
          <input
            type="checkbox"
            id="emailUpdates"
            value={emailUpdates}
            onChange={(e) => setEmailUpdates(e.target.checked)}
          />
          <label htmlFor="emailUpdates">Sign up for email updates</label>
        </div>
        <button className="submit-button">Submit</button>
      </form>
    </div>
  );
}

export default UserForm;
