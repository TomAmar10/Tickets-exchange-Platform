import { useSelector } from "react-redux";
import UserWallet from "../Components/UserWallet/UserWallet";
import { IStore } from "../store/store";

function WalletPage(): JSX.Element {
  const user = useSelector((state: IStore) => state.user.user);
  const langData = useSelector((state: IStore) => state.language.langData);
  return <UserWallet user={user} data={langData} />;
}

export default WalletPage;
