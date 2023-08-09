import { useSelector } from "react-redux";
import { IStore } from "../store/store";
import NewPassword from "../Components/Auth/ResetPassword/NewPassword";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthService from "../services/authService";

function ResetPasswordPage(): JSX.Element {
  const langData = useSelector((state: IStore) => state.language.langData);
  const [isValidUrl, setIsValidUrl] = useState(false);
  const params = useParams();
  const authService = useAuthService();
  const { id, token } = params;

  useEffect(() => {
    const verifyUrl = async () => {
      if (!id || !token) {
        setIsValidUrl(false);
        return;
      }
      try {
        const result = await authService.resetPassValidity(id, token);
        if (result.status === 200) setIsValidUrl(true);
      } catch (err) {
        setIsValidUrl(false);
      }
    };
    verifyUrl();
  }, [id, params, token]);

  return (
    <>
      {isValidUrl && id && token && (
        <NewPassword data={langData} id={id} token={token} />
      )}
      {!isValidUrl && <h1>404 Not found</h1>}
    </>
  );
}

export default ResetPasswordPage;
