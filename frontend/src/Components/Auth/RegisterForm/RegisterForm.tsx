import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { User } from "../../../models/User";
import { userActions } from "../../../store/authSlice";
import convertToBase64 from "../../../utils/convertBase64";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import PlatformsAuth from "../PlatformsAuth/PlatformsAuth";
import { appRoutes } from "../../../utils/config";
import LangModel from "../../../languageControl/Language";
import "./RegisterForm.scss";
import useAuthService from "../../../services/authService";

interface props {
  data: LangModel;
  language: string;
}

function RegisterForm(props: props): JSX.Element {
  const data = props.data.RegisterForm;
  const isHebrew = props.language === "HEBREW";
  const authService = useAuthService();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const { register, handleSubmit, watch } = useForm<User>();
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();
  const watchField = watch("email");
  const imageInput = useRef<HTMLInputElement | null>(null);
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [imageName, setImageName] = useState("");
  const [imageTooBig, setImageTooBig] = useState(false);

  useEffect(() => {
    if (error) setError(null);
  }, [error, watchField]);

  const signUp = async (user: User) => {
    user.image = profileImage;
    user.last_name = user.last_name[0].toUpperCase() + user.last_name.slice(1);
    user.first_name =
      user.first_name[0].toUpperCase() + user.first_name.slice(1);
    const result = await authService.register(user);
    if (result.status === 201) {
      const { authorization, refreshtoken } = result.headers;
      const { image } = result.data;
      dispatch(userActions.login({ authorization, refreshtoken, image }));
      navigate(appRoutes.chooseMode);
    } else setError(data.emailError);
  };

  const openFileUpload = () => imageInput.current?.click();

  const changeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setImageTooBig(files[0].size > 150000);
      if (files[0] && files[0].size < 150000) {
        const image = await convertToBase64(files[0]);
        setProfileImage(image);
        setImageName(files[0].name + "   ✓");
        return;
      }
      setProfileImage(undefined);
      setImageName("");
    }
  };

  return (
    <form className="RegisterForm" onSubmit={handleSubmit(signUp)}>
      <h3>{data.header}</h3>
      <span className="quick-easy">{data.quickProcess}</span>
      {error && <span className="error-message">{error}</span>}
      <div className="form-input-area user-full-name">
        <input
          required
          placeholder={data.firstName}
          type="text"
          className="form-control"
          {...register("first_name")}
        />
        <input
          required
          placeholder={data.lastName}
          type="text"
          className="form-control"
          {...register("last_name")}
        />
      </div>
      <div className="form-input-area">
        <input
          required
          placeholder={data.email}
          type="email"
          className="form-control"
          {...register("email")}
        />
      </div>
      <div className="form-input-area">
        <input
          required
          placeholder={data.phone}
          type="number"
          min={99999999}
          className="form-control"
          {...register("phone")}
        />
      </div>
      <div className="form-input-area">
        <input
          required
          placeholder={data.password}
          type="password"
          className="form-control"
          {...register("password", { minLength: 6 })}
        />
      </div>
      <div className="form-input-area">
        <label onClick={openFileUpload} className="file-label">
          <input
            placeholder={data.profilePicture}
            type="text"
            className="form-control"
            value={imageName}
            disabled
          />
          <input
            id="profile-picture"
            type="file"
            className="form-control file-input"
            onChange={changeImage}
            ref={imageInput}
            hidden
          />
        </label>
        <AddPhotoAlternateIcon
          className={`file-icon ${isHebrew && "hebrew"}`}
        />
        {imageTooBig && <span className="image-error">{data.imageError}</span>}
      </div>
      <button className="auth-login-button" disabled={isSubmitting}>
        {data.signupBtn}
      </button>
      <PlatformsAuth data={props.data} />
      <Link to={appRoutes.auth.login} className="form-link">
        {data.haveAccount}
      </Link>
    </form>
  );
}

export default RegisterForm;
