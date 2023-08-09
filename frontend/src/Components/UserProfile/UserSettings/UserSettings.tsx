import { User } from "../../../models/User";
import { randomProfile } from "../../../utils/file-import";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import convertToBase64 from "../../../utils/convertBase64";
import useAuthService from "../../../services/authService";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/authSlice";
import Spinner from "../../UI/Spinner";
import "./UserSettings.scss";

interface props {
  user: User;
}

interface formUser extends User {
  confirm_password: string;
  new_password: string;
}

function UserSettings(props: props): JSX.Element {
  const dispatch = useDispatch();
  const user = props.user;
  const authService = useAuthService();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [currentImg, setCurrentImg] = useState(user.image || randomProfile);
  const [newImage, setNewImage] = useState<string | undefined>(undefined);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [isSucceeded, setIsSucceeded] = useState(false);
  const { register, handleSubmit, reset } = useForm<formUser>();
  const [error, setError] = useState("");

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      const image = await convertToBase64(selectedFile);
      setNewImage(image);
      const imageUrl = URL.createObjectURL(selectedFile); // Create a temporary URL for the selected image
      setCurrentImg(imageUrl);
      setIsDeleted(false);
    } else {
      setNewImage(undefined);
      setCurrentImg(user.image || randomProfile);
    }
  };

  const clickOnInput = () => {
    // Simulate a click event on the hidden input element
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const deleteImage = () => {
    setCurrentImg(randomProfile);
    setNewImage(undefined);
    setIsDeleted(true);
  };
  const previousImage = () => {
    setCurrentImg(user.image || randomProfile);
    setIsDeleted(false);
  };

  const submitForm = async (details: formUser) => {
    if (details.confirm_password || details.new_password) {
      if (details.confirm_password !== details.new_password) {
        setError("New Password must be equal to Confirm password");
        return;
      }
    }
    details._id = user._id;
    const { first_name, last_name } = details;
    if (first_name) details.first_name = capitalizedName(first_name);
    if (last_name) details.last_name = capitalizedName(last_name);
    const validFormValues = Object.fromEntries(
      Object.entries(details).filter(([key, value]) => value !== "")
    );
    if (isDeleted || newImage) validFormValues.image = newImage;
    setIsPending(true);
    const result = await authService.updateUser(validFormValues as User);
    if (result.status === 201) {
      const { authorization, refreshtoken } = result.headers;
      const { image } = result.data;
      dispatch(userActions.login({ authorization, refreshtoken, image }));
      setIsSucceeded(true);
      reset();
    } else {
      if (result.msg.includes("email")) setError("Email is already exists");
      if (result.msg.includes("phone"))
        setError("Phone number is already exists");
      if (result.status === 401) setError("Wrong password, please try again");
    }
    setIsPending(false);
  };

  const capitalizedName = (name: string) => {
    return name[0].toUpperCase() + name.slice(1);
  };

  const formChange = () => {
    setError("");
    setIsSucceeded(false);
  };

  return (
    <div className="UserSettings user-page-section">
      <h4 className="section-header">Account Settings</h4>
      <hr />
      <div className="form-container">
        <form
          className="profile-form"
          onSubmit={handleSubmit(submitForm)}
          onChange={formChange}
        >
          <div className="inputs-wrapper">
            <label htmlFor="first_name">
              First Name
              <input
                type="text"
                id="first_name"
                className="form-control"
                placeholder={user.first_name}
                {...register("first_name")}
              />
            </label>
            <label htmlFor="last_name">
              Last Name
              <input
                type="text"
                id="last_name"
                className="form-control"
                placeholder={user.last_name}
                {...register("last_name")}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder={user.email}
                {...register("email")}
              />
            </label>
            <label htmlFor="phone">
              Phone Number
              <input
                type="number"
                id="phone"
                className="form-control"
                placeholder={user.phone}
                {...register("phone")}
              />
            </label>
            <label htmlFor="new_password">
              New Password
              <input
                type="password"
                id="new_password"
                className="form-control"
                {...register("new_password", { minLength: 6 })}
              />
            </label>
            <label htmlFor="confirm_password">
              Confirm New Password
              <input
                type="password"
                id="confirm_password"
                className="form-control"
                {...register("confirm_password", { minLength: 6 })}
              />
            </label>
            <label htmlFor="password">
              * Enter your password to save changes
              <input
                required
                type="password"
                id="password"
                className="form-control"
                placeholder="********"
                {...register("password", { minLength: 6 })}
              />
            </label>
          </div>
          <span className="form-error">{error}</span>
          <div className="button-spinner-wrapper">
            <button className="submit-form-btn" disabled={isPending}>
              Save Changes
            </button>
            {isPending && (
              <Spinner spinnerStyle={{ width: "2rem", height: "2rem" }} />
            )}
            {isSucceeded && (
              <span className="success-msg">
                Details were updated successfully!
              </span>
            )}
          </div>
        </form>
        <div className="image-control">
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <div className="curr-image-container" onClick={clickOnInput}>
            <img src={currentImg} className="current-image" alt="" />
            <div className="upload-icon-wrapper">
              <UploadFileIcon className="upload-icon" />
              <span className="upload-span">Upload Image</span>
            </div>
          </div>
          {currentImg === randomProfile && (
            <span className="no-img-span">No Image</span>
          )}
          <button className="change-span" onClick={clickOnInput}>
            Upload profile image
          </button>
          {isDeleted ? (
            <button className="previous-image-btn" onClick={previousImage}>
              Use previous
            </button>
          ) : (
            <button className="delete-image-btn" onClick={deleteImage}>
              Delete Image
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserSettings;
